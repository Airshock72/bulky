using System.Linq.Expressions;

namespace Bulky.Application.Common.Interfaces;

public interface IRepository<T> where T : class
{
    T? Get(Expression<Func<T, bool>> filter);
    void Add(T entity);
    bool Any(Expression<Func<T, bool>> filter);
    void Remove(T entity);
}