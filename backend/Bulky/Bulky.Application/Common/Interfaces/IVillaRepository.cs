using Bulky.Domain.Entities;

namespace Bulky.Application.Common.Interfaces;

public interface IVillaRepository
{
    List<Villa> GetList();
    IEnumerable<object> GetListOptions();
    Villa? Get(int id);
    void Add(Villa villa);
    void Remove(Villa villa);
    void Save();
}