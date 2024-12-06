using System;
using Volo.Abp.Domain.Entities.Auditing;

namespace HR.Management.Employees
{
    public class Attendance : CreationAuditedEntity<Guid>
    {
        public Guid EmployeeId { get; set; }
        public DateTime Date { get; set; }
        public DateTime CheckIn { get; set; }
        public DateTime CheckOut { get; set; }
        public AttendanceStatus Status { get; set; }
    }
}
