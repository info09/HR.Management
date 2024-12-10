using System;
using Volo.Abp.Application.Dtos;

namespace HR.Management.Projects
{
    public class ProjectDto : EntityDto<Guid>
    {
        public string Name { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public decimal Budget { get; set; }
        public string Code { get; set; }
    }
}
