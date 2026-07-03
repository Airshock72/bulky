namespace Bulky.Application.Common.Interfaces;

public interface IUnitOfWork
{
    IVillaRepository Villa { get; }
}