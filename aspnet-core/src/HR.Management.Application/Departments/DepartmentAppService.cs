

using HR.Management.Permissions;
using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace HR.Management.Departments
{
    [Authorize(ManagementPermissions.Department.Default, Policy = "AdminOnly")]
    public class DepartmentAppService : CrudAppService<Department, DepartmentDto, Guid, PagedResultRequestDto, CreateUpdateDepartmentDto, CreateUpdateDepartmentDto>, IDepartmentAppService
    {
        public DepartmentAppService(IRepository<Department, Guid> repository) : base(repository)
        {
            GetPolicyName = ManagementPermissions.Department.Default;
            GetListPolicyName = ManagementPermissions.Department.Default;
            CreatePolicyName = ManagementPermissions.Department.Create;
            UpdatePolicyName = ManagementPermissions.Department.Update;
            DeletePolicyName = ManagementPermissions.Department.Delete;
        }

        [Authorize(ManagementPermissions.Department.Delete)]
        public async Task DeleteMultileAsync(IEnumerable<Guid> ids)
        {
            await Repository.DeleteManyAsync(ids);
            await UnitOfWorkManager.Current.SaveChangesAsync();
        }

        [Authorize(ManagementPermissions.Department.Default)]
        public async Task<List<DepartmentInListDto>> GetListAllAsync()
        {
            var query = await Repository.GetQueryableAsync();
            var data = await AsyncExecuter.ToListAsync(query);

            return ObjectMapper.Map<List<Department>, List<DepartmentInListDto>>(data);
        }

        [Authorize(ManagementPermissions.Department.Default)]
        public async Task<PagedResultDto<DepartmentInListDto>> GetListFilterAsync(BaseListFilter filter)
        {
            var query = await Repository.GetQueryableAsync();
            if (!string.IsNullOrEmpty(filter.Keyword))
                query = query.Where(i => i.Name.ToLower().Contains(filter.Keyword.ToLower()));

            var totalCount = await AsyncExecuter.LongCountAsync(query);
            var data = await AsyncExecuter.ToListAsync(query.Skip(filter.SkipCount).Take(filter.MaxResultCount));

            return new PagedResultDto<DepartmentInListDto>(totalCount, ObjectMapper.Map<List<Department>, List<DepartmentInListDto>>(data));
        }
    }
}
