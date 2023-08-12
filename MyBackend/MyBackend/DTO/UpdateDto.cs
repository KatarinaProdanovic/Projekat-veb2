namespace MyBackend.DTO
{
    public class UpdateDto
    {
        public int Id { get; set; }
        
        public string Email { get; set; }
      
        public string Name { get; set; }
        public string Surname { get; set; }
       
        public string Adress { get; set; }
        public string? IsVerified { get; set; }
    }
}
