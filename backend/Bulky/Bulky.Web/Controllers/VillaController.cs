using Bulky.Domain.Entities;
using Bulky.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;

namespace BulkyWeb.Controllers;

[ApiController]
[Route("api/[controller]")]
public class VillaController : ControllerBase
{
    private readonly ApplicationDbContext _db;
    public VillaController(ApplicationDbContext db) { _db = db; }
    
    [HttpGet]
    public IActionResult GetAll()
    {
        List<Villa> villas = _db.Villas.ToList();
        return Ok(villas);
    }

    [HttpPost]
    public IActionResult Create(Villa obj)
    {
        obj.CreatedDate = DateTime.UtcNow;
        _db.Villas.Add(obj);
        _db.SaveChanges();
        return Ok(obj.Id);
    }

    [HttpPut("{villaId:int}")]
    public IActionResult Update(int villaId, [FromBody] Villa updatedVilla)
    {
        Villa? villa = _db.Villas.FirstOrDefault(v => v.Id == villaId);

        if (villa == null) return NotFound();

        villa.Name = updatedVilla.Name;
        villa.Description = updatedVilla.Description;
        villa.ImageUrl = updatedVilla.ImageUrl;
        villa.Occupancy = updatedVilla.Occupancy;
        villa.Price = updatedVilla.Price;
        villa.Sqft = updatedVilla.Sqft;
        villa.UpdatedDate = DateTime.UtcNow;

        _db.SaveChanges();
        return Ok(villa);
    }
}