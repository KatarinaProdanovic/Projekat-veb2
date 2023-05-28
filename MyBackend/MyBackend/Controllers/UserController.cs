using Microsoft.AspNetCore.Mvc;
using MyBackend.DTO;
using MyBackend.Services.Interfaces;

namespace MyBackend.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("addUser")]
        public IActionResult CreateStudent([FromBody] UserDto user)
        {
            Console.WriteLine(user.Email);
            Console.WriteLine("jjjrejt");
            return Ok();
            //return Ok(_userService.AddUsers(user));
        }

    }
}
