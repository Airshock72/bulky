using Bulky.Application.DTOs.Villa;
using Bulky.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace BulkyWeb.Controllers;

[ApiController]
[Route("api/[controller]")]
public class VillaController : ControllerBase
{
    private readonly IVillaService _villaService;

    public VillaController(IVillaService villaService) => _villaService = villaService;

    [HttpGet]
    public IActionResult GetAll() => Ok(_villaService.GetAll());

    [HttpGet("list")]
    public IActionResult GetOptions() => Ok(_villaService.GetOptions());

    [HttpGet("{id:int}")]
    public IActionResult Get(int id)
    {
        var villa = _villaService.GetById(id);
        return villa is null ? NotFound() : Ok(villa);
    }

    [HttpPost]
    public IActionResult Create([FromBody] CreateVillaRequest request) =>
        Ok(_villaService.Create(request));

    [HttpPut("{id:int}")]
    public IActionResult Update(int id, [FromBody] UpdateVillaRequest request)
    {
        var result = _villaService.Update(id, request);
        return result is null ? NotFound() : Ok(result);
    }

    [HttpDelete("{id:int}")]
    public IActionResult Delete(int id) =>
        _villaService.Delete(id) ? Ok() : NotFound();
}
