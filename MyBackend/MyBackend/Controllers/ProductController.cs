using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyBackend.DTO;
using MyBackend.Models;
using MyBackend.Services;
using MyBackend.Services.Interfaces;
using System.Data;

namespace MyBackend.Controllers
{
    [Route("api/products")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IWebHostEnvironment _environment;
        private readonly IProductService _productService;
        public ProductController(IWebHostEnvironment environment, IProductService productService)
        {
            _productService = productService;
            _environment = environment;

        }
        [HttpPost("add")]
        [Authorize(Roles = "Seller")]
        public IActionResult CreateProduct([FromBody] ProductDto user)
        {
            try
            {
                Console.WriteLine(user.ProductName);
                Console.WriteLine(user.Photo);
                Console.WriteLine(user.Description);

                int password = user.SellerId;
                int confirm = user.Price;

                // Sačuvajte putanju do slike (imagePath) u bazi podataka, na primer kao deo entiteta korisnika
                byte[] imageBytes = Convert.FromBase64String(GetBase64Data(user.Photo));

                // Ime foldera koji želite da kreirate unutar projekta
                string folderName = "ProductPhotos";

                // Provera da li folder postoji, ako ne, kreirajte ga
                string projectPath = Directory.GetCurrentDirectory();
                string folderPath = Path.Combine(projectPath, folderName);

                if (!Directory.Exists(folderPath))
                {
                    Directory.CreateDirectory(folderPath);
                    Console.WriteLine("Kreiran je folder: " + folderPath);
                }

                // Putanja gde želite da sačuvate sliku unutar novog foldera
                string fileName = Guid.NewGuid().ToString() + ".jpg";
                string imagePath = Path.Combine(folderPath, fileName);

                // Sačuvaj sliku
                System.IO.File.WriteAllBytes(imagePath, imageBytes);
                return Ok(_productService.AddProduct(user));


            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            //return Ok(_userService.AddUsers(user));
        }
       
        [HttpPost("edit")]
        [Authorize(Roles = "Seller")]
        public IActionResult EditProduct([FromBody] ProductDto user)
        {
            try
            {
                Console.WriteLine(user.ProductName);
                Console.WriteLine(user.Photo);
                Console.WriteLine(user.Description);

                int password = user.SellerId;
                int confirm = user.Price;

                // Sačuvajte putanju do slike (imagePath) u bazi podataka, na primer kao deo entiteta korisnika
                byte[] imageBytes = Convert.FromBase64String(GetBase64Data(user.Photo));

                // Ime foldera koji želite da kreirate unutar projekta
                string folderName = "ProductPhotos";

                // Provera da li folder postoji, ako ne, kreirajte ga
                string projectPath = Directory.GetCurrentDirectory();
                string folderPath = Path.Combine(projectPath, folderName);

                if (!Directory.Exists(folderPath))
                {
                    Directory.CreateDirectory(folderPath);
                    Console.WriteLine("Kreiran je folder: " + folderPath);
                }

                // Putanja gde želite da sačuvate sliku unutar novog foldera
                string fileName = Guid.NewGuid().ToString() + ".jpg";
                string imagePath = Path.Combine(folderPath, fileName);

                // Sačuvaj sliku
                System.IO.File.WriteAllBytes(imagePath, imageBytes);
                return Ok(_productService.EditProduct(user));


            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            //return Ok(_userService.AddUsers(user));
        }
        static string GetBase64Data(string base64String)
        {
            const string base64Prefix = "base64,";

            int index = base64String.IndexOf(base64Prefix);
            if (index != -1)
            {
                return base64String.Substring(index + base64Prefix.Length);
            }

            return base64String;
        }

        [HttpGet("all/{id}")]
        [Authorize(Roles = "Seller")]
        public IActionResult GetProducts(int id)
        {

            try

            {
                // var jsonResponse = JsonConvert.SerializeObject(_sellerService.GetStatus(mail));
                return Ok(_productService.GetAll(id));
            }
            catch (Exception ex)
            {
                // Vratite grešku ukoliko je došlo do problema
                // return Ok();
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("all")]
        [Authorize(Roles = "Seller, Admin, Customer")]
        public IActionResult GetAllProducts(int id)
        {

            try

            {
                // var jsonResponse = JsonConvert.SerializeObject(_sellerService.GetStatus(mail));
                return Ok(_productService.GetAll());
            }
            catch (Exception ex)
            {
                // Vratite grešku ukoliko je došlo do problema
                // return Ok();
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("delete/{id}")]
        [Authorize(Roles = "Seller")]
        public IActionResult DeleteProduct(int id)
        {

            try

            {
                // var jsonResponse = JsonConvert.SerializeObject(_sellerService.GetStatus(mail));
                _productService.DeleteProducts(id);
                var response = new
                {
                    message = "Proizvod je uspešno obrisan.",
                    hasError = false
                };
                return Ok(response);
            }
            catch (Exception ex)
            {
                // Vratite grešku ukoliko je došlo do problema
                // return Ok();
                return BadRequest(ex.Message);
            }
        }

      
    }
}
