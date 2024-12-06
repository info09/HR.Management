using System;
using Volo.Abp.Domain.Entities;

namespace HR.Management.Employees
{
    public class EmployeeProject : Entity
    {
        public Guid EmployeeId { get; set; }
        public Guid ProjectId { get; set; }

        public string Role { get; set; }

        public override object[] GetKeys()
        {
            return new object[] { EmployeeId, ProjectId };
        }
    }
}
