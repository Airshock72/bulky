using System.ComponentModel.DataAnnotations;

namespace Bulky.Domain.Entities;

public class Villa
{
    public int Id { get; set; }
    [MaxLength(50)]
    public required string Name { get; set; }
    public string? Description { get; set; }
    [Range(0, 10000)]
    public double Price { get; set; }
    public int Sqft { get; set; }
    [Range(0, 10)]
    public int Occupancy { get; set; }
    public string? ImageUrl { get; set; }
    public DateTime? CreatedDate { get; set; }
    public DateTime? UpdatedDate { get; set; }
}