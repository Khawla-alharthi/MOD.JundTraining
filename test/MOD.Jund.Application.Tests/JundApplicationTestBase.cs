using Volo.Abp.Modularity;

namespace MOD.Jund;

public abstract class JundApplicationTestBase<TStartupModule> : JundTestBase<TStartupModule>
    where TStartupModule : IAbpModule
{

}
