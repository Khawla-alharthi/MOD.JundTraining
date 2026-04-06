using Volo.Abp.Settings;

namespace MOD.Jund.Settings;

public class JundSettingDefinitionProvider : SettingDefinitionProvider
{
    public override void Define(ISettingDefinitionContext context)
    {
        //Define your own settings here. Example:
        //context.Add(new SettingDefinition(JundSettings.MySetting1));
    }
}
