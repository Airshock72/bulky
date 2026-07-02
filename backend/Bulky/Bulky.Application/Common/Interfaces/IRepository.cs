using System.Linq.Expressions;

namespace Bulky.Application.Common.Interfaces;

public interface IRepository<T> where T: class
{
    IEnumerable<T> GetList();
    T? Get(Expression<Func<T, bool>> filter);
    void Add(T entity);
    void Remove(T entity);
}