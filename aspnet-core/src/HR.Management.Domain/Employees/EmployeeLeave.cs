using System;
using Volo.Abp.Domain.Entities.Auditing;

namespace HR.Management.Employees
{
    public class EmployeeLeave : CreationAuditedEntity<Guid>
    {
        public Guid EmployeeId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Reason { get; set; }
        public ApprovalStatus ApprovalStatus { get; set; }
    }
}
