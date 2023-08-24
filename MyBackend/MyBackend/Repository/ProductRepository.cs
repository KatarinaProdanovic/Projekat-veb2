using Microsoft.EntityFrameworkCore;
using MyBackend.Infrastructure;
using MyBackend.Models;
using MyBackend.Repository.Interfaces;

namespace MyBackend.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly ApplicationDbContext _dbContext;
        public ProductRepository(ApplicationDbContext dbContext)
        {

            _dbContext = dbContext;

        }
        public Product AddProduct(Product product)
        {
            _dbContext.Product.Add(product);
            _dbContext.SaveChanges();
            return product;
        }

        public void DeleteProduct(int id)
        {
            Product product = _dbContext.Product.Find(id); //Ucitavamo objekat u db context (ako postoji naravno)

            _dbContext.Product.Remove(product);

            _dbContext.SaveChanges(); //Obavezno sacuvati promene inace se nista nece desiti u bazi.

        }

        public List<Product> GetAllProducts()
        {
            List<Product> products = _dbContext.Product.ToList();//ovde get uradi 
            return products;
        }
        public List<Product> GetAllProducts(int id)
        {
            List<Product> products = _dbContext.Product.Where(p => p.SellerId == id).ToList();
            return products;
        }

        public Product GetById(int id)
        {
            Product product = _dbContext.Product.Find(id);
            return product;
        }

        public void saveChanges()
        {
            _dbContext.SaveChanges();
        }
    }
}
