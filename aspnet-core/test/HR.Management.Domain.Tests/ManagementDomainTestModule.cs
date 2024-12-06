using HR.Management.EntityFrameworkCore;
using Volo.Abp.Modularity;

namespace HR.Management;

[DependsOn(
    typeof(ManagementEntityFrameworkCoreTestModule)
    )]
public class ManagementDomainTestModule : AbpModule
{

}
