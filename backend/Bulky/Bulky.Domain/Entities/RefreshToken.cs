using System.ComponentModel.DataAnnotations.Schema;

namespace Bulky.Domain.Entities;

public class RefreshToken
{
    public int Id { get; set; }

    // Stores a SHA-256 hash of the token, never the raw value.
    public required string Token { get; set; }
    public DateTime CreatedOnUtc { get; set; }
    public DateTime ExpiresOnUtc { get; set; }
    public DateTime? RevokedOnUtc { get; set; }
    public string? ReplacedByToken { get; set; }

    [ForeignKey("User")]
    public int UserId { get; set; }
    public User? User { get; set; }
}
