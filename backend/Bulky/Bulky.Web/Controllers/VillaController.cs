using Bulky.Application.Common.Interfaces;
using Bulky.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace BulkyWeb.Controllers;

[ApiController]
[Route("api/[controller]")]
public class VillaController : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork;
    public VillaController(IUnitOfWork unitOfWork) { _unitOfWork = unitOfWork; }
    
    [HttpGet]
    public IActionResult GetAll()
    {
        IEnumerable<Villa> villas = _unitOfWork.Villa.GetList();
        return Ok(villas);
    }

    [HttpGet("list")]
    public IActionResult GetAllList()
    {
        var villas = _unitOfWork.Villa.GetListOptions();
        return Ok(villas);
    }

    [HttpPost]
    public IActionResult Create([FromBody]Villa obj)
    {
        obj.CreatedDate = DateTime.UtcNow;
        _unitOfWork.Villa.Add(obj);
        _unitOfWork.Save();
        return Ok(obj.Id);
    }

    [HttpPut("{villaId:int}")]
    public IActionResult Update(int villaId, [FromBody] Villa updatedVilla)
    {
        Villa? villa = _unitOfWork.Villa.Get(villaId);

        if (villa == null) return NotFound();

        villa.Name = updatedVilla.Name;
        villa.Description = updatedVilla.Description;
        villa.ImageUrl = updatedVilla.ImageUrl;
        villa.Occupancy = updatedVilla.Occupancy;
        villa.Price = updatedVilla.Price;
        villa.Sqft = updatedVilla.Sqft;
        villa.UpdatedDate = DateTime.UtcNow;

        _unitOfWork.Save();
        return Ok(villa);
    }

    [HttpDelete("{villaId:int}")]
    public IActionResult Delete(int villaId)
    {
        Villa? villa = _unitOfWork.Villa.Get(villaId);

        if (villa == null) return NotFound();

        _unitOfWork.Villa.Remove(villa);
        _unitOfWork.Save();
        return Ok();
    }
}