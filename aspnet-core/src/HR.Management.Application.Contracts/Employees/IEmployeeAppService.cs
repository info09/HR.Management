using HR.Management.Employees.Educations;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace HR.Management.Employees
{
    public interface IEmployeeAppService : ICrudAppService<EmployeeDto, Guid, PagedResultRequestDto, CreateUpdateEmployeeDto, CreateUpdateEmployeeDto>
    {
        Task<PagedResultDto<EmployeeInListDto>> GetListFilterAsync(EmployeeListFilter filter);
        Task<List<EmployeeInListDto>> GetListAllAsync();
        Task DeleteMultipleAsync(IEnumerable<Guid> ids);

        Task<string> GetThumbnailImageAsync(string fileName);
        Task<EmployeeDto> UpdateImage(Guid id, UpdateImageEmployeeDto input);

        Task<EmployeeEducationDto> AddEducation(Guid employeeId, CreateUpdateEmployeeEducationDto input);
        Task<EmployeeEducationDto> GetEducation(Guid employeeId);
    }
}
