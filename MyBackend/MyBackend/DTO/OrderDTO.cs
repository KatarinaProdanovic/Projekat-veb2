using MyBackend.Models;

namespace MyBackend.DTO
{
    public class OrderDTO
    {
        public int Id { get; set; }
        public DateTime OrderDate { get; set; }//kada je kreirana porudzbina
        public DateTime DeliveryDate { get; set; } //vreme isporuke
        public string Comment { get; set; }
        public string Address { get; set; }

        public int UserId { get; set; } // Strani ključ
       
        public List<OrderItemOut> OrderItems { get; set; }

        public int Price { get; set; }
        public bool IsCenceled { get; set; } //da li je otkazana porudzbina
    }
}
