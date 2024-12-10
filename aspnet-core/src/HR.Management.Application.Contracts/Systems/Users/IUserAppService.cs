using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace HR.Management.Systems.Users
{
    public interface IUserAppService : ICrudAppService<UserDto, Guid, PagedResultRequestDto, CreateUserDto, UpdateUserDto>
    {
        Task DeleteMultipleAsync(IEnumerable<Guid> ids);
        Task<PagedResultDto<UserInListDto>> GetListWithFilterAsync(BaseListFilter input);
        Task<List<UserInListDto>> GetListAllAsync(string filterKeyword);
        Task AssignRolesAsync(Guid userId, string[] roleNames);
        Task SetPasswordAsync(Guid userId, SetPasswordDto input);
        //Task LockAndUnlockAsync(Guid userId);
    }
}
