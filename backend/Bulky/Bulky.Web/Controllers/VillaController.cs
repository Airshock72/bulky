using Bulky.Application.Common.Interfaces;
using Bulky.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace BulkyWeb.Controllers;

[ApiController]
[Route("api/[controller]")]
public class VillaController : ControllerBase
{
    private readonly IVillaRepository _villaRepository;
    public VillaController(IVillaRepository villaRepository) { _villaRepository = villaRepository; }
    
    [HttpGet]
    public IActionResult GetAll()
    {
        List<Villa> villas = _villaRepository.GetList();
        return Ok(villas);
    }

    [HttpGet("list")]
    public IActionResult GetAllList()
    {
        var villas = _villaRepository.GetListOptions();
        return Ok(villas);
    }

    [HttpPost]
    public IActionResult Create([FromBody]Villa obj)
    {
        obj.CreatedDate = DateTime.UtcNow;
        _villaRepository.Add(obj);
        _villaRepository.Save();
        return Ok(obj.Id);
    }

    [HttpPut("{villaId:int}")]
    public IActionResult Update(int villaId, [FromBody] Villa updatedVilla)
    {
        Villa? villa = _villaRepository.Get(villaId);

        if (villa == null) return NotFound();

        villa.Name = updatedVilla.Name;
        villa.Description = updatedVilla.Description;
        villa.ImageUrl = updatedVilla.ImageUrl;
        villa.Occupancy = updatedVilla.Occupancy;
        villa.Price = updatedVilla.Price;
        villa.Sqft = updatedVilla.Sqft;
        villa.UpdatedDate = DateTime.UtcNow;

        _villaRepository.Save();
        return Ok(villa);
    }

    [HttpDelete("{villaId:int}")]
    public IActionResult Delete(int villaId)
    {
        Villa? villa = _villaRepository.Get(villaId);

        if (villa == null) return NotFound();

        _villaRepository.Remove(villa);
        _villaRepository.Save();
        return Ok();
    }
}