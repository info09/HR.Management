using HR.Management.Departments;
using HR.Management.Positions;
using System;
using System.Threading.Tasks;
using Volo.Abp;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Domain.Services;

namespace HR.Management.Employees
{
    public class EmployeeManager : DomainService
    {
        private readonly IRepository<Employee, Guid> _employeeRepository;
        private readonly IRepository<Position, Guid> _positionRepository;
        private readonly IRepository<Department, Guid> _departmentRepository;
        public EmployeeManager(IRepository<Employee, Guid> employeeRepository, IRepository<Position, Guid> positionRepository, IRepository<Department, Guid> departmentRepository)
        {
            _employeeRepository = employeeRepository;
            _positionRepository = positionRepository;
            _departmentRepository = departmentRepository;
        }

        public async Task<Employee> CreateAsync(string code, string firstName, string lastName, string civilId, DateTime dateOfBirth, GenderType genderType, string phoneNumber,
            string email, string address, Guid departmentId, Guid positionId, DateTime hireDate, decimal salary, string nationality, string maritalStatus, string educationLevel,
             string backAccountNumber, string taxCode, string socialInsurance)
        {
            if (await _employeeRepository.AnyAsync(i => i.Code == code))
                throw new UserFriendlyException("Mã nhân viên đã tồn tại", ManagementDomainErrorCodes.EmployeeCodeAlreadyExists);

            var position = await _positionRepository.GetAsync(positionId);
            var department = await _departmentRepository.GetAsync(departmentId);

            return new Employee(Guid.NewGuid(), code, firstName, lastName, civilId, dateOfBirth, genderType, phoneNumber, email, address, departmentId, department.Name, positionId, position.Name, hireDate, salary, nationality, maritalStatus, educationLevel,
                null, backAccountNumber, taxCode, socialInsurance);
        }
    }
}
