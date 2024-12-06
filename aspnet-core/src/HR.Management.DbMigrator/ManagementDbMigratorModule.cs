using HR.Management.EntityFrameworkCore;
using Volo.Abp.Autofac;
using Volo.Abp.BackgroundJobs;
using Volo.Abp.Modularity;

namespace HR.Management.DbMigrator;

[DependsOn(
    typeof(AbpAutofacModule),
    typeof(ManagementEntityFrameworkCoreModule),
    typeof(ManagementApplicationContractsModule)
    )]
public class ManagementDbMigratorModule : AbpModule
{
    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        Configure<AbpBackgroundJobOptions>(options => options.IsJobExecutionEnabled = false);
    }
}
