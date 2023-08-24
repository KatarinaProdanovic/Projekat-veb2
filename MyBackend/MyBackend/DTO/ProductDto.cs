namespace MyBackend.DTO
{
    public class ProductDto
    {
        public int Id { get; set; }
        public string ProductName { get; set; }
        public int Quantity { get; set; }
        public string Description { get; set; }
        public int SellerId { get; set; }
        public int Price { get; set; }
        public string Photo { get; set; }
    }
}
