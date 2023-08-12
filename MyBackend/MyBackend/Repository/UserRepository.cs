using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MyBackend.Infrastructure;
using MyBackend.Models;
using MyBackend.Repository.Interfaces;
using System.Runtime.Intrinsics.X86;

namespace MyBackend.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _dbContext;
        public UserRepository(ApplicationDbContext dbContext)
        {
          
            _dbContext = dbContext;
          
        }


        public User AddUser(User user)
        {

            _dbContext.Users.Add(user);
            _dbContext.SaveChanges();
            return user;
        }

        public List<User> GetAllUsers()
        {
            List<User> users = _dbContext.Users.ToList();//ovde get uradi 
            return users;
        }

        public List<User> GetSellerForStatusS()
        {
            List<User> users = _dbContext.Users.ToList();//ovde get uradi 
            List<User> selers = new List<User>();
            foreach(var u in users)
            {
                  if(u.Type == constants.UserType.Seller)
                {

                    selers.Add(u);
                }
            } 
            return selers;
        }


        public User GetById(int id)
        {
            User user = _dbContext.Users.Find(id);
            return user;
        }

        public void saveChanges()
        {
            _dbContext.SaveChanges();
        }
    }
}
