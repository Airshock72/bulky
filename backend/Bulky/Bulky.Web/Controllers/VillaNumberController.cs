using Bulky.Application.Common.Interfaces;
using Bulky.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace BulkyWeb.Controllers;

[ApiController]
[Route("api/[controller]")]
public class VillaNumberController : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork;
    public VillaNumberController(IUnitOfWork unitOfWork) { _unitOfWork = unitOfWork; }

    [HttpGet]
    public IActionResult GetAll()
    {
        IEnumerable<VillaNumber> villaNumbers = _unitOfWork.VillaNumbers.GetAllWithVilla();
        return Ok(villaNumbers);
    }

    [HttpPost]
    public IActionResult Create([FromBody] VillaNumber obj)
    {
        bool villaNumberExist = _unitOfWork.VillaNumbers.Any(v => v.Number == obj.Number);
        
        if (villaNumberExist) return BadRequest($"Villa Number {obj.Number} already exists!");
        
        _unitOfWork.VillaNumbers.Add(obj);
        _unitOfWork.Save();
        return Ok(obj.Id);
    }

    [HttpPut("{villaNumberId:int}")]
    public IActionResult Update(int villaNumberId, [FromBody] VillaNumber updatedVillaNumber)
    {
        VillaNumber? villaNumber = _unitOfWork.VillaNumbers.Get(v => v.Id == villaNumberId);
        if (villaNumber == null) return NotFound();
        
        villaNumber.SpecialDetails = updatedVillaNumber.SpecialDetails;
        villaNumber.VillaId = updatedVillaNumber.VillaId;

        _unitOfWork.Save();
        return Ok(villaNumber);
    }

    [HttpDelete("{villaNumberId:int}")]
    public IActionResult Delete(int villaNumberId)
    {
        VillaNumber? villaNumber = _unitOfWork.VillaNumbers.Get(v => v.Id == villaNumberId);

        if (villaNumber == null) return NotFound();

        _unitOfWork.VillaNumbers.Remove(villaNumber);
        _unitOfWork.Save();
        return Ok();
    }
}