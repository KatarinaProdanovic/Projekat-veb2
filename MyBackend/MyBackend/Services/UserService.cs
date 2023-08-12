using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using MyBackend.DTO;
using MyBackend.Infrastructure;
using MyBackend.Models;
using MyBackend.Repository.Interfaces;
using MyBackend.Services.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BCrypt.Net;
using System;
using System.Runtime.Intrinsics.X86;

namespace MyBackend.Services
{
    public class UserService : IUserService
    {
        private readonly IMapper _mapper;
     
        private readonly IConfigurationSection _secretKey;
       
        private readonly IUserRepository _userRepository;
        public UserService(IMapper mapper, IConfiguration config, IUserRepository userRepository)
        {
            _mapper = mapper;
            _secretKey = config.GetSection("SecretKey");
            _userRepository = userRepository;
        }


        public User GetUser(string mail)
        {
            List<User> users = new List<User>();

            users = _userRepository.GetAllUsers();
            if (users.Count == 0)
            {
                return null;
            }
            User user = users.First(x => x.Email == mail);

            if (user == null) { return null; }
            return user;


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

            if(user1.Type == constants.UserType.Customer)
            {
                user1.isVerified = constants.VerificationType.Approved;
            }
            else
            {
                user1.isVerified = constants.VerificationType.InProcessing;
            }
            List<User> users = _userRepository.GetAllUsers();
            User user2 = users.FirstOrDefault(x => x.Email == newUser.Email);//ako vec ne postoji takav registrovan onda ga dodaj

            if (user2 == null) { _userRepository.AddUser(user1); return _mapper.Map<UserDto>(newUser); }

            UserDto u = new UserDto();

            return u; //Dobra je praksa vratiti kreirani objekat nazad,
                                                  //narocito ako se auto generise ID
        }
     public  UserDto UpdateUsers(long id, UserDto newUserData)
        {
            throw new NotImplementedException();
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

      

        public EditProfileDto GetProfile(EditProfileDto dto)
        {
            throw new NotImplementedException();
        }

        public string RegisterGoogle(string email, string name, string lastname, string picture)
        {
            User user = new User() { Email = email, Name = name, Surname = lastname, PhotoPath = picture, Type = constants.UserType.Customer
        };
            List<User> users = _userRepository.GetAllUsers();


            User user1 = users.FirstOrDefault(x => x.Email == user.Email);

            if(user1 == null) { _userRepository.AddUser(user); }
            //  user.UserType = Enums.UserType.BUYER;
          


            if (user != null)
            {
                    List<Claim> claims = new List<Claim>();

                    claims.Add(new Claim(ClaimTypes.Role, user.Type.ToString()));
                    claims.Add(new Claim("email", user.Email));
                  

                    SymmetricSecurityKey secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey.Value));
                    var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                    var tokeOptions = new JwtSecurityToken(
                        issuer: "http://localhost:7006",
                        claims: claims,
                        expires: DateTime.Now.AddMinutes(2),
                        signingCredentials: signinCredentials
                    );

                    string tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
                    return tokenString;
              
            }
            return null;
        }


        public string Login(LoginDto newDto)
        {
            List<User> users = _userRepository.GetAllUsers();

            if (users.Count == 0 && users.Count == 0)
            {
                return null;
            }

            User user = users.FirstOrDefault(x => x.Email == newDto.Email);


            if (user != null)
            {
                if (BCrypt.Net.BCrypt.Verify(newDto.Password, user.Password))
                {
                    List<Claim> claims = new List<Claim>();

                    claims.Add(new Claim(ClaimTypes.Role, user.Type.ToString()));
                    claims.Add(new Claim("email", user.Email));
                    claims.Add(new Claim("isVerified", user.isVerified.ToString()));

                    SymmetricSecurityKey secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey.Value));
                    var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                    var tokeOptions = new JwtSecurityToken(
                        issuer: "http://localhost:7006",
                        claims: claims,
                        expires: DateTime.Now.AddMinutes(2),
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
           
            
           
                return null;
            
        }

        public bool CheckPassword(string enteredPassword, string hashedPasswordFromDatabase)
        {
            return BCrypt.Net.BCrypt.Verify(enteredPassword, hashedPasswordFromDatabase);
        }
        public EditProfileDto EditUser(EditProfileDto newStudData)
{
            User user = _userRepository.GetById(newStudData.Id);
   
              if (user != null)
              {


              if(newStudData.Password != "" && newStudData.Password != null)
                {
                    bool isPasswordValid = CheckPassword(newStudData.Password, user.Password);

                    if (isPasswordValid)
                    {
                        user.Password = crypto(newStudData.ConfirmPassword);
                        user.ConfirmPassword = crypto(newStudData.ConfirmPassword);
                    }

                }


          user.Email = newStudData.Email;
                if (newStudData.UserName != null)
                {
                    user.UserName = newStudData.UserName;
                }
         
           user.Name = newStudData.Name;
           user.Surname = newStudData.Surname;
                if (newStudData.DateOfBirth != null)
                {
                    user.DateOfBirth = (DateTime)newStudData.DateOfBirth;
                }
                if (newStudData.Adress!= null)
                {
                    user.Adress = newStudData.Adress;

                }

                if (newStudData.Photo != "")
                {
                    user.PhotoPath = newStudData.Photo;
                }


          _userRepository.saveChanges();  //Samo menjanje polja ucitanog studenta iz baze podataka je dovoljno

            }                         //da se ti podaci promene i u bazi nakon cuvanja

   return _mapper.Map<EditProfileDto>(user);
}


    }
}
