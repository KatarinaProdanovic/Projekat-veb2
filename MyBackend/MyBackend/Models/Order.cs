namespace MyBackend.Models
{
    public class Order
        {
            public int Id { get; set; }
            public DateTime OrderDate { get; set; }//kada je kreirana porudzbina
           public DateTime DeliveryDate { get; set; } //vreme isporuke
           public string Comment { get; set; }
           public string Address { get; set; }

          public int UserId { get; set; } // Strani ključ
          public User User { get; set; } // Referenca na korisnika

        public List<OrderItem> OrderItems { get; set; }
      
        public Order() { }
        }

    
}
