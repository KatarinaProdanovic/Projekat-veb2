using MyBackend.DTO;
using MyBackend.Models;

namespace MyBackend.Services.Interfaces
{
    public interface IUserService
    {
        List<UserDto> GetUsers();

        User GetUser(string mail);
        UserDto GetById(long id);
        UserDto AddUsers(UserDto newUser);
        UserDto UpdateUsers(long id, UserDto newUserData);
        void DeleteUsers(long id);
        string Login(LoginDto newDto);
        EditProfileDto GetProfile(EditProfileDto dto);
        string RegisterGoogle(string email, string name, string lastname, string picture);
        EditProfileDto EditUser(EditProfileDto newStudData);
    }
}
