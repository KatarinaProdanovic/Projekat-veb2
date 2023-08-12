using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using MyBackend.Models;

namespace MyBackend.Infrastructure.Configuration
{
    public class OrderConfiguration : IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).ValueGeneratedOnAdd();

          
            builder.Property(o => o.OrderDate).IsRequired();
            // Dodajte konfiguraciju za ostala svojstva porudžbine po potrebi

            // Definišite relaciju između Order i OrderItem
            builder.HasMany(o => o.OrderItems)
                   .WithOne(oi => oi.Order)
                   .HasForeignKey(oi => oi.OrderId).OnDelete(DeleteBehavior.Cascade);


        }
    }

}
