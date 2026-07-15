namespace Bulky.Application.Common.Interfaces;

public interface IUnitOfWork
{
    IVillaRepository Villa { get; }
    IVillaNumberRepository VillaNumbers { get; }
    IAmenityRepository Amenities { get; }
    void Save();
}