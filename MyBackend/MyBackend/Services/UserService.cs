using AutoMapper;
using MyBackend.DTO;
using MyBackend.Infrastructure;
using MyBackend.Models;
using MyBackend.Services.Interfaces;

namespace MyBackend.Services
{
    public class UserService : IUserService
    {
        private readonly IMapper _mapper;
        private readonly ApplicationDbContext _dbContext;

        public UserService(IMapper mapper, ApplicationDbContext dbContext)
        {
            _mapper = mapper;
            _dbContext = dbContext;
        }
        public UserDto AddUsers(UserDto newUser)
        {
            User user = _mapper.Map<User>(newUser);
            _dbContext.Users.Add(user);
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
    }
}
