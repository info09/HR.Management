using HR.Management.Employees;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HR.Management.Configurations.Employees
{
    internal class EmployeeProjectConfiguration : IEntityTypeConfiguration<EmployeeProject>
    {
        public void Configure(EntityTypeBuilder<EmployeeProject> builder)
        {
            builder.ToTable(ManagementConsts.DbTablePrefix + "EmployeeProjects");
            builder.HasKey(x => new { x.EmployeeId, x.ProjectId });
        }
    }
}
