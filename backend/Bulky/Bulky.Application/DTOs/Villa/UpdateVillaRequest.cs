namespace Bulky.Application.DTOs.Villa;

public class UpdateVillaRequest
{
    public required string Name { get; set; }
    public string? Description { get; set; }
    public double Price { get; set; }
    public int Sqft { get; set; }
    public int Occupancy { get; set; }
    public string? Image { get; set; }
}
