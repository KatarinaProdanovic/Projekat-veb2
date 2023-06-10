using MyBackend.Models;

namespace MyBackend.DTO
{
    public class UserDto
    {
        public long Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Adress { get; set; }
        public string? Type { get; set; }
        public string? Photo { get; set; }
        public string? PhotoPath { get; set; }
        public string ? IsVerified { get; set; }

        public int? Tip { get; set; }

    }
   

}
