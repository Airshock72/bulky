using Bulky.Application.DTOs.Amenity;

namespace Bulky.Application.Services;

public interface IAmenityService
{
    IEnumerable<AmenityDto> GetAll();
    int Create(CreateAmenityRequest request);
    AmenityDto? Update(int id, UpdateAmenityRequest request);
    bool Delete(int id);
}
