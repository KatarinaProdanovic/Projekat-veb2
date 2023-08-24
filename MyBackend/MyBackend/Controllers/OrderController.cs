using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyBackend.DTO;
using MyBackend.Models;
using MyBackend.Services;
using MyBackend.Services.Interfaces;
using System.Data;

namespace MyBackend.Controllers
{
    [Route("api/orders")]
    [ApiController]
    public class OrderController : Controller
    {
        private readonly IWebHostEnvironment _environment;
        private readonly IOrderService _orderService;
        public OrderController(IWebHostEnvironment environment, IOrderService orderService)
        {
            _orderService = orderService;
            _environment = environment;

        }

        [HttpDelete("delete/{id}")]
        [Authorize(Roles = "Customer")]
        public IActionResult DeleteOrder(int id)
        {

            try

            {
                // var jsonResponse = JsonConvert.SerializeObject(_sellerService.GetStatus(mail));
                _orderService.DeleteOrder(id);
                var response = new
                {
                    message = "Porudzbina je uspešno otkazana.",
                    hasError = false
                };
                return Ok(response);
            }
            catch (Exception ex)
            {
                // Vratite grešku ukoliko je došlo do problema
                // return Ok();
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("allForUser/{id}")]
        [Authorize(Roles = "Customer")]
        public IActionResult GetAllOrders(int id)
        {

            try

            {
               
                
                return Ok(_orderService.GetAll(id));
            }
            catch (Exception ex)
            {
                // Vratite grešku ukoliko je došlo do problema
                // return Ok();
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("allForSeller/{id}")]
        [Authorize(Roles = "Seller")]
        public IActionResult GetAllOrdersForSeller(int id)
        {

            try

            {


                return Ok(_orderService.GetAllForSeller(id));
            }
            catch (Exception ex)
            {
                // Vratite grešku ukoliko je došlo do problema
                // return Ok();
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("allForSellerPrev/{id}")]
        [Authorize(Roles = "Seller")]
        public IActionResult GetAllOrdersForSellerPrev(int id)
        {

            try

            {


                return Ok(_orderService.GetAllForSellerPrev(id));
            }
            catch (Exception ex)
            {
                // Vratite grešku ukoliko je došlo do problema
                // return Ok();
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("allForAdmin")]
        [Authorize(Roles = "Admin")]
        public IActionResult GetAllOrdersForAdmin()
        {

            try

            {


                return Ok(_orderService.GetAllForAdmin());
            }
            catch (Exception ex)
            {
                // Vratite grešku ukoliko je došlo do problema
                // return Ok();
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("saveOrder")]
        [Authorize(Roles = "Customer")]
        public IActionResult CreateOrder([FromBody] NewOrderDto order)
        {
            try
            {

                NewOrderDto o = _orderService.AddOrder(order);
                if(o != null)
                {
                    return Ok(o);
                }

                else
                {
                    return new ObjectResult(new { message = "NEMA DOVOLJNO" })
                    {
                        StatusCode = 400,
                    };
                }

                


            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            //return Ok(_userService.AddUsers(user));
        }

    }
}
