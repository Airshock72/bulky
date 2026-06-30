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
        _db.Villas.Add(obj);
        _db.SaveChanges();
        return Ok(obj.Id);
    }
}