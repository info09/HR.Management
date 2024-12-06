using System;
using Volo.Abp.Domain.Entities;

namespace HR.Management.Employees
{
    public class EmployeeDependent : Entity<Guid>
    {
        public Guid EmployeeId { get; set; }
        public string Name { get; set; }
        public string Relationship { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string PhoneNumber { get; set; }
    }
}
