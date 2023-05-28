using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MyBackend.Models;

namespace MyBackend.Infrastructure.Configuration
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasKey(x => x.Id); //Podesavam primarni kljuc tabele

            builder.Property(x => x.Id).ValueGeneratedOnAdd(); //Kazem da ce se primarni kljuc
                                                               //automatski generisati prilikom dodavanja,
                                                               //redom 1 2 3...

            //builder.Property(x => x.Name).HasMaxLength(30);//kazem da je maks duzina 30 karaktera

            builder.HasIndex(x => x.Email).IsUnique();//Kazem da je broj indeksa studenta
                                                            //jedinstven podatak (ne smeju biti 2 ista)

          /*  builder.HasOne(x => x.Faculty) //Kazemo da Student ima jedan fakultet
                   .WithMany(x => x.Students) // A jedan fakultet vise studenata
                   .HasForeignKey(x => x.FacultyId) // Strani kljuc  je facultyId
                   .OnDelete(DeleteBehavior.Cascade);// Ako se obrise fakultet kaskadno se brisu svi njegovi studenti

            builder.HasMany(x => x.Subjects) //Student slusa vise predmeta
                   .WithMany(x => x.Students);//Na jednom predmetu je vise studenata*/


        }
    }
}
