namespace HR.Management.Permissions;

public static class ManagementPermissions
{
    public const string HrGroupName = "HrManagementAdmin";

    public static class Department
    {
        public const string Default = HrGroupName + ".Department";
        public const string Create = Default + ".Create";
        public const string Update = Default + ".Update";
        public const string Delete = Default + ".Delete";
    }

    public static class Position
    {
        public const string Default = HrGroupName + ".Position";
        public const string Create = Default + ".Create";
        public const string Update = Default + ".Update";
        public const string Delete = Default + ".Delete";
    }

    public static class Project
    {
        public const string Default = HrGroupName + ".Project";
        public const string Create = Default + ".Create";
        public const string Update = Default + ".Update";
        public const string Delete = Default + ".Delete";
    }

    public static class Employee
    {
        public const string Default = HrGroupName + ".Employee";
        public const string Create = Default + ".Create";
        public const string Update = Default + ".Update";
        public const string Delete = Default + ".Delete";
    }
}
