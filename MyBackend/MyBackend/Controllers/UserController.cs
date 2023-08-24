using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Hosting.Internal;
using MyBackend.DTO;
using MyBackend.Models;
using MyBackend.Services.Interfaces;
using Newtonsoft.Json;
using System.Data;
using System.Runtime.Intrinsics.X86;
using System.Security.Cryptography;
using static ElasticEmailClient.Api;
using static ElasticEmailClient.ApiTypes;


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
        [HttpPost("registerGoogle")]
        public async Task<IActionResult> RegisterUserGoogle([FromBody] RegisterGoogleDto registerGoogleDto)
        {
            try
            {
                var token = registerGoogleDto.GoogleToken;
                var validPayload = await Google.Apis.Auth.GoogleJsonWebSignature.ValidateAsync(token);
                var userEmail = validPayload.Email;
                var userName = validPayload.GivenName;
                var userLastname = validPayload.FamilyName;
                var userPicture = validPayload.Picture;
                UserDto registerDto = new UserDto();
                registerDto.Email = userEmail;
                registerDto.Name = userName;
                registerDto.Surname = userLastname;
                registerDto.Photo = userPicture;
   
     
                var jsonResponse = JsonConvert.SerializeObject(_userService.RegisterGoogle(userEmail, userName, userLastname, userPicture));
                return Ok(jsonResponse);

               

           
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
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
                if (user.UserName == "" || user.UserName.Length < 2)
                {
                    return BadRequest("User name  must be at least 2 characters long");
                }
                if (user.Name == "" || user.Name.Length < 2)
                {
                    return BadRequest("Name must be at least 2 characters long");
                }
                if (user.Adress == "" || user.Adress.Length < 6)
                {
                    return BadRequest("Address must be at least 6 characters long");
                }
                if (user.Adress == "" || user.Adress.Length < 6)
                {
                    return BadRequest("Address must be at least 6 characters long");
                }
                if (user.Email == "" || !user.Email.Contains("@"))
                {
                    return BadRequest("Invalid email");
                }
                if (user.Tip == null)
                {
                    return BadRequest("Invalid type");
                }
                UserDto user1 = new UserDto();
                user1 = user;


                if (confirm != password)
                {
                    return BadRequest("Confirm password must be equal to password");
                }

                byte[] imageBytes = Convert.FromBase64String(GetBase64Data(user.Photo));
                string folderName = "UserPhotos";

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

                user1.PhotoPath = user.Photo;
                // Sačuvajte korisnika u bazi podatak
               
                if(user1.Tip == 0) {
                    user1.Type = constants.UserType.Customer;
                    return Ok(_userService.AddUsers(user1));
                }
                else
                {
                    user1.Type = constants.UserType.Seller;
                   
                    return Ok(_userService.AddUsers(user1));
                }
            
               
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
            //return Ok(_userService.AddUsers(user));
        }

        [HttpPost("profile")]
        [Authorize(Roles = "Seller, Admin, Customer")]
        public IActionResult GetProfile([FromBody] EditProfileDto dto)
        {

            try
            {
                EditProfileDto newEd = new EditProfileDto();
                newEd = dto;
                if(newEd.Type == "Customer" || newEd.Type == "Admin")
                {
                    return Ok(_userService.GetProfile(newEd));
                }
                else
                {
                    return Ok(_sellerService.GetProfile(newEd));
                }
               

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }


        [HttpPost("getUser")]
        [Authorize(Roles = "Seller, Admin, Customer")]
        public IActionResult GetUser([FromBody] string mail)
        {

            try

            {
               // var jsonResponse = JsonConvert.SerializeObject(_sellerService.GetStatus(mail));
                return Ok(_userService.GetUser(mail));
            }
            catch (Exception ex)
            {
                // Vratite grešku ukoliko je došlo do problema
                // return Ok();
                return BadRequest(ex.Message);
            }
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

        [HttpPut("edit")]
        [Authorize(Roles = "Seller, Admin, Customer")]
        public IActionResult EditUser([FromBody] EditProfileDto user)
        {
            try
            {
                Console.WriteLine(user.Email);
                Console.WriteLine(user.Photo);
                Console.WriteLine(user.DateOfBirth);

                string password = user.Password;
                string confirm = user.ConfirmPassword;

                /*   if (password == "" || password.Length < 6)
                   {
                       return BadRequest("Password must be at least 6 characters long");
                   }
                */







                // Sačuvajte putanju do slike (imagePath) u bazi podataka, na primer kao deo entiteta korisnika
                // user1.PhotoPath = user.Photo;
                // Sačuvajte korisnika u bazi podatak
              
                byte[] imageBytes = Convert.FromBase64String(GetBase64Data(user.Photo));

                // Ime foldera koji želite da kreirate unutar projekta
                string folderName = "UserPhotos";

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


                return Ok(_userService.EditUser(user));

                


            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
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
