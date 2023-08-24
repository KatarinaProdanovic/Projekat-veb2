using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MyBackend.DTO;
using MyBackend.Models;
using MyBackend.Repository.Interfaces;
using MyBackend.Services.Interfaces;

namespace MyBackend.Services
{
    public class OrderService : IOrderService
    {
        private readonly IMapper _mapper;

        private readonly IConfigurationSection _secretKey;

        private readonly IOrderRepository _orderRepository;
        private readonly IProductRepository _productRepository;
        public OrderService(IMapper mapper, IConfiguration config, IOrderRepository orderRepository, IProductRepository productRepository)
        {
            _mapper = mapper;
            _secretKey = config.GetSection("SecretKey");
            _orderRepository = orderRepository;
            _productRepository = productRepository;
        }
        public NewOrderDto AddOrder(NewOrderDto newOrder)
        {
            Order order = _mapper.Map<Order>(newOrder);
            int cena = 0;
            order.OrderDate= DateTime.Now;
            DateTime currentDateTime = DateTime.Now;

            //nasumicno vreme dostave
            Random random = new Random();
            int randomMinutes = random.Next(60, 1440);

            // Dodajemo nasumičan broj minuta na trenutno vreme
            DateTime futureDateTime = currentDateTime.AddMinutes(randomMinutes);

           
            order.DeliveryDate = futureDateTime;

            foreach (var orderItem in newOrder.OrderItem)
            {
                Product product1 = _productRepository.GetById(orderItem.ProductId);
                if(product1.Quantity >= orderItem.Quantity)
                {
                    int postarina = 200;
                    int c = orderItem.Price * orderItem.Quantity + postarina;
                    cena += c;
                }
                else
                {
                    return null;
                }
               

            }
            
            order.Price = cena;
            List<Order> users = _orderRepository.GetAllOrders();
            Order user2 = users.FirstOrDefault(x => x.Id == newOrder.Id);//ako vec ne postoji takav registrovan onda ga dodaj

            if (user2 == null) { 
                
                Order createdOrder = _orderRepository.AddOrder(order);

                foreach (var orderItem in newOrder.OrderItem.ToList())
                {
                    Product product = _productRepository.GetById(orderItem.ProductId);

                
                        product.Quantity -= orderItem.Quantity;
                    


                 

                    OrderItem oi = new OrderItem();
                    oi.ProductId = orderItem.ProductId;
                    oi.ProductName = orderItem.ProductName;
                    oi.Quantity = orderItem.Quantity;
                    oi.SellerId = orderItem.SellerId;
                    oi.OrderId = createdOrder.Id;
                    _orderRepository.AddOrderItem(oi);

                }

                _productRepository.saveChanges();
                return _mapper.Map<NewOrderDto>(newOrder); }



            return newOrder; //Dobra je praksa vratiti kreirani objekat nazad,
                               //narocito ako se auto generise ID
        }

        public void DeleteOrder(int id)
        {
            List<OrderItem> items = _orderRepository.GetOrderItem(id);
            List<Order> users = _orderRepository.GetAllOrders();
            Order user2 = users.FirstOrDefault(x => x.Id == id);
            user2.IsCenceled = true;
            _orderRepository.saveChanges();
            if (items == null)
            {
                return;
            }
            else
            {
             foreach( var i in items)
                {
                    Product product = _productRepository.GetById(i.ProductId);


                    product.Quantity += i.Quantity;
                    _productRepository.saveChanges();
                }
            }

        }

        public List<OrderDTO> GetAll(int id)
        {
            List<OrderDTO> orders = new List<OrderDTO>();
            orders = _mapper.Map<List<OrderDTO>>(_orderRepository.GetAllOrders(id));

            if (orders.Count == 0)
            {
                return null;
            }

            return orders;
        }

        public List<OrderDTO> GetAllForAdmin()
        {
            List<OrderDTO> orders = new List<OrderDTO>();
            orders = _mapper.Map<List<OrderDTO>>(_orderRepository.GetAllOrders());

            if (orders.Count == 0)
            {
                return null;
            }

            return orders;
        }

        public List<OrderDTO> GetAllForSeller(int id)
        {


            List<OrderDTO> orders = new List<OrderDTO>();
            orders = _mapper.Map<List<OrderDTO>>(_orderRepository.GetAllOrdersForSeller(id));

            if (orders.Count == 0)
            {
                return null;
            }

            return orders;
        }

        public List<OrderDTO> GetAllForSellerPrev(int id)
        {
            List<OrderDTO> orders = new List<OrderDTO>();
            orders = _mapper.Map<List<OrderDTO>>(_orderRepository.GetAllOrdersForSellerPrev(id));

            if (orders.Count == 0)
            {
                return null;
            }

            return orders;
        }
    }
}
