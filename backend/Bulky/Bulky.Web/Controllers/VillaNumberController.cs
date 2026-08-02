using Bulky.Application.DTOs.VillaNumber;
using Bulky.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace BulkyWeb.Controllers;

[ApiController]
[Route("api/[controller]")]
public class VillaNumberController : ControllerBase
{
    private readonly IVillaNumberService _villaNumberService;

    public VillaNumberController(IVillaNumberService villaNumberService) =>
        _villaNumberService = villaNumberService;

    [HttpGet]
    public IActionResult GetAll() => Ok(_villaNumberService.GetAll());

    [HttpPost]
    public IActionResult Create([FromBody] CreateVillaNumberRequest request)
    {
        try { return Ok(_villaNumberService.Create(request)); }
        catch (InvalidOperationException ex) { return BadRequest(ex.Message); }
    }

    [HttpPut("{id:int}")]
    public IActionResult Update(int id, [FromBody] UpdateVillaNumberRequest request)
    {
        var result = _villaNumberService.Update(id, request);
        return result is null ? NotFound() : Ok(result);
    }

    [HttpDelete("{id:int}")]
    public IActionResult Delete(int id) =>
        _villaNumberService.Delete(id) ? Ok() : NotFound();
}
