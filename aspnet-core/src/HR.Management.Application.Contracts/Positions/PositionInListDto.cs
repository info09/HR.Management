using System;
using Volo.Abp.Application.Dtos;

namespace HR.Management.Departments
{
    public class PositionInListDto : EntityDto<Guid>
    {
        public string Name { get; set; }
        public string Code { get; set; }
        public decimal BaseSalary { get; set; }
    }
}
