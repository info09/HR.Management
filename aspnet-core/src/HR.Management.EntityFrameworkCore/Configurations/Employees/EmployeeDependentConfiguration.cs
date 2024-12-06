using HR.Management.Employees;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HR.Management.Configurations.Employees
{
    public class EmployeeDependentConfiguration : IEntityTypeConfiguration<EmployeeDependent>
    {
        public void Configure(EntityTypeBuilder<EmployeeDependent> builder)
        {
            builder.ToTable(ManagementConsts.DbTablePrefix + "EmployeeDependents");
            builder.HasKey(x => x.Id);
        }
    }
}
