using Bulky.Application.DTOs.Amenity;
using Bulky.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace BulkyWeb.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AmenityController : ControllerBase
{
    private readonly IAmenityService _amenityService;

    public AmenityController(IAmenityService amenityService) => _amenityService = amenityService;

    [HttpGet]
    public IActionResult GetAll() => Ok(_amenityService.GetAll());

    [HttpPost]
    public IActionResult Create([FromBody] CreateAmenityRequest request)
    {
        try { return Ok(_amenityService.Create(request)); }
        catch (InvalidOperationException ex) { return BadRequest(ex.Message); }
    }

    [HttpPut("{id:int}")]
    public IActionResult Update(int id, [FromBody] UpdateAmenityRequest request)
    {
        var result = _amenityService.Update(id, request);
        return result is null ? NotFound() : Ok(result);
    }

    [HttpDelete("{id:int}")]
    public IActionResult Delete(int id) =>
        _amenityService.Delete(id) ? Ok() : NotFound();
}
