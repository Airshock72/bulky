using Bulky.Domain.Entities;

namespace Bulky.Application.Common.Interfaces;

public interface IVillaRepository: IRepository<Villa>
{
    IEnumerable<object> GetListOptions();
    Villa? Get(int id);
    void Save();
}