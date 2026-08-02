using Bulky.Application.DTOs.Villa;

namespace Bulky.Application.Services;

public interface IVillaService
{
    IEnumerable<VillaDto> GetAll();
    IEnumerable<VillaOptionDto> GetOptions();
    VillaDetailDto? GetById(int id);
    int Create(CreateVillaRequest request);
    VillaDto? Update(int id, UpdateVillaRequest request);
    bool Delete(int id);
}
