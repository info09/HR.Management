using System;
using Volo.Abp.Domain.Entities.Auditing;

namespace HR.Management.Departments
{
    public class Department : CreationAuditedAggregateRoot<Guid>
    {
        public string Name { get; set; }
        public string Location { get; set; }
    }
}
