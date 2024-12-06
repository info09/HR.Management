using System;
using Volo.Abp.Domain.Entities;

namespace HR.Management.Projects
{
    public class EmployeeProject : Entity
    {
        public Guid EmployeeId { get; set; }
        public Guid ProjectId { get; set; }

        public string Role { get; set; }

        public override object[] GetKeys()
        {
            return [EmployeeId, ProjectId];
        }
    }
}
