using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace HR.Management.Employees
{
    public class EmployeeAppService : CrudAppService<Employee, EmployeeDto, Guid, PagedResultRequestDto, CreateUpdateEmployeeDto, CreateUpdateEmployeeDto>, IEmployeeAppService
    {
        public EmployeeAppService(IRepository<Employee, Guid> repository) : base(repository)
        {
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
    }
}
