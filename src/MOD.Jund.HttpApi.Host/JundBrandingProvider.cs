using Microsoft.Extensions.Localization;
using MOD.Jund.Localization;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Ui.Branding;

namespace MOD.Jund;

[Dependency(ReplaceServices = true)]
public class JundBrandingProvider : DefaultBrandingProvider
{
    private IStringLocalizer<JundResource> _localizer;

    public JundBrandingProvider(IStringLocalizer<JundResource> localizer)
    {
        _localizer = localizer;
    }

    public override string AppName => _localizer["AppName"];
}
