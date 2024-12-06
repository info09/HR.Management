using System;
using Volo.Abp.Domain.Entities.Auditing;

namespace HR.Management.Positions
{
    public class Position : CreationAuditedAggregateRoot<Guid>
    {
        public string Name { get; set; }
        public decimal BaseSalary { get; set; }
    }
}
