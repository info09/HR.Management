using System;
using Volo.Abp.Domain.Entities.Auditing;

namespace HR.Management.Projects
{
    public class Project : CreationAuditedAggregateRoot<Guid>
    {
        public string Name { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public decimal Budget { get; set; }
    }
}
