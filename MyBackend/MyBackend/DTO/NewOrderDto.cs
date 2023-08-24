namespace MyBackend.DTO
{
    public class NewOrderDto
    {
        public int Id { get; set; }
        public string Comment { get; set; }
        public string Address { get; set; }
  
        public int UserId { get; set; }
        public List<OrderItemDto> OrderItem { get; set; }
    }
}
