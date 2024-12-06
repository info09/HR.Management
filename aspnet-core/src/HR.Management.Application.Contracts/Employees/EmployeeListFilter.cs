using System;

namespace HR.Management.Employees
{
    public class EmployeeListFilter : BaseListFilter
    {
        public Guid? DepartmentId { get; set; }
        public Guid? PositionId { get; set; }
    }
}
