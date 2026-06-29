using System.ComponentModel.DataAnnotations;

namespace Bulky.Domain.Entities;

public class Villa
{
    public int Id { get; set; }
    [MaxLength(100)]
    public required string Name { get; set; }
    [MaxLength(250)]
    public string? Description { get; set; }
    [Range(10, 10000)]
    public double Price { get; set; }
    [Range(10, 10000)]
    public int Sqft { get; set; }
    [Range(1, 100)]
    public int Occupancy { get; set; }
    public string? ImageUrl { get; set; }
    public DateTime? CreatedDate { get; set; }
    public DateTime? UpdatedDate { get; set; }
}