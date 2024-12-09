using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

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
        public EmployeeAppService(IRepository<Employee, Guid> repository, IBlobContainer<EmployeeThumbnailPictureContainer> pictureContainer, EmployeeManager employeeManager) : base(repository)
        {
            this._pictureContainer = pictureContainer;
            _employeeManager = employeeManager;
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
            var employee = await _employeeManager.CreateAsync(input.TaxCode, input.FirstName, input.LastName, input.DateOfBirth, input.GenderType, input.PhoneNumber, input.Email, input.Address, input.DepartmentId,
                input.PositionId, input.HireDate, input.Salary, input.Nationality, input.MaritalStatus, input.EducationLevel, input.BankAccountNumber, input.TaxCode, input.SocialInsurance);

            if (input.ThumbnailPictureContent != null && input.ThumbnailPictureContent.Length > 0)
            {
                await SaveThumbnailImageAsync(input.ThumbnailPictureName, input.ThumbnailPictureContent);
                employee.ThumbnailPicture = input.ThumbnailPictureName;
            }

            var result = await Repository.InsertAsync(employee);

            return ObjectMapper.Map<Employee, EmployeeDto>(result);
        }

        private async Task SaveThumbnailImageAsync(string fileName, string base64)
        {
            Regex regex = new Regex(@"^[\w/\:.-]+;base64,");
            base64 = regex.Replace(base64, string.Empty);
            byte[] bytes = Convert.FromBase64String(base64);
            await _pictureContainer.SaveAsync(fileName, bytes, overrideExisting: true);
        }
    }
}
