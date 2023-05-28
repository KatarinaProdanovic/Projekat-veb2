using Microsoft.EntityFrameworkCore;
using MyBackend.Models;

namespace MyBackend.Infrastructure
{
    public class ApplicationDbContext :DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
        public DbSet<User> Users { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            //Kazemo mu da pronadje sve konfiguracije u Assembliju i da ih primeni nad bazom
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);

            modelBuilder.Entity<User>().HasData(new User { Id = 1, UserName="Kaca", Email="kaca@gmail.com", Name="Katarina", Surname="prodanovic", Adress="GLjub", Password="ksjdlsf", DateOfBirth=DateTime.Now, Photo="slika1", Type="user"});

        }


    }
}
