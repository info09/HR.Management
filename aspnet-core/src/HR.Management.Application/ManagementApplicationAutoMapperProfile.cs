using AutoMapper;
using HR.Management.Departments;
using HR.Management.Employees;
using HR.Management.Positions;
using HR.Management.Projects;
using HR.Management.Roles;
using HR.Management.Systems.Roles;
using HR.Management.Systems.Users;
using Volo.Abp.Identity;

namespace HR.Management;

public class ManagementApplicationAutoMapperProfile : Profile
{
    public ManagementApplicationAutoMapperProfile()
    {
        /* You can configure your AutoMapper mapping configuration here.
         * Alternatively, you can split your mapping configurations
         * into multiple profile classes for a better organization. */

        CreateMap<Department, DepartmentDto>();
        CreateMap<Department, DepartmentInListDto>();
        CreateMap<CreateUpdateDepartmentDto, Department>();

        CreateMap<Position, PositionDto>();
        CreateMap<Position, PositionInListDto>();
        CreateMap<CreateUpdatePositionDto, Position>();

        CreateMap<Project, ProjectDto>();
        CreateMap<Project, ProjectInListDto>();
        CreateMap<CreateUpdateProjectDto, Project>();

        CreateMap<Employee, EmployeeDto>();
        CreateMap<Employee, EmployeeInListDto>();
        CreateMap<CreateUpdateEmployeeDto, Employee>();

        //Role
        CreateMap<IdentityRole, RoleDto>().ForMember(x => x.Description,
            map => map.MapFrom(x => x.ExtraProperties.ContainsKey(RoleConsts.DescriptionFieldName)
            ?
            x.ExtraProperties[RoleConsts.DescriptionFieldName]
            :
            null));
        CreateMap<IdentityRole, RoleInListDto>().ForMember(x => x.Description,
            map => map.MapFrom(x => x.ExtraProperties.ContainsKey(RoleConsts.DescriptionFieldName)
            ?
            x.ExtraProperties[RoleConsts.DescriptionFieldName]
            :
            null));
        CreateMap<CreateUpdateRoleDto, IdentityRole>();

        //User
        CreateMap<IdentityUser, UserDto>();
        CreateMap<IdentityUser, UserInListDto>();
    }
}
