using Volo.Abp.Ui.Branding;
using Volo.Abp.DependencyInjection;

namespace HR.Management;

[Dependency(ReplaceServices = true)]
public class ManagementBrandingProvider : DefaultBrandingProvider
{
    public override string AppName => "Management";
}
