using MyBackend.DTO;

namespace MyBackend.Services.Interfaces
{
    public interface ISellerService
    {
        List<UserDto> GetCustomers();
        UserDto GetById(long id);
        UserDto AddCustomer(UserDto newCustomer);
        UserDto UpdateCustomers(long id, UserDto newCustomerData);
        void DeleteCustomers(long id);
        string Login(LoginDto newDto);
    }
}
