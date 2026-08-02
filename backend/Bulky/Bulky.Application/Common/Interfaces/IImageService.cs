namespace Bulky.Application.Common.Interfaces;

public interface IImageService
{
    string? Save(string? base64DataUrl, string subfolder);
    void Delete(string? imageUrl);
}
