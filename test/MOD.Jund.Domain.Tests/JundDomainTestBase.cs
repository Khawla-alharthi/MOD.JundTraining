using Volo.Abp.Modularity;

namespace MOD.Jund;

/* Inherit from this class for your domain layer tests. */
public abstract class JundDomainTestBase<TStartupModule> : JundTestBase<TStartupModule>
    where TStartupModule : IAbpModule
{

}
