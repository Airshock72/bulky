using Bulky.Application.Common.Interfaces;
using Bulky.Application.Common.Settings;
using Bulky.Application.DTOs.Auth;
using Bulky.Domain.Entities;
using Microsoft.Extensions.Options;

namespace Bulky.Application.Services;

public class AuthService : IAuthService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IPasswordHasher _passwordHasher;
    private readonly ITokenService _tokenService;
    private readonly JwtSettings _jwtSettings;

    public AuthService(
        IUnitOfWork unitOfWork,
        IPasswordHasher passwordHasher,
        ITokenService tokenService,
        IOptions<JwtSettings> jwtOptions)
    {
        _unitOfWork = unitOfWork;
        _passwordHasher = passwordHasher;
        _tokenService = tokenService;
        _jwtSettings = jwtOptions.Value;
    }

    public AuthResponse Register(RegisterRequest request)
    {
        if (_unitOfWork.Users.EmailExists(request.Email))
            throw new InvalidOperationException($"Email '{request.Email}' is already registered.");

        var user = new User
        {
            Name = request.Name,
            Email = request.Email,
            PhoneNumber = request.PhoneNumber,
            PasswordHash = _passwordHasher.Hash(request.Password),
            Role = request.Role
        };

        _unitOfWork.Users.Add(user);
        _unitOfWork.Save();

        return IssueTokens(user);
    }

    public AuthResponse? Login(LoginRequest request)
    {
        var user = _unitOfWork.Users.GetByEmail(request.Email);
        if (user is null) return null;

        if (!_passwordHasher.Verify(request.Password, user.PasswordHash))
            throw new UnauthorizedAccessException("Invalid email or password.");

        return IssueTokens(user);
    }

    public AuthResponse Refresh(RefreshTokenRequest request)
    {
        var hashedToken = _tokenService.HashRefreshToken(request.RefreshToken);
        var storedToken = _unitOfWork.RefreshTokens.GetByToken(hashedToken);

        if (storedToken is null)
            throw new UnauthorizedAccessException("Invalid refresh token.");

        if (storedToken.RevokedOnUtc is not null)
        {
            // A rotated-out token was presented again: possible theft. Revoke the whole session family.
            foreach (var active in _unitOfWork.RefreshTokens.GetActiveByUserId(storedToken.UserId))
                active.RevokedOnUtc = DateTime.UtcNow;
            _unitOfWork.Save();

            throw new UnauthorizedAccessException("Refresh token reuse detected. All sessions have been revoked, please log in again.");
        }

        if (storedToken.ExpiresOnUtc <= DateTime.UtcNow)
            throw new UnauthorizedAccessException("Refresh token has expired.");

        var user = storedToken.User ?? _unitOfWork.Users.Get(u => u.Id == storedToken.UserId);
        if (user is null)
            throw new UnauthorizedAccessException("Invalid refresh token.");

        var newRawRefreshToken = _tokenService.GenerateRefreshToken();
        var newHashedRefreshToken = _tokenService.HashRefreshToken(newRawRefreshToken);

        storedToken.RevokedOnUtc = DateTime.UtcNow;
        storedToken.ReplacedByToken = newHashedRefreshToken;

        var newRefreshTokenEntity = new RefreshToken
        {
            Token = newHashedRefreshToken,
            UserId = user.Id,
            CreatedOnUtc = DateTime.UtcNow,
            ExpiresOnUtc = DateTime.UtcNow.AddDays(_jwtSettings.RefreshTokenExpiryDays)
        };

        _unitOfWork.RefreshTokens.Add(newRefreshTokenEntity);
        _unitOfWork.Save();

        return new AuthResponse
        {
            AccessToken = _tokenService.GenerateAccessToken(user),
            RefreshToken = newRawRefreshToken,
            AccessTokenExpiresAtUtc = DateTime.UtcNow.AddMinutes(_jwtSettings.AccessTokenExpiryMinutes),
            RefreshTokenExpiresAtUtc = newRefreshTokenEntity.ExpiresOnUtc
        };
    }

    private AuthResponse IssueTokens(User user)
    {
        var rawRefreshToken = _tokenService.GenerateRefreshToken();
        var refreshTokenEntity = new RefreshToken
        {
            Token = _tokenService.HashRefreshToken(rawRefreshToken),
            UserId = user.Id,
            CreatedOnUtc = DateTime.UtcNow,
            ExpiresOnUtc = DateTime.UtcNow.AddDays(_jwtSettings.RefreshTokenExpiryDays)
        };

        _unitOfWork.RefreshTokens.Add(refreshTokenEntity);
        _unitOfWork.Save();

        return new AuthResponse
        {
            AccessToken = _tokenService.GenerateAccessToken(user),
            RefreshToken = rawRefreshToken,
            AccessTokenExpiresAtUtc = DateTime.UtcNow.AddMinutes(_jwtSettings.AccessTokenExpiryMinutes),
            RefreshTokenExpiresAtUtc = refreshTokenEntity.ExpiresOnUtc
        };
    }
}
