namespace Bulky.Application.DTOs.VillaNumber;

public class CreateVillaNumberRequest
{
    public int Number { get; set; }
    public int VillaId { get; set; }
    public string? SpecialDetails { get; set; }
}
