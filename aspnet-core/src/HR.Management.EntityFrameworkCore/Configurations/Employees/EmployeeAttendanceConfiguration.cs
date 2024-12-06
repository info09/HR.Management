using HR.Management.Employees;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HR.Management.Configurations.Employees
{
    public class EmployeeAttendanceConfiguration : IEntityTypeConfiguration<EmployeeAttendance>
    {
        public void Configure(EntityTypeBuilder<EmployeeAttendance> builder)
        {
            builder.ToTable(ManagementConsts.DbTablePrefix + "EmployeeAttendances");
            builder.HasKey(x => x.Id);
        }
    }
}
