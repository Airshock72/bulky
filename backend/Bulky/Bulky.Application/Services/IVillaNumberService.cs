using Bulky.Application.DTOs.VillaNumber;

namespace Bulky.Application.Services;

public interface IVillaNumberService
{
    IEnumerable<VillaNumberDto> GetAll();
    int Create(CreateVillaNumberRequest request);
    VillaNumberDto? Update(int id, UpdateVillaNumberRequest request);
    bool Delete(int id);
}
