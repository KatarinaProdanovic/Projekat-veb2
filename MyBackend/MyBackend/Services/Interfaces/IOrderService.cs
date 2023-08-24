using MyBackend.DTO;

namespace MyBackend.Services.Interfaces
{
    public interface IOrderService
    {
        NewOrderDto AddOrder(NewOrderDto newOrder);
        List<OrderDTO> GetAll(int id);
        List<OrderDTO> GetAllForSeller(int id);
        List<OrderDTO> GetAllForAdmin();
        List<OrderDTO> GetAllForSellerPrev(int id);
        void DeleteOrder(int id);
    }
}
