using MOD.Jund.Localization;
using Volo.Abp.AspNetCore.Mvc;

namespace MOD.Jund.Controllers;

/* Inherit your controllers from this class.
 */
public abstract class JundController : AbpControllerBase
{
    protected JundController()
    {
        LocalizationResource = typeof(JundResource);
    }
}
