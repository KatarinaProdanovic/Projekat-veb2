using AutoMapper;
using Microsoft.IdentityModel.Tokens;
using MyBackend.DTO;
using MyBackend.Infrastructure;
using MyBackend.Models;
using MyBackend.Services.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace MyBackend.Services
{
    public class SellerService : ISellerService
    {

        private readonly IMapper _mapper;
        private readonly ApplicationDbContext _dbContext;
        private readonly IConfigurationSection _secretKey;

        public SellerService(IMapper mapper, ApplicationDbContext dbContext, IConfiguration config)
        {
            _mapper = mapper;
            _dbContext = dbContext;
            _secretKey = config.GetSection("SecretKey");
        }
        public string crypto(string password)
        {

            string passwordHash = BCrypt.Net.BCrypt.HashPassword(password);
            return passwordHash;
        }
        public UserDto AddCustomer(UserDto newCustomer)
        {

            Seller customer = _mapper.Map<Seller>(newCustomer);
            Seller customer1 = new Seller();
            customer1 = customer;

            customer1.Password = crypto(customer.Password);
            customer1.ConfirmPassword = crypto(customer.ConfirmPassword);

            _dbContext.Sellers.Add(customer1);
            _dbContext.SaveChanges();

            return _mapper.Map<UserDto>(newCustomer);
        }

        public void DeleteCustomers(long id)
        {
            throw new NotImplementedException();
        }

        public UserDto GetById(long id)
        {
            throw new NotImplementedException();
        }

        public List<UserDto> GetCustomers()
        {
            throw new NotImplementedException();
        }

        public string Login(LoginDto newDto)
        {
            List<Seller> customers = new List<Seller>();

            customers = _dbContext.Sellers.ToList();
            if (customers.Count == 0)
            {
                return null;
            }
            Seller customer = customers.First(x => x.Email == newDto.Email);

            if (customer == null) { return null; }

            if (BCrypt.Net.BCrypt.Verify(newDto.Password, customer.Password))//Uporedjujemo hes pasvorda iz baze i unetog pasvorda
            {
                List<Claim> claims = new List<Claim>();

                claims.Add(new Claim(ClaimTypes.Role, customer.Type)); //Add user type to claim

                claims.Add(new Claim("email", customer.Email));
                //mozemo izmisliti i mi neki nas claim



                SymmetricSecurityKey secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey.Value));
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                var tokeOptions = new JwtSecurityToken(
                    issuer: "http://localhost:7006", //url servera koji je izdao token
                    claims: claims, //claimovi
                    expires: DateTime.Now.AddMinutes(2), //vazenje tokena u minutama
                    signingCredentials: signinCredentials //kredencijali za potpis
                );
                string tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
                return tokenString;
            }
            else
            {
                return null;
            }
        }

        public UserDto UpdateCustomers(long id, UserDto newUserData)
        {
            throw new NotImplementedException();
        }

    }
}
