using System;
using System.Threading.Tasks;

using Volo.Abp.Domain.Repositories;
using Volo.Abp.Domain.Services;

namespace HR.Management.Employees
{
    public class EmployeeManager : DomainService
    {
        private readonly IRepository<Employee, Guid> _employeeRepository;
        public EmployeeManager(IRepository<Employee, Guid> employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }

        public async Task<Employee> CreateAsync(string code, string firstName, string lastName, DateTime dateOfBirth, GenderType genderType, string phoneNumber,
            string email, string address, Guid departmentId, Guid positionId, DateTime hireDate, decimal salary, string nationality, string maritalStatus, string educationLevel,
             string backAccountNumber, string taxCode, string socialInsurance)
        {
            return new Employee(Guid.NewGuid(), code, firstName, lastName, dateOfBirth, genderType, phoneNumber, email, address, departmentId, positionId, hireDate, salary, nationality, maritalStatus, educationLevel,
                null, backAccountNumber, taxCode, socialInsurance);
        }
    }
}
