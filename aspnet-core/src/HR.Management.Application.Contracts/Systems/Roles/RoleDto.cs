using System;
using Volo.Abp.Application.Dtos;

namespace HR.Management.Systems.Roles
{
    public class RoleDto : EntityDto<Guid>
    {
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
