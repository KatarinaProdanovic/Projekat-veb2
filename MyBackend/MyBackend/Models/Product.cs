namespace MyBackend.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string ProductName { get; set; }
        public int Quantity { get; set; }//koliko ih ima 
        public string Description { get; set; }

        public int SellerId { get; set; } // Strani ključ
        public User Seller { get; set; } // Referenca na prodavca

        public int Price { get; set; }//koliko ih ima 
        public string Photo { get; set; }

    }
}
