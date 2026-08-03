using Bulky.Domain.Entities;

namespace Bulky.Application.Common.Interfaces;

public interface IUserRepository : IRepository<User>
{
    User? GetByEmail(string email);
    bool EmailExists(string email);
}
