using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace HR.Management.Departments
{
    public interface IPositionAppService : ICrudAppService<PositionDto, Guid, PagedResultRequestDto, CreateUpdatePositionDto, CreateUpdatePositionDto>
    {
        Task<PagedResultDto<PositionInListDto>> GetListFilterAsync(BaseListFilter filter);
        Task<List<PositionInListDto>> GetListAllAsync();
        Task DeleteMultileAsync(IEnumerable<Guid> ids);
    }
}
