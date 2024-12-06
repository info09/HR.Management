using HR.Management.Employees;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HR.Management.Configurations.Employees
{
    public class EmployeeDocumentConfiguration : IEntityTypeConfiguration<EmployeeDocument>
    {
        public void Configure(EntityTypeBuilder<EmployeeDocument> builder)
        {
            builder.ToTable(ManagementConsts.DbTablePrefix + "EmployeeDocuments");
            builder.HasKey(x => x.Id);
        }
    }
}
