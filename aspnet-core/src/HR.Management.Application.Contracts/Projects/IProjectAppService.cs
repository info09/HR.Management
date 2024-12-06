using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace HR.Management.Projects
{
    public interface IProjectAppService : ICrudAppService<ProjectDto, Guid, PagedResultRequestDto, CreateUpdateProjectDto, CreateUpdateProjectDto>
    {
        Task<PagedResultDto<ProjectInListDto>> GetListFilterAsync(BaseListFilter filter);
        Task<List<ProjectInListDto>> GetListAllAsync();
        Task DeleteMultileAsync(IEnumerable<Guid> ids);
    }
}
