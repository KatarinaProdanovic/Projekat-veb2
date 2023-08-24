using MyBackend.Models;

namespace MyBackend.DTO
{
    public class OrderItemOut
    {
        public int OrderItemId { get; set; }
        public int ProductId { get; set; }
       
        public string ProductName { get; set; }
        public int Quantity { get; set; }//koliko ih zeli 
        // Dodajte ostala svojstva stavke porudžbine po potrebi


        public int OrderId { get; set; }
      
        public int SellerId { get; set; } // Dodajte ovde strani ključ za prodavca
       
    }
}
