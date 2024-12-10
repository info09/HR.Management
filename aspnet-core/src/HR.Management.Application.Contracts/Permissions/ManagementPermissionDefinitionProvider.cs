using HR.Management.Localization;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Localization;

namespace HR.Management.Permissions;

public class ManagementPermissionDefinitionProvider : PermissionDefinitionProvider
{
    public override void Define(IPermissionDefinitionContext context)
    {
        var hrGroup = context.AddGroup(ManagementPermissions.HrGroupName, L("Management:HrGroup"));

        var departmentPermission = hrGroup.AddPermission(ManagementPermissions.Department.Default, L("Management:Department"));
        departmentPermission.AddChild(ManagementPermissions.Department.Create, L("Management:Department.Create"));
        departmentPermission.AddChild(ManagementPermissions.Department.Update, L("Management:Department.Update"));
        departmentPermission.AddChild(ManagementPermissions.Department.Delete, L("Management:Department.Delete"));

        var positionPermission = hrGroup.AddPermission(ManagementPermissions.Position.Default, L("Management:Position"));
        positionPermission.AddChild(ManagementPermissions.Position.Create, L("Management:Position.Create"));
        positionPermission.AddChild(ManagementPermissions.Position.Update, L("Management:Position.Update"));
        positionPermission.AddChild(ManagementPermissions.Position.Delete, L("Management:Position.Delete"));

        var projectPermission = hrGroup.AddPermission(ManagementPermissions.Project.Default, L("Management:Project"));
        projectPermission.AddChild(ManagementPermissions.Project.Create, L("Management:Project.Create"));
        projectPermission.AddChild(ManagementPermissions.Project.Update, L("Management:Project.Update"));
        projectPermission.AddChild(ManagementPermissions.Project.Delete, L("Management:Project.Delete"));

        var employeePermission = hrGroup.AddPermission(ManagementPermissions.Employee.Default, L("Management:Employee"));
        employeePermission.AddChild(ManagementPermissions.Employee.Create, L("Management:Employee.Create"));
        employeePermission.AddChild(ManagementPermissions.Employee.Update, L("Management:Employee.Update"));
        employeePermission.AddChild(ManagementPermissions.Employee.Delete, L("Management:Employee.Delete"));
    }

    private static LocalizableString L(string name)
    {
        return LocalizableString.Create<ManagementResource>(name);
    }
}
