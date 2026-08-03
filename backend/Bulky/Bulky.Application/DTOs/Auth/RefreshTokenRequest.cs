using System.ComponentModel.DataAnnotations;

namespace Bulky.Application.DTOs.Auth;

public class RefreshTokenRequest
{
    [Required]
    public required string RefreshToken { get; set; }
}
