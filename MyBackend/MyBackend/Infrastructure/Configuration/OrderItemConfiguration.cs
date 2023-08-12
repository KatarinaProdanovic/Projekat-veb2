using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MyBackend.Models;

namespace MyBackend.Infrastructure.Configuration
{
    public class OrderItemConfiguration : IEntityTypeConfiguration<OrderItem>
    {
        public void Configure(EntityTypeBuilder<OrderItem> builder)
        {
            builder.HasKey(oi => oi.OrderItemId);
            builder.Property(oi => oi.ProductId).IsRequired();
            builder.Property(oi => oi.ProductName).IsRequired();
            builder.Property(oi => oi.Quantity).IsRequired();
            // Dodajte konfiguraciju za ostala svojstva stavke porudžbine po potrebi

            // Definišite relaciju između OrderItem i Product
            builder.HasOne(oi => oi.Product)
             .WithMany()
            .HasForeignKey(oi => oi.ProductId).OnDelete(DeleteBehavior.NoAction);

            builder.HasOne(oi => oi.Order)
              .WithMany(o => o.OrderItems)
              .HasForeignKey(oi => oi.OrderId).OnDelete(DeleteBehavior.Cascade);
            //za svaki artikal u klasi OrderItem, a putem relacija i klase Product, možete doći do podataka o prodavcu za svaki proizvod.

            builder.HasOne(oi => oi.Seller)
              .WithMany()
              .HasForeignKey(oi => oi.SellerId).OnDelete(DeleteBehavior.NoAction);
        }
    }
}
