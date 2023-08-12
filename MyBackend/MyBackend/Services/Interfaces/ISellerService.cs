using MyBackend.DTO;

namespace MyBackend.Services.Interfaces
{
    public interface ISellerService
    {
        List<UserDto> GetSellers();
        UserDto GetById(long id);
       
        UserDto UpdateSellers(UpdateDto newCustomerData);
        void DeleteCustomers(long id);
      

        string GetStatus(string mail);
        EditProfileDto GetProfile(EditProfileDto dto);
        
    }
}
