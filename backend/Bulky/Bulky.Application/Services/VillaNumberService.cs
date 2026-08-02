using Bulky.Application.Common.Interfaces;
using Bulky.Application.DTOs.Villa;
using Bulky.Application.DTOs.VillaNumber;
using Bulky.Domain.Entities;

namespace Bulky.Application.Services;

public class VillaNumberService : IVillaNumberService
{
    private readonly IUnitOfWork _unitOfWork;

    public VillaNumberService(IUnitOfWork unitOfWork) => _unitOfWork = unitOfWork;

    public IEnumerable<VillaNumberDto> GetAll() =>
        _unitOfWork.VillaNumbers.GetAll().Select(ToDto);

    public int Create(CreateVillaNumberRequest request)
    {
        if (_unitOfWork.VillaNumbers.Any(v => v.Number == request.Number))
            throw new InvalidOperationException($"Villa Number {request.Number} already exists.");

        var villaNumber = new VillaNumber
        {
            Number = request.Number,
            VillaId = request.VillaId,
            SpecialDetails = request.SpecialDetails
        };

        _unitOfWork.VillaNumbers.Add(villaNumber);
        _unitOfWork.Save();
        return villaNumber.Id;
    }

    public VillaNumberDto? Update(int id, UpdateVillaNumberRequest request)
    {
        VillaNumber? villaNumber = _unitOfWork.VillaNumbers.Get(v => v.Id == id);
        if (villaNumber is null) return null;

        villaNumber.SpecialDetails = request.SpecialDetails;
        villaNumber.VillaId = request.VillaId;

        _unitOfWork.Save();
        return ToDto(villaNumber);
    }

    public bool Delete(int id)
    {
        VillaNumber? villaNumber = _unitOfWork.VillaNumbers.Get(v => v.Id == id);
        if (villaNumber is null) return false;

        _unitOfWork.VillaNumbers.Remove(villaNumber);
        _unitOfWork.Save();
        return true;
    }

    private static VillaNumberDto ToDto(VillaNumber vn) => new()
    {
        Id = vn.Id,
        Number = vn.Number,
        SpecialDetails = vn.SpecialDetails,
        Villa = vn.Villa is { } v ? new VillaSummaryDto
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
