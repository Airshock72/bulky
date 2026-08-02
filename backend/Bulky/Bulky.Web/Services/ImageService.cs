using Bulky.Application.Common.Interfaces;

namespace BulkyWeb.Services;

public class ImageService : IImageService
{
    private readonly string _webRootPath;

    public ImageService(IWebHostEnvironment env) => _webRootPath = env.WebRootPath;

    public string? Save(string? base64DataUrl, string subfolder)
    {
        if (string.IsNullOrEmpty(base64DataUrl)) return null;

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

        string folder = Path.Combine(_webRootPath, "Images", subfolder);
        Directory.CreateDirectory(folder);
        string fileName = Guid.NewGuid() + extension;
        File.WriteAllBytes(Path.Combine(folder, fileName), Convert.FromBase64String(base64));
        return $"/Images/{subfolder}/{fileName}";
    }

    public void Delete(string? imageUrl)
    {
        if (string.IsNullOrEmpty(imageUrl)) return;
        string path = Path.Combine(_webRootPath, imageUrl.TrimStart('/'));
        if (File.Exists(path)) File.Delete(path);
    }
}
