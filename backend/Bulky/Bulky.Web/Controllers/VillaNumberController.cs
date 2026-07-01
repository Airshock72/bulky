using Bulky.Domain.Entities;
using Bulky.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BulkyWeb.Controllers;

[ApiController]
[Route("api/[controller]")]
public class VillaNumberController : ControllerBase
{
    private readonly ApplicationDbContext _db;
    public VillaNumberController(ApplicationDbContext db) { _db = db; }

    [HttpGet]
    public IActionResult GetAll()
    {
        List<VillaNumber> villaNumbers = _db.VillaNumbers.Include(v => v.Villa).ToList();
        return Ok(villaNumbers);
    }

    [HttpPost]
    public IActionResult Create([FromBody] VillaNumber obj)
    {
        _db.VillaNumbers.Add(obj);
        _db.SaveChanges();
        return Ok(obj.Id);
    }

    [HttpPut("{villaNumberId:int}")]
    public IActionResult Update(int villaNumberId, [FromBody] VillaNumber updatedVillaNumber)
    {
        VillaNumber? villaNumber = _db.VillaNumbers.FirstOrDefault(vn => vn.Id == villaNumberId);
        if (villaNumber == null) return NotFound();
        
        villaNumber.Number = updatedVillaNumber.Number;
        villaNumber.SpecialDetails = updatedVillaNumber.SpecialDetails;
        villaNumber.VillaId = updatedVillaNumber.VillaId;

        _db.SaveChanges();
        return Ok(villaNumber);
    }

    [HttpDelete("{villaNumberId:int}")]
    public IActionResult Delete(int villaNumberId)
    {
        VillaNumber? villaNumber = _db.VillaNumbers.FirstOrDefault(vn => vn.Id == villaNumberId);

        if (villaNumber == null) return NotFound();

        _db.VillaNumbers.Remove(villaNumber);
        _db.SaveChanges();
        return Ok();
    }
}