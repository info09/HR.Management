using System;

namespace HR.Management.Projects
{
    public class CreateUpdateProjectDto
    {
        public string Name { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public decimal Budget { get; set; }
        public string Code { get; set; }
    }
}
