using HR.Management.Departments;
using HR.Management.Positions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Volo.Abp;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.BlobStoring;
using Volo.Abp.Domain.Repositories;

namespace HR.Management.Employees
{
    public class EmployeeAppService : CrudAppService<Employee, EmployeeDto, Guid, PagedResultRequestDto, CreateUpdateEmployeeDto, CreateUpdateEmployeeDto>, IEmployeeAppService
    {
        private readonly IBlobContainer<EmployeeThumbnailPictureContainer> _pictureContainer;
        private readonly EmployeeManager _employeeManager;
        private readonly IRepository<Department, Guid> _departmentRepository;
        private readonly IRepository<Position, Guid> _positionRepository;
        public EmployeeAppService(IRepository<Employee, Guid> repository, IBlobContainer<EmployeeThumbnailPictureContainer> pictureContainer, EmployeeManager employeeManager, IRepository<Department, Guid> departmentRepository, IRepository<Position, Guid> positionRepository) : base(repository)
        {
            _pictureContainer = pictureContainer;
            _employeeManager = employeeManager;
            _departmentRepository = departmentRepository;
            _positionRepository = positionRepository;
        }

        public async Task DeleteMultipleAsync(IEnumerable<Guid> ids)
        {
            await Repository.DeleteManyAsync(ids);
            await UnitOfWorkManager.Current.SaveChangesAsync();
        }

        public async Task<List<EmployeeInListDto>> GetListAllAsync()
        {
            var query = await Repository.GetQueryableAsync();
            var data = await AsyncExecuter.ToListAsync(query);
            return ObjectMapper.Map<List<Employee>, List<EmployeeInListDto>>(data);
        }

        public async Task<PagedResultDto<EmployeeInListDto>> GetListFilterAsync(EmployeeListFilter filter)
        {
            var query = await Repository.GetQueryableAsync();
            if (!string.IsNullOrEmpty(filter.Keyword))
                query = query.Where(i => i.FirstName.ToLower().Contains(filter.Keyword.ToLower()) || i.LastName.ToLower().Contains(filter.Keyword.ToLower()));

            if (filter.DepartmentId.HasValue)
                query = query.Where(i => i.DepartmentId == filter.DepartmentId.Value);

            if (filter.PositionId.HasValue)
                query = query.Where(i => i.PositionId == filter.PositionId.Value);

            var totalCount = await AsyncExecuter.LongCountAsync(query);
            var data = await AsyncExecuter.ToListAsync(query.Skip(filter.SkipCount).Take(filter.MaxResultCount));

            return new PagedResultDto<EmployeeInListDto>(totalCount, ObjectMapper.Map<List<Employee>, List<EmployeeInListDto>>(data));
        }

        public override async Task<EmployeeDto> CreateAsync(CreateUpdateEmployeeDto input)
        {
            var employee = await _employeeManager.CreateAsync(input.Code, input.FirstName, input.LastName, input.CivilId, input.DateOfBirth, input.GenderType, input.PhoneNumber, input.Email, input.Address, input.DepartmentId,
                input.PositionId, input.HireDate, input.Salary, input.Nationality, input.MaritalStatus, input.EducationLevel, input.BankAccountNumber, input.TaxCode, input.SocialInsurance);

            if (input.ThumbnailPictureContent != null && input.ThumbnailPictureContent.Length > 0)
            {
                await SaveThumbnailImageAsync(input.ThumbnailPictureName, input.ThumbnailPictureContent);
                employee.ThumbnailPicture = input.ThumbnailPictureName;
            }

            employee.Status = true;
            var result = await Repository.InsertAsync(employee);

            return ObjectMapper.Map<Employee, EmployeeDto>(result);
        }

        public override async Task<EmployeeDto> UpdateAsync(Guid id, CreateUpdateEmployeeDto input)
        {
            var employee = await Repository.GetAsync(id) ?? throw new BusinessException(ManagementDomainErrorCodes.EmployeeIsNotExists);
            employee.FirstName = input.FirstName;
            employee.LastName = input.LastName;
            employee.Code = input.Code;
            employee.CivilId = input.CivilId;
            employee.Email = input.Email;
            employee.Address = input.Address;
            employee.DateOfBirth = input.DateOfBirth;
            employee.GenderType = input.GenderType;
            employee.PhoneNumber = input.PhoneNumber;
            employee.HireDate = input.HireDate;
            employee.Salary = input.Salary;
            employee.Nationality = input.Nationality;
            employee.MaritalStatus = input.MaritalStatus;
            employee.EducationLevel = input.EducationLevel;
            employee.BankAccountNumber = input.BankAccountNumber;
            employee.TaxCode = input.TaxCode;
            employee.SocialInsurance = input.SocialInsurance;

            if (employee.DepartmentId != input.DepartmentId)
            {
                employee.DepartmentId = input.DepartmentId;
                var department = await _departmentRepository.GetAsync(x => x.Id == input.DepartmentId);
                employee.DepartmentName = department.Name;
            }

            if (employee.PositionId != input.PositionId)
            {
                employee.PositionId = input.PositionId;
                var position = await _positionRepository.GetAsync(x => x.Id == input.PositionId);
                employee.PositionName = position.Name;
            }

            if (input.ThumbnailPictureContent != null && input.ThumbnailPictureContent.Length > 0)
            {
                await SaveThumbnailImageAsync(input.ThumbnailPictureName, input.ThumbnailPictureContent);
                employee.ThumbnailPicture = input.ThumbnailPictureName;
            }

            await Repository.UpdateAsync(employee);
            return ObjectMapper.Map<Employee, EmployeeDto>(employee);
        }

        private async Task SaveThumbnailImageAsync(string fileName, string base64)
        {
            Regex regex = new Regex(@"^[\w/\:.-]+;base64,");
            base64 = regex.Replace(base64, string.Empty);
            byte[] bytes = Convert.FromBase64String(base64);
            await _pictureContainer.SaveAsync(fileName, bytes, overrideExisting: true);
        }

        public async Task<string> GetThumbnailImageAsync(string fileName)
        {
            if (string.IsNullOrEmpty(fileName)) return null;

            var thumbnaiContent = await _pictureContainer.GetAllBytesAsync(fileName);

            if (thumbnaiContent == null) return null;

            var result = Convert.ToBase64String(thumbnaiContent);
            return result;
        }
    }
}
