using Bulky.Application.DTOs.Villa;
using Bulky.Domain.Entities;

namespace Bulky.Application.Common.Interfaces;

public interface IVillaRepository : IRepository<Villa>
{
    IEnumerable<Villa> GetAll();
    IEnumerable<VillaOptionDto> GetOptions();
    Villa? Get(int id);
    Villa? GetWithAmenities(int id);
}
