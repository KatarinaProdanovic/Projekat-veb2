using Microsoft.EntityFrameworkCore;
using MyBackend.Models;
using System;

namespace MyBackend.Infrastructure
{
    public class ApplicationDbContext :DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
        public DbSet<User> Users { get; set; }
       
        public DbSet<Order> Orders { get; set; }
        public DbSet<Product> Product { get; set; }
        public DbSet<OrderItem> OrderItem { get; set; }

        public string crypto(string password)
        {

            string passwordHash = BCrypt.Net.BCrypt.HashPassword(password);
            return passwordHash;
        }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
                {
                    base.OnModelCreating(modelBuilder);
                    //Kazemo mu da pronadje sve konfiguracije u Assembliju i da ih primeni nad bazom
                    modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);

                    modelBuilder.Entity<User>().HasData(new User { Id = 2, UserName="Kaca", Email="kaca@gmail.com",
                        Name="Ana", Surname="Anic", Adress="GLjub", Password = crypto("123456"), ConfirmPassword = crypto("123456"), 
                        DateOfBirth=DateTime.Now, Type= constants.UserType.Admin, isVerified = constants.VerificationType.Approved
                    });

                }
        

    }
}
