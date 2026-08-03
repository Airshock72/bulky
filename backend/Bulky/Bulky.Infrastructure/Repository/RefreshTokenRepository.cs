using Bulky.Application.Common.Interfaces;
using Bulky.Domain.Entities;
using Bulky.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Bulky.Infrastructure.Repository;

public class RefreshTokenRepository : Repository<RefreshToken>, IRefreshTokenRepository
{
    private readonly ApplicationDbContext _db;

    public RefreshTokenRepository(ApplicationDbContext db) : base(db) => _db = db;

    public RefreshToken? GetByToken(string hashedToken) =>
        _db.RefreshTokens.Include(r => r.User).FirstOrDefault(r => r.Token == hashedToken);

    public IEnumerable<RefreshToken> GetActiveByUserId(int userId) =>
        _db.RefreshTokens
            .Where(r => r.UserId == userId && r.RevokedOnUtc == null && r.ExpiresOnUtc > DateTime.UtcNow)
            .ToList();
}
