using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace HR.Management.Projects
{
    public class ProjectAppService : CrudAppService<Project, ProjectDto, Guid, PagedResultRequestDto, CreateUpdateProjectDto, CreateUpdateProjectDto>, IProjectAppService
    {
        public ProjectAppService(IRepository<Project, Guid> repository) : base(repository)
        {
        }

        public async Task DeleteMultileAsync(IEnumerable<Guid> ids)
        {
            await Repository.DeleteManyAsync(ids);
            await UnitOfWorkManager.Current.SaveChangesAsync();
        }

        public async Task<List<ProjectInListDto>> GetListAllAsync()
        {
            var query = await Repository.GetQueryableAsync();
            var data = await AsyncExecuter.ToListAsync(query);

            return ObjectMapper.Map<List<Project>, List<ProjectInListDto>>(data);
        }

        public async Task<PagedResultDto<ProjectInListDto>> GetListFilterAsync(BaseListFilter filter)
        {
            var query = await Repository.GetQueryableAsync();
            if (!string.IsNullOrEmpty(filter.Keyword))
                query = query.Where(i => i.Name.ToLower().Contains(filter.Keyword.ToLower()));

            var totalCount = await AsyncExecuter.LongCountAsync(query);
            var data = await AsyncExecuter.ToListAsync(query.Skip(filter.SkipCount).Take(filter.MaxResultCount));

            return new PagedResultDto<ProjectInListDto>(totalCount, ObjectMapper.Map<List<Project>, List<ProjectInListDto>>(data));
        }
    }
}
