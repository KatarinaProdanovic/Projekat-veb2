using MyBackend.DTO;

namespace MyBackend.Services.Interfaces
{
    public interface IProductService
    {
        ProductDto AddProduct(ProductDto newProduct);
        List<ProductDto> GetAll(int id);
        List<ProductDto> GetAll();
        void DeleteProducts(int id);
        ProductDto EditProduct(ProductDto newProduct);
    }
}
