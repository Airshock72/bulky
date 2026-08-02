namespace Bulky.Application.DTOs.Amenity;

public class CreateAmenityRequest
{
    public required string Name { get; set; }
    public string? Description { get; set; }
    public int VillaId { get; set; }
}
