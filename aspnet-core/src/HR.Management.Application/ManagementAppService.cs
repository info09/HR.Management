using System;
using System.Collections.Generic;
using System.Text;
using HR.Management.Localization;
using Volo.Abp.Application.Services;

namespace HR.Management;

/* Inherit your application services from this class.
 */
public abstract class ManagementAppService : ApplicationService
{
    protected ManagementAppService()
    {
        LocalizationResource = typeof(ManagementResource);
    }
}
