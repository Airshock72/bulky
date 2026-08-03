using Bulky.Application.Common.Interfaces;
using Bulky.Domain.Entities;
using Bulky.Infrastructure.Data;

namespace Bulky.Infrastructure.Repository;

public class UserRepository : Repository<User>, IUserRepository
{
    private readonly ApplicationDbContext _db;

    public UserRepository(ApplicationDbContext db) : base(db) => _db = db;

    public User? GetByEmail(string email) =>
        _db.Users.FirstOrDefault(u => u.Email == email);

    public bool EmailExists(string email) =>
        _db.Users.Any(u => u.Email == email);
}
