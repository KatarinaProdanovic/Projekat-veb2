using MyBackend.DTO;
using MyBackend.Models;

namespace MyBackend.Repository.Interfaces
{
    public interface IOrderRepository
    {
        Order AddOrder(Order order);
        OrderItem AddOrderItem(OrderItem orderItem);
        List<Order> GetAllOrders();
        List<Order> GetAllOrders(int id);
        List<Order> GetAllOrdersForSeller(int id);
        List<Order> GetAllOrdersForSellerPrev(int id);
        List<OrderItem> GetOrderItem(int id);
        void DeleteOrder(int id);
        void saveChanges();
    }
}
