using System;

namespace HR.Management.Employees.Educations
{
    public class CreateUpdateEmployeeEducationDto
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
