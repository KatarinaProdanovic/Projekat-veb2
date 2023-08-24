using Microsoft.EntityFrameworkCore;
using MyBackend.Infrastructure;
using MyBackend.Models;
using MyBackend.Repository.Interfaces;
using Polly;

namespace MyBackend.Repository
{
    public class OrderRepository : IOrderRepository
    {
        private readonly ApplicationDbContext _dbContext;
        public OrderRepository(ApplicationDbContext dbContext)
        {

            _dbContext = dbContext;

        }
        public Order AddOrder(Order order)
        {
            _dbContext.Orders.Add(order);
            _dbContext.SaveChanges();
            return order;
        }

        public OrderItem AddOrderItem(OrderItem orderItem)
        {
            _dbContext.OrderItem.Add(orderItem);
            _dbContext.SaveChanges();
            return orderItem;
        }

        public void DeleteOrder(int id)
        {
            throw new NotImplementedException();
        }

        public List<Order> GetAllOrders()
        {
            List<Order> orders = _dbContext.Orders.Include(order => order.OrderItems)
                    .ThenInclude(orderItem => orderItem.Seller).ToList();//ovde get uradi 
            return orders;
        }

        public List<Order> GetAllOrders(int id)
        {
            List<Order> orders = _dbContext.Orders.Where(p => p.UserId == id && p.IsCenceled != true).Include(o => o.OrderItems).ToList();
            return orders;
        }

        public List<Order> GetAllOrdersForSeller(int id)
        {
            DateTime today = DateTime.Today;

            var filteredOrders = _dbContext.Orders
                .Where(order => !order.IsCenceled && order.DeliveryDate > today)
                .Include(order => order.OrderItems)
                    .ThenInclude(orderItem => orderItem.Seller)
                .ToList();

           
            var filteredOrdersForSeller = filteredOrders
                .Where(order => order.OrderItems.Any(orderItem => orderItem.SellerId == id))
                .ToList();
            return filteredOrdersForSeller;
        }

        public List<Order> GetAllOrdersForSellerPrev(int id)
        {
            DateTime today = DateTime.Today;

            var filteredOrders = _dbContext.Orders
                .Where(order => !order.IsCenceled && order.DeliveryDate < today)
                .Include(order => order.OrderItems)
                    .ThenInclude(orderItem => orderItem.Seller)
                .ToList();


            var filteredOrdersForSeller = filteredOrders
                .Where(order => order.OrderItems.Any(orderItem => orderItem.SellerId == id))
                .ToList();
            return filteredOrdersForSeller;
        }

        public List<OrderItem> GetOrderItem(int id)
        {
            List<OrderItem> orders = _dbContext.OrderItem.Where(p => p.OrderId == id).ToList();
            return orders;
        }

        public void saveChanges()
        {
            _dbContext.SaveChanges();
        }
    }
}
