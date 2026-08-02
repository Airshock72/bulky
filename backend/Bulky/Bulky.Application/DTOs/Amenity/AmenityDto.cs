using Bulky.Application.DTOs.Villa;

namespace Bulky.Application.DTOs.Amenity;

public class AmenityDto
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public string? Description { get; set; }
    public VillaSummaryDto? Villa { get; set; }
}
