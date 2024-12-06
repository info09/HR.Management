using HR.Management.Positions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HR.Management.Configurations.Departments
{
    public class PositionConfiguration : IEntityTypeConfiguration<Position>
    {
        public void Configure(EntityTypeBuilder<Position> builder)
        {
            builder.ToTable(ManagementConsts.DbTablePrefix + "Positions");
            builder.HasKey(x => x.Id);
        }
    }
}
