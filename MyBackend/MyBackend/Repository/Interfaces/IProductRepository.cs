using MyBackend.Models;

namespace MyBackend.Repository.Interfaces
{
    public interface IProductRepository
    {
        Product AddProduct(Product product);
        List<Product> GetAllProducts(int id);
        List<Product> GetAllProducts();
        void DeleteProduct(int id);
        Product GetById(int id);
        void saveChanges();
    }
}
