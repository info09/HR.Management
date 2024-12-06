using AutoMapper;
using HR.Management.Departments;
using HR.Management.Projects;

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

        CreateMap<Project, ProjectDto>();
        CreateMap<Project, ProjectInListDto>();
        CreateMap<CreateUpdateProjectDto, Project>();
    }
}
