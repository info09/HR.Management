using System;
using Volo.Abp.Application.Dtos;

namespace HR.Management.Employees.Educations
{
    public class EmployeeEducationDto : EntityDto<Guid>
    {
        public Guid EmployeeId { get; set; }
        public EducationLevel Level { get; set; }
        public string Major { get; set; }
        public string SchoolName { get; set; }
        public int StartYear { get; set; }
        public int EndYear { get; set; }
        public GraduationType GraduationType { get; set; }
    }
}
