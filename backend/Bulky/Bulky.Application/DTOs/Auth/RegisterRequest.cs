using System.ComponentModel.DataAnnotations;
using Bulky.Domain.Enums;

namespace Bulky.Application.DTOs.Auth;

public class RegisterRequest
{
    [Required, EmailAddress]
    public required string Email { get; set; }

    [Required, MaxLength(100)]
    public required string Name { get; set; }

    [Required, Phone]
    public required string PhoneNumber { get; set; }

    [Required]
    [RegularExpression(
        @"^(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$",
        ErrorMessage = "Password must be at least 8 characters long and include at least one uppercase letter, one number, and one special character.")]
    public required string Password { get; set; }

    [Required]
    [Compare(nameof(Password), ErrorMessage = "Password and confirmation password do not match.")]
    public required string ConfirmPassword { get; set; }

    [Required]
    public required UserRole Role { get; set; }
}
