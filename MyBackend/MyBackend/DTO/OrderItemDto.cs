using MyBackend.Models;

namespace MyBackend.DTO
{
    public class OrderItemDto
    {
  
        public int ProductId { get; set; }
        public int SellerId { get; set; }
        public int Quantity { get; set; }
        public string ProductName { get; set; }
        public int Price { get; set; }
     //koliko ih zeli 
        // Dodajte ostala svojstva stavke porudžbine po potrebi 
     

    }
}
