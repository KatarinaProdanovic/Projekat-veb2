using MyBackend.constants;

namespace MyBackend.Models
{
    public class User
    {
        public int Id { get; set; }
        public string? UserName { get; set; }
        public string Email { get; set; }
        public string? Password { get; set; }
        public string? ConfirmPassword { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string? Adress { get; set; }
        public UserType Type { get; set; }
        public string? PhotoPath { get; set; }

        public VerificationType? isVerified { get; set; }
       
        public List<Order> Orders { get; set; }


    }
}
