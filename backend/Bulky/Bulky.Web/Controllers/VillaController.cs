using Bulky.Application.Common.Interfaces;
using Bulky.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace BulkyWeb.Controllers;

[ApiController]
[Route("api/[controller]")]
public class VillaController : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IWebHostEnvironment _webHostEnvironment;

    public VillaController(IUnitOfWork unitOfWork, IWebHostEnvironment webHostEnvironment)
    {
        _unitOfWork = unitOfWork;
        _webHostEnvironment = webHostEnvironment;
    }
    
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
    
    [HttpGet("{villaId:int}")]
    public IActionResult Get(int villaId)
    {
        Villa? villa = _unitOfWork.Villa.Get(villaId);
        if (villa == null) return NotFound();
        return Ok(villa);
    }

    [HttpPost]
    public IActionResult Create([FromBody] Villa obj)
    {
        if (!string.IsNullOrEmpty(obj.Image))
            obj.ImageUrl = SaveBase64Image(obj.Image);

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
        villa.Occupancy = updatedVilla.Occupancy;
        villa.Price = updatedVilla.Price;
        villa.Sqft = updatedVilla.Sqft;
        villa.UpdatedDate = DateTime.UtcNow;

        DeleteImage(villa.ImageUrl);

        villa.ImageUrl = string.IsNullOrEmpty(updatedVilla.Image)
            ? null
            : SaveBase64Image(updatedVilla.Image);

        _unitOfWork.Save();
        return Ok(villa);
    }

    [HttpDelete("{villaId:int}")]
    public IActionResult Delete(int villaId)
    {
        Villa? villa = _unitOfWork.Villa.Get(villaId);

        if (villa == null) return NotFound();

        DeleteImage(villa.ImageUrl);
        _unitOfWork.Villa.Remove(villa);
        _unitOfWork.Save();
        return Ok();
    }

    private string SaveBase64Image(string base64DataUrl)
    {
        string base64 = base64DataUrl;
        string extension = ".jpg";

        if (base64DataUrl.Contains(','))
        {
            var parts = base64DataUrl.Split(',', 2);
            var header = parts[0];
            base64 = parts[1];

            if (header.Contains("png")) extension = ".png";
            else if (header.Contains("gif")) extension = ".gif";
            else if (header.Contains("webp")) extension = ".webp";
        }

        string uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, "Images", "VillaImage");
        Directory.CreateDirectory(uploadsFolder);
        string fileName = Guid.NewGuid() + extension;
        System.IO.File.WriteAllBytes(Path.Combine(uploadsFolder, fileName), Convert.FromBase64String(base64));
        return $"/Images/VillaImage/{fileName}";
    }

    private void DeleteImage(string? imageUrl)
    {
        if (string.IsNullOrEmpty(imageUrl)) return;

        string oldImagePath = Path.Combine(_webHostEnvironment.WebRootPath, imageUrl.TrimStart('/'));
        if (System.IO.File.Exists(oldImagePath))
            System.IO.File.Delete(oldImagePath);
    }
}