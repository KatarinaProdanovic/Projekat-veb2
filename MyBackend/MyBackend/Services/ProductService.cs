using AutoMapper;
using MyBackend.DTO;
using MyBackend.Models;
using MyBackend.Repository;
using MyBackend.Repository.Interfaces;
using MyBackend.Services.Interfaces;
using static ElasticEmailClient.Api;

namespace MyBackend.Services
{
    public class ProductService : IProductService
    {
        private readonly IMapper _mapper;

        private readonly IConfigurationSection _secretKey;

        private readonly IProductRepository _productRepository;
        public ProductService(IMapper mapper, IConfiguration config, IProductRepository productRepository)
        {
            _mapper = mapper;
            _secretKey = config.GetSection("SecretKey");
            _productRepository = productRepository;
        }
        public ProductDto AddProduct(ProductDto newProduct)
        {
            Product product = _mapper.Map<Product>(newProduct);
           
            List<Product> users = _productRepository.GetAllProducts();
            Product user2 = users.FirstOrDefault(x => x.Id == newProduct.Id);//ako vec ne postoji takav registrovan onda ga dodaj

            if (user2 == null) { _productRepository.AddProduct(product); return _mapper.Map<ProductDto>(newProduct); }

           

            return newProduct; //Dobra je praksa vratiti kreirani objekat nazad,
                      //narocito ako se auto generise ID
        }

        public void DeleteProducts(int id)
        {
            _productRepository.DeleteProduct(id);
        }

        public ProductDto EditProduct(ProductDto newProduct)
        {
            Product product = _productRepository.GetById(newProduct.Id);

            if (product != null)
            {





                if (newProduct.ProductName != null && newProduct.ProductName != "")
                {
                    product.ProductName = newProduct.ProductName;
                }



                if (newProduct.Price != null && newProduct.Price != 0)
                {
                    product.Price = newProduct.Price;
                }
                if (newProduct.Quantity != null && newProduct.Quantity != 0)
                {
                    product.Quantity = newProduct.Quantity;
                }
                if (newProduct.Description != null && newProduct.Description != "")
                {
                    product.Description = newProduct.Description;
                }
                if (newProduct.Photo != null && newProduct.Photo != "")
                {
                    product.Photo = newProduct.Photo;
                }
                if (newProduct.SellerId != null && newProduct.SellerId != -1)
                {
                    product.SellerId = newProduct.SellerId;
                }
                _productRepository.saveChanges();  //Samo menjanje polja ucitanog studenta iz baze podataka je dovoljno

            }                         //da se ti podaci promene i u bazi nakon cuvanja

            return _mapper.Map<ProductDto>(product);
        }

        public List<ProductDto> GetAll(int id)
        {
            List<ProductDto> products = new List<ProductDto>();
            products =_mapper.Map<List<ProductDto>>(_productRepository.GetAllProducts(id));
          
            if (products.Count == 0)
            {
                return null;
            }
            
            return products;
        }

        public List<ProductDto> GetAll()
        {
            List<ProductDto> products = new List<ProductDto>();
            products = _mapper.Map<List<ProductDto>>(_productRepository.GetAllProducts());

            if (products.Count == 0)
            {
                return null;
            }

            return products;

        }
    }
    
}
