using System;
using Volo.Abp.Domain.Entities;

namespace HR.Management.Employees
{
    public class EmployeeEducation : Entity<Guid>
    {
        public Guid EmployeeId { get; set; }
        public string Degree { get; set; }
        public string Institution { get; set; }
        public int StartYear { get; set; }
        public int EndYear { get; set; }
        public string Grade { get; set; }
    }
}
