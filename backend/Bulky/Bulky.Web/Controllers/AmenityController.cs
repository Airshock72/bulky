using Bulky.Application.Common.Interfaces;
using Bulky.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace BulkyWeb.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AmenityController : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork;

    public AmenityController(IUnitOfWork unitOfWork) { _unitOfWork = unitOfWork; }

    [HttpGet]
    public IActionResult GetAll()
    {
        IEnumerable<Amenity> amenities = _unitOfWork.Amenities.GetAllWithVilla();
        return Ok(amenities);
    }

    [HttpPost]
    public IActionResult Create([FromBody] Amenity obj)
    {
        bool amenityExist = _unitOfWork.Amenities.Any(a => a.Name == obj.Name);
        
        if (amenityExist) return BadRequest($"Amenity {obj.Name} already exists!");
        
        _unitOfWork.Amenities.Add(obj);
        _unitOfWork.Save();
        return Ok(obj.Id);
    }

    [HttpPut("{amenityId:int}")]
    public IActionResult Update(int amenityId, [FromBody] Amenity updatedAmenity)
    {
        Amenity? amenity = _unitOfWork.Amenities.Get(a => a.Id == amenityId);
        if (amenity == null) return NotFound();

        amenity.Name = updatedAmenity.Name;
        amenity.VillaId = updatedAmenity.VillaId;
        amenity.Description = updatedAmenity.Description;
        
        _unitOfWork.Save();
        return Ok(amenity);
    }

    [HttpDelete("{amenityId:int}")]
    public IActionResult Delete(int amenityId)
    {
        Amenity? amenity = _unitOfWork.Amenities.Get(a => a.Id == amenityId);

        if (amenity == null) return NotFound();
        
        _unitOfWork.Amenities.Remove(amenity);
        _unitOfWork.Save();
        return Ok();
    }
}