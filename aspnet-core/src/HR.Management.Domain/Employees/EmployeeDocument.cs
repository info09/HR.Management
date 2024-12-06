using System;
using Volo.Abp.Domain.Entities;

namespace HR.Management.Employees
{
    public class EmployeeDocument : Entity<Guid>
    {
        public Guid EmployeeId { get; set; }
        public DocumentType Type { get; set; }
        public string DocumentContent { get; set; }
        public DateTime UploadDate { get; set; }
    }
}
