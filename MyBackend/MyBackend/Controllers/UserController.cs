using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Hosting.Internal;
using MyBackend.DTO;
using MyBackend.Models;
using MyBackend.Services.Interfaces;


namespace MyBackend.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IWebHostEnvironment _environment;

        public UserController(IUserService userService, IWebHostEnvironment environment)
        {
            _userService = userService;
            _environment = environment;
        }

        [HttpPost("registration")]
        public IActionResult CreateStudent([FromBody] UserDto user)
        {
            try
            {
                Console.WriteLine(user.Email);
                Console.WriteLine(user.Photo);
                Console.WriteLine(user.DateOfBirth);
                UserDto user1 = new UserDto();
                user1 = user;
                //user1.Photo = SaveImage(user.Photo);
                string folderPath = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.Desktop), "NazivFoldera");

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
                // Sačuvajte korisnika u bazi podataka


             
                return Ok(_userService.AddUsers(user1));
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
            //return Ok(_userService.AddUsers(user));
        }

      
    }
}
