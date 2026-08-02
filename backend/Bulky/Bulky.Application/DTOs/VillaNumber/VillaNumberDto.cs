using Bulky.Application.DTOs.Villa;

namespace Bulky.Application.DTOs.VillaNumber;

public class VillaNumberDto
{
    public int Id { get; set; }
    public int Number { get; set; }
    public string? SpecialDetails { get; set; }
    public VillaSummaryDto? Villa { get; set; }
}
