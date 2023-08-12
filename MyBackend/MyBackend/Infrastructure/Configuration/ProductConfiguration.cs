using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MyBackend.Models;

namespace MyBackend.Infrastructure.Configuration
{
    public class ProductConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).ValueGeneratedOnAdd();

            builder.HasOne(p => p.Seller)
                .WithMany()
                .HasForeignKey(p => p.SellerId).OnDelete(DeleteBehavior.Cascade);

        }
    }
}
