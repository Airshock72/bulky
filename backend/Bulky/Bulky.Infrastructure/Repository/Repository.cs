using System.Linq.Expressions;
using Bulky.Application.Common.Interfaces;
using Bulky.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Bulky.Infrastructure.Repository;

public class Repository<T> : IRepository<T> where T : class
{
    protected readonly DbSet<T> DbSet;

    protected Repository(ApplicationDbContext db) => DbSet = db.Set<T>();

    public T? Get(Expression<Func<T, bool>> filter) => DbSet.FirstOrDefault(filter);
    public void Add(T entity) => DbSet.Add(entity);
    public bool Any(Expression<Func<T, bool>> filter) => DbSet.Any(filter);
    public void Remove(T entity) => DbSet.Remove(entity);
}
