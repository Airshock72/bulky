using Bulky.Domain.Entities;
using Bulky.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;

namespace BulkyWeb.Controllers;

[ApiController]
[Route("api/[controller]")]
public class VillaController(ApplicationDbContext db) : ControllerBase
{
    [HttpGet]
    public IActionResult GetAll()
    {
        List<Villa> villas = db.Villas.ToList();
        return Ok(villas);
    }

    [HttpPost]
    public IActionResult Create(Villa obj)
    {
        db.Villas.Add(obj);
        db.SaveChanges();
        return Ok(obj.Id);
    }
}