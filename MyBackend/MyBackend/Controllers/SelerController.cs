using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyBackend.DTO;
using MyBackend.Models;
using MyBackend.Services;
using MyBackend.Services.Interfaces;
using Newtonsoft.Json;
using Org.BouncyCastle.Asn1.Pkcs;

namespace MyBackend.Controllers
{
    [Route("api/selers")]
    [ApiController]
    public class SelerController : ControllerBase
    {
        private readonly ISellerService _sellerService;
        
        public SelerController( ISellerService sellerService)
        {
          
            _sellerService = sellerService;
          

        }

        [HttpGet("allSeller")]
        [Authorize(Roles = "Admin")]
        public IActionResult AllCategories()
        {

            try

            {
                return Ok(_sellerService.GetSellers());
            }
            catch (Exception ex)
            {
                // Vratite grešku ukoliko je došlo do problema
                // return Ok();
                return BadRequest(ex.Message);
            }
        }



        [HttpPost("status")]
        [Authorize(Roles = "Seller")]
        public IActionResult GetStatus([FromBody] string mail)
        {

            try

            {
                var jsonResponse = JsonConvert.SerializeObject(_sellerService.GetStatus(mail));
                return Ok(jsonResponse);
            }
            catch (Exception ex)
            {
                // Vratite grešku ukoliko je došlo do problema
                // return Ok();
                return BadRequest(ex.Message);
            }
        }



        [HttpPut("update")]
        [Authorize(Roles = "Admin")]
        public IActionResult UpdateSeller([FromBody] UpdateDto dto)
        {
            try
            {
                return Ok(_sellerService.UpdateSellers(dto));

            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
           
        }



       


    }
}
