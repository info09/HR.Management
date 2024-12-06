using Volo.Abp.Modularity;

namespace HR.Management;

[DependsOn(
    typeof(ManagementApplicationModule),
    typeof(ManagementDomainTestModule)
    )]
public class ManagementApplicationTestModule : AbpModule
{

}
