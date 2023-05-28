using MyBackend.DTO;

namespace MyBackend.Services.Interfaces
{
    public interface IUserService
    {
        List<UserDto> GetUsers();
        UserDto GetById(long id);
        UserDto AddUsers(UserDto newUser);
        UserDto UpdateUsers(long id, UserDto newUserData);
        void DeleteUsers(long id);
    }
}
