using Bulky.Application.Common.Interfaces;
using Bulky.Infrastructure.Data;

namespace Bulky.Infrastructure.Repository;

public class UnitOfWork : IUnitOfWork
{
    private readonly ApplicationDbContext _db;
    public IVillaRepository Villa { get; private set; }
    public IVillaNumberRepository VillaNumbers { get; private set; }
    public IAmenityRepository Amenities { get; private set; }
    public IUserRepository Users { get; private set; }
    public IRefreshTokenRepository RefreshTokens { get; private set; }

    public UnitOfWork(ApplicationDbContext db)
    {
        _db = db;
        Villa = new VillaRepository(_db);
        VillaNumbers = new VillaNumberRepository(_db);
        Amenities = new AmenityRepository(_db);
        Users = new UserRepository(_db);
        RefreshTokens = new RefreshTokenRepository(_db);
    }

    public void Save()
    {
        _db.SaveChanges();
    }
}