using MyBackend.DTO;
using MyBackend.Models;
using Org.BouncyCastle.Asn1.Cmp;

namespace MyBackend.Repository.Interfaces
{
    public interface IUserRepository
    {
        User AddUser(User user);

       List<User> GetAllUsers();
        List<User> GetSellerForStatusS();

        void saveChanges();
        User GetById(int id);
    }
}
