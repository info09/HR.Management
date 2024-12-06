using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace HR.Management.Departments
{
    public interface IDepartmentAppService : ICrudAppService<DepartmentDto, Guid, PagedResultRequestDto, CreateUpdateDepartmentDto, CreateUpdateDepartmentDto>
    {
        Task<PagedResultDto<DepartmentInListDto>> GetListFilterAsync(BaseListFilter filter);
        Task<List<DepartmentInListDto>> GetListAllAsync();
        Task DeleteMultileAsync(IEnumerable<Guid> ids);
    }
}
