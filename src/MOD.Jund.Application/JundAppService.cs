using MOD.Jund.Localization;
using Volo.Abp.Application.Services;

namespace MOD.Jund;

/* Inherit your application services from this class.
 */
public abstract class JundAppService : ApplicationService
{
    protected JundAppService()
    {
        LocalizationResource = typeof(JundResource);
    }
}
