using Bulky.Domain.Entities;

namespace Bulky.Application.Common.Interfaces;

public interface IRefreshTokenRepository : IRepository<RefreshToken>
{
    RefreshToken? GetByToken(string hashedToken);
    IEnumerable<RefreshToken> GetActiveByUserId(int userId);
}
