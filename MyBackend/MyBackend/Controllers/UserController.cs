using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Hosting.Internal;
using MyBackend.DTO;
using MyBackend.Models;
using MyBackend.Services.Interfaces;
using Newtonsoft.Json;
using System.Security.Cryptography;


namespace MyBackend.Controllers
{
    [Route("api/users")]
    [ApiController]


   

    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IWebHostEnvironment _environment;
        private readonly ISellerService _sellerService;
        public UserController(IUserService userService, IWebHostEnvironment environment, ISellerService sellerService)
        {
            _userService = userService;
            _environment = environment;
            _sellerService = sellerService;

        }

     
        [HttpPost("registration")]
        public IActionResult CreateStudent([FromBody] UserDto user)
        {
            try
            {
                Console.WriteLine(user.Email);
                Console.WriteLine(user.Photo);
                Console.WriteLine(user.DateOfBirth);

                string password = user.Password;
                string confirm = user.ConfirmPassword;

               if(password == "" || password.Length < 6)
                {
                    return BadRequest("Password must be at least 6 characters long");
                }

                UserDto user1 = new UserDto();
                user1 = user;


                if (confirm != password)
                {
                    return BadRequest("Confirm password must be equal to password");
                }
               


                //user1.Photo = SaveImage(user.Photo);
                // string folderPath = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.Desktop), "NazivFoldera");
                string folderName = "UserImage";
                string folderPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "..", "..", "..", folderName);
                // Provera da li folder postoji
                if (!Directory.Exists(folderPath))
                {
                    // Kreiranje foldera ako ne postoji
                    Directory.CreateDirectory(folderPath);
                }

                // Nastavak sa snimanjem slike
                string base64String = user.Photo;
                byte[] imageData = Convert.FromBase64String(base64String);

                string uniqueFileName = Guid.NewGuid().ToString() + ".jpg";
                string imagePath = Path.Combine(folderPath, uniqueFileName);
                System.IO.File.WriteAllBytes(imagePath, imageData);




                // Sačuvajte putanju do slike (imagePath) u bazi podataka, na primer kao deo entiteta korisnika
                user1.PhotoPath = imagePath;
                // Sačuvajte korisnika u bazi podatak
                if(user1.Tip == 0) {
                    user1.Type = "Customer";
                    return Ok(_userService.AddUsers(user1));
                }
                else
                {
                    user1.Type = "Seller";
                    return Ok(_sellerService.AddCustomer(user1));
                }
            
               
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
            //return Ok(_userService.AddUsers(user));
        }


        [HttpPost("loginUser")]
        public IActionResult LoginUser([FromBody] LoginDto loginData)
        {

            try
            {




                var jsonResponse = JsonConvert.SerializeObject(_userService.Login(loginData));
                return Ok(jsonResponse);

            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }



    }
}
