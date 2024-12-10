using HR.Management.Localization;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Localization;

namespace HR.Management.Permissions;

public class ManagementPermissionDefinitionProvider : PermissionDefinitionProvider
{
    public override void Define(IPermissionDefinitionContext context)
    {
        var hrGroup = context.AddGroup(ManagementPermissions.HrGroupName, L("Permission:HrGroup"));

        var departmentPermission = hrGroup.AddPermission(ManagementPermissions.Department.Default, L("Permission:Department"));
        departmentPermission.AddChild(ManagementPermissions.Department.Create, L("Permission:Department.Create"));
        departmentPermission.AddChild(ManagementPermissions.Department.Update, L("Permission:Department.Update"));
        departmentPermission.AddChild(ManagementPermissions.Department.Delete, L("Permission:Department.Delete"));

        var positionPermission = hrGroup.AddPermission(ManagementPermissions.Position.Default, L("Permission:Position"));
        positionPermission.AddChild(ManagementPermissions.Position.Create, L("Permission:Position.Create"));
        positionPermission.AddChild(ManagementPermissions.Position.Update, L("Permission:Position.Update"));
        positionPermission.AddChild(ManagementPermissions.Position.Delete, L("Permission:Position.Delete"));

        var projectPermission = hrGroup.AddPermission(ManagementPermissions.Project.Default, L("Permission:Project"));
        projectPermission.AddChild(ManagementPermissions.Project.Create, L("Permission:Project.Create"));
        projectPermission.AddChild(ManagementPermissions.Project.Update, L("Permission:Project.Update"));
        projectPermission.AddChild(ManagementPermissions.Project.Delete, L("Permission:Project.Delete"));

        var employeePermission = hrGroup.AddPermission(ManagementPermissions.Employee.Default, L("ManaPermissiongement:Employee"));
        employeePermission.AddChild(ManagementPermissions.Employee.Create, L("Permission:Employee.Create"));
        employeePermission.AddChild(ManagementPermissions.Employee.Update, L("Permission:Employee.Update"));
        employeePermission.AddChild(ManagementPermissions.Employee.Delete, L("Permission:Employee.Delete"));
    }

    private static LocalizableString L(string name)
    {
        return LocalizableString.Create<ManagementResource>(name);
    }
}
