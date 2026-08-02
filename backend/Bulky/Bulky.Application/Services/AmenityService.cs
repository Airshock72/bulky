using Bulky.Application.Common.Interfaces;
using Bulky.Application.DTOs.Amenity;
using Bulky.Application.DTOs.Villa;
using Bulky.Domain.Entities;

namespace Bulky.Application.Services;

public class AmenityService : IAmenityService
{
    private readonly IUnitOfWork _unitOfWork;

    public AmenityService(IUnitOfWork unitOfWork) => _unitOfWork = unitOfWork;

    public IEnumerable<AmenityDto> GetAll() =>
        _unitOfWork.Amenities.GetAll().Select(ToDto);

    public int Create(CreateAmenityRequest request)
    {
        if (_unitOfWork.Amenities.Any(a => a.Name == request.Name))
            throw new InvalidOperationException($"Amenity '{request.Name}' already exists.");

        var amenity = new Amenity
        {
            Name = request.Name,
            Description = request.Description,
            VillaId = request.VillaId
        };

        _unitOfWork.Amenities.Add(amenity);
        _unitOfWork.Save();
        return amenity.Id;
    }

    public AmenityDto? Update(int id, UpdateAmenityRequest request)
    {
        Amenity? amenity = _unitOfWork.Amenities.Get(a => a.Id == id);
        if (amenity is null) return null;

        amenity.Name = request.Name;
        amenity.VillaId = request.VillaId;
        amenity.Description = request.Description;
        _unitOfWork.Save();

        amenity.Villa = _unitOfWork.Villa.Get(amenity.VillaId);
        return ToDto(amenity);
    }

    public bool Delete(int id)
    {
        Amenity? amenity = _unitOfWork.Amenities.Get(a => a.Id == id);
        if (amenity is null) return false;

        _unitOfWork.Amenities.Remove(amenity);
        _unitOfWork.Save();
        return true;
    }

    private static AmenityDto ToDto(Amenity amenity) => new()
    {
        Id = amenity.Id,
        Name = amenity.Name,
        Description = amenity.Description,
        Villa = amenity.Villa is { } v ? new VillaSummaryDto
        {
            Id = v.Id,
            Name = v.Name,
            Description = v.Description,
            Price = v.Price,
            Sqft = v.Sqft,
            Occupancy = v.Occupancy,
            ImageUrl = v.ImageUrl
        } : null
    };
}
