using System.Linq.Expressions;
using Bulky.Application.Common.Interfaces;
using Bulky.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Bulky.Infrastructure.Repository;

public class Repository<T> : IRepository<T> where T : class
{
    private readonly DbSet<T> _dbSet;

    protected Repository(ApplicationDbContext db)
    {
        _dbSet = db.Set<T>();
    }

    public void Add(T entity)
    {
        _dbSet.Add(entity);
    }

    public void Remove(T entity)
    {
        _dbSet.Remove(entity);
    }

    public IEnumerable<T> GetList()
    {
        return _dbSet.ToList();
    }

    public T? Get(Expression<Func<T, bool>> filter)
    {
        return _dbSet.FirstOrDefault(filter);
    }
}