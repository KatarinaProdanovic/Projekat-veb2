using AutoMapper;
using Microsoft.AspNetCore.Mvc;
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
    public class UserService : IUserService
    {
        private readonly IMapper _mapper;
        private readonly ApplicationDbContext _dbContext;
        private readonly IConfigurationSection _secretKey;
        public UserService(IMapper mapper, ApplicationDbContext dbContext, IConfiguration config)
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
        public UserDto AddUsers([FromBody] UserDto newUser)
        {
            User user = _mapper.Map<User>(newUser);
            User user1 = new User();
            user1 = user;

            user1.Password = crypto(user.Password);
            user1.ConfirmPassword = crypto(user.ConfirmPassword);

            _dbContext.Users.Add(user1);
            _dbContext.SaveChanges();

            return _mapper.Map<UserDto>(newUser); //Dobra je praksa vratiti kreirani objekat nazad,
                                                  //narocito ako se auto generise ID
        }

        public void DeleteUsers(long id)
        {
            throw new NotImplementedException();
        }

        public UserDto GetById(long id)
        {
            throw new NotImplementedException();
        }

        public List<UserDto> GetUsers()
        {
            throw new NotImplementedException();
        }

        public UserDto UpdateUsers(long id, UserDto newUserData)
        {
            throw new NotImplementedException();
        }
        public string Login(LoginDto newDto)
        {
            List<User> users = _dbContext.Users.ToList();
            List<Seller> customers = _dbContext.Sellers.ToList();

            if (users.Count == 0 && customers.Count == 0)
            {
                return null;
            }

            User user = users.FirstOrDefault(x => x.Email == newDto.Email);
            Seller customer = customers.FirstOrDefault(x => x.Email == newDto.Email);

            if (user != null)
            {
                if (BCrypt.Net.BCrypt.Verify(newDto.Password, user.Password))
                {
                    List<Claim> claims = new List<Claim>();

                    claims.Add(new Claim(ClaimTypes.Role, user.Type));
                    claims.Add(new Claim("email", user.Email));

                    SymmetricSecurityKey secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey.Value));
                    var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                    var tokeOptions = new JwtSecurityToken(
                        issuer: "http://localhost:7006",
                        claims: claims,
                        expires: DateTime.Now.AddMinutes(20),
                        signingCredentials: signinCredentials
                    );

                    string tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
                    return tokenString;
                }
                else
                {
                    return null;
                }
            }
            else if (customer != null)
            {
                if (BCrypt.Net.BCrypt.Verify(newDto.Password, customer.Password))
                {
                    List<Claim> claims = new List<Claim>();

                    claims.Add(new Claim(ClaimTypes.Role, customer.Type));
                    claims.Add(new Claim("email", customer.Email));

                    SymmetricSecurityKey secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey.Value));
                    var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                    var tokeOptions = new JwtSecurityToken(
                        issuer: "http://localhost:7006",
                        claims: claims,
                        expires: DateTime.Now.AddMinutes(20),
                        signingCredentials: signinCredentials
                    );

                    string tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
                    return tokenString;
                }
                else
                {
                    return null;
                }
            }
            else
            {
                return null;
            }
        }

    }
}
