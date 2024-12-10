using HR.Management.Departments;
using HR.Management.Permissions;
using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace HR.Management.Positions
{
    [Authorize(ManagementPermissions.Position.Default, Policy = "AdminOnly")]
    public class PositionAppService : CrudAppService<Position, PositionDto, Guid, PagedResultRequestDto, CreateUpdatePositionDto, CreateUpdatePositionDto>, IPositionAppService
    {
        public PositionAppService(IRepository<Position, Guid> repository) : base(repository)
        {
            GetPolicyName = ManagementPermissions.Position.Default;
            GetListPolicyName = ManagementPermissions.Position.Default;
            CreatePolicyName = ManagementPermissions.Position.Create;
            UpdatePolicyName = ManagementPermissions.Position.Update;
            DeletePolicyName = ManagementPermissions.Position.Delete;
        }

        [Authorize(ManagementPermissions.Position.Delete)]
        public async Task DeleteMultileAsync(IEnumerable<Guid> ids)
        {
            await Repository.DeleteManyAsync(ids);
            await UnitOfWorkManager.Current.SaveChangesAsync();
        }

        [Authorize(ManagementPermissions.Position.Default)]
        public async Task<List<PositionInListDto>> GetListAllAsync()
        {
            var query = await Repository.GetQueryableAsync();
            var data = await AsyncExecuter.ToListAsync(query);

            return ObjectMapper.Map<List<Position>, List<PositionInListDto>>(data);
        }

        [Authorize(ManagementPermissions.Position.Default)]
        public async Task<PagedResultDto<PositionInListDto>> GetListFilterAsync(BaseListFilter filter)
        {
            var query = await Repository.GetQueryableAsync();
            if (!string.IsNullOrEmpty(filter.Keyword))
                query = query.Where(i => i.Name.ToLower().Contains(filter.Keyword.ToLower()));

            var totalCount = await AsyncExecuter.LongCountAsync(query);
            var data = await AsyncExecuter.ToListAsync(query.Skip(filter.SkipCount).Take(filter.MaxResultCount));

            return new PagedResultDto<PositionInListDto>(totalCount, ObjectMapper.Map<List<Position>, List<PositionInListDto>>(data));
        }
    }
}
