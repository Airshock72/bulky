using System.ComponentModel.DataAnnotations.Schema;

namespace Bulky.Domain.Entities;

public class Amenity
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public string? Description { get; set; }
    
    [ForeignKey("Villa")]
    public int VillaId { get; set; }
    public Villa? Villa { get; set; }
}