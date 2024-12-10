using HR.Management.Permissions;
using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace HR.Management.Projects
{
    [Authorize(ManagementPermissions.Project.Default, Policy = "AdminOnly")]
    public class ProjectAppService : CrudAppService<Project, ProjectDto, Guid, PagedResultRequestDto, CreateUpdateProjectDto, CreateUpdateProjectDto>, IProjectAppService
    {
        public ProjectAppService(IRepository<Project, Guid> repository) : base(repository)
        {
            GetPolicyName = ManagementPermissions.Project.Default;
            GetListPolicyName = ManagementPermissions.Project.Default;
            CreatePolicyName = ManagementPermissions.Project.Create;
            UpdatePolicyName = ManagementPermissions.Project.Update;
            DeletePolicyName = ManagementPermissions.Project.Delete;
        }

        [Authorize(ManagementPermissions.Project.Delete)]
        public async Task DeleteMultileAsync(IEnumerable<Guid> ids)
        {
            await Repository.DeleteManyAsync(ids);
            await UnitOfWorkManager.Current.SaveChangesAsync();
        }

        [Authorize(ManagementPermissions.Project.Default)]
        public async Task<List<ProjectInListDto>> GetListAllAsync()
        {
            var query = await Repository.GetQueryableAsync();
            var data = await AsyncExecuter.ToListAsync(query);

            return ObjectMapper.Map<List<Project>, List<ProjectInListDto>>(data);
        }

        [Authorize(ManagementPermissions.Project.Default)]
        public async Task<PagedResultDto<ProjectInListDto>> GetListFilterAsync(BaseListFilter filter)
        {
            var query = await Repository.GetQueryableAsync();
            if (!string.IsNullOrEmpty(filter.Keyword))
                query = query.Where(i => i.Name.ToLower().Contains(filter.Keyword.ToLower()));

            var totalCount = await AsyncExecuter.LongCountAsync(query);
            var data = await AsyncExecuter.ToListAsync(query.Skip(filter.SkipCount).Take(filter.MaxResultCount));
            var result = data.Select(i => new ProjectInListDto()
            {
                StartDate = TimeZoneInfo.ConvertTimeFromUtc(i.StartDate, TimeZoneInfo.Local),
                EndDate = i.EndDate.HasValue ? TimeZoneInfo.ConvertTimeFromUtc(i.EndDate.Value, TimeZoneInfo.Local) : null,
                Code = i.Code,
                Name = i.Name,
                Budget = i.Budget,
                Id = i.Id
            }).ToList();

            return new PagedResultDto<ProjectInListDto>(totalCount, result);
        }
    }
}
