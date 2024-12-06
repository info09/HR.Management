using System.Threading.Tasks;

namespace HR.Management.Data;

public interface IManagementDbSchemaMigrator
{
    Task MigrateAsync();
}
