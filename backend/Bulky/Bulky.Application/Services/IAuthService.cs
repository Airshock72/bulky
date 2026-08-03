using Bulky.Application.DTOs.Auth;

namespace Bulky.Application.Services;

public interface IAuthService
{
    AuthResponse Register(RegisterRequest request);
    AuthResponse? Login(LoginRequest request);
    AuthResponse Refresh(RefreshTokenRequest request);
}
