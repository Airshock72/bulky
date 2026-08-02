using Bulky.Application.Common.Interfaces;
using Bulky.Application.DTOs.Amenity;
using Bulky.Application.DTOs.Villa;

using Bulky.Domain.Entities;

namespace Bulky.Application.Services;

public class VillaService : IVillaService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IImageService _imageService;

    public VillaService(IUnitOfWork unitOfWork, IImageService imageService)
    {
        _unitOfWork = unitOfWork;
        _imageService = imageService;
    }

    public IEnumerable<VillaDto> GetAll() =>
        _unitOfWork.Villa.GetAll().Select(ToDto);

    public IEnumerable<VillaOptionDto> GetOptions() =>
        _unitOfWork.Villa.GetOptions();

    public VillaDetailDto? GetById(int id)
    {
        Villa? villa = _unitOfWork.Villa.GetWithAmenities(id);
        return villa is null ? null : ToDetailDto(villa);
    }

    public int Create(CreateVillaRequest request)
    {
        var villa = new Villa
        {
            Name = request.Name,
            Description = request.Description,
            Price = request.Price,
            Sqft = request.Sqft,
            Occupancy = request.Occupancy,
            CreatedDate = DateTime.UtcNow,
            ImageUrl = _imageService.Save(request.Image, "VillaImage")
        };

        _unitOfWork.Villa.Add(villa);
        _unitOfWork.Save();
        return villa.Id;
    }

    public VillaDto? Update(int id, UpdateVillaRequest request)
    {
        Villa? villa = _unitOfWork.Villa.Get(id);
        if (villa is null) return null;

        _imageService.Delete(villa.ImageUrl);

        villa.Name = request.Name;
        villa.Description = request.Description;
        villa.Price = request.Price;
        villa.Sqft = request.Sqft;
        villa.Occupancy = request.Occupancy;
        villa.UpdatedDate = DateTime.UtcNow;
        villa.ImageUrl = _imageService.Save(request.Image, "VillaImage");

        _unitOfWork.Save();
        return ToDto(villa);
    }

    public bool Delete(int id)
    {
        Villa? villa = _unitOfWork.Villa.Get(id);
        if (villa is null) return false;

        _imageService.Delete(villa.ImageUrl);
        _unitOfWork.Villa.Remove(villa);
        _unitOfWork.Save();
        return true;
    }

    private static VillaDto ToDto(Villa villa) => new()
    {
        Id = villa.Id,
        Name = villa.Name,
        Description = villa.Description,
        Price = villa.Price,
        Sqft = villa.Sqft,
        Occupancy = villa.Occupancy,
        ImageUrl = villa.ImageUrl,
        CreatedDate = villa.CreatedDate,
        UpdatedDate = villa.UpdatedDate
    };

    private static VillaDetailDto ToDetailDto(Villa villa) => new()
    {
        Id = villa.Id,
        Name = villa.Name,
        Description = villa.Description,
        Price = villa.Price,
        Sqft = villa.Sqft,
        Occupancy = villa.Occupancy,
        ImageUrl = villa.ImageUrl,
        CreatedDate = villa.CreatedDate,
        UpdatedDate = villa.UpdatedDate,
        Amenities = villa.Amenities.Select(a => new AmenitySimpleDto
        {
            Id = a.Id,
            Name = a.Name,
            Description = a.Description
        })
    };
}
