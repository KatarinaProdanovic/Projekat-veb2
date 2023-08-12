namespace MyBackend.Models
{
    public class OrderItem//reprezentuje stavku porudzbine
    {
        public int OrderItemId { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public string ProductName { get; set; }
        public int Quantity { get; set; }//koliko ih zeli 
        // Dodajte ostala svojstva stavke porudžbine po potrebi


        public int OrderId { get; set; }
        public Order Order { get; set; }

        public int SellerId { get; set; } // Dodajte ovde strani ključ za prodavca
         public User Seller { get; set; }
        // Dodajte referencu na proizvod
       
    }
}
