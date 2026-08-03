namespace Bulky.Application.Common.Interfaces;

public interface IUnitOfWork
{
    IVillaRepository Villa { get; }
    IVillaNumberRepository VillaNumbers { get; }
    IAmenityRepository Amenities { get; }
    IUserRepository Users { get; }
    IRefreshTokenRepository RefreshTokens { get; }
    void Save();
}