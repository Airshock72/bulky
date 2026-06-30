using System.ComponentModel.DataAnnotations.Schema;

namespace Bulky.Domain.Entities;

public class VillaNumber
{
    public int Id { get; set; }
    public int Number { get; set; }
    [ForeignKey("Villa")]
    public int VillaId { get; set; }
    public Villa Villa { get; set; }
    public string? SpecialDetails { get; set; }
}