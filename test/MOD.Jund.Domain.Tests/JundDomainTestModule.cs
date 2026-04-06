using Volo.Abp.Modularity;

namespace MOD.Jund;

[DependsOn(
    typeof(JundDomainModule),
    typeof(JundTestBaseModule)
)]
public class JundDomainTestModule : AbpModule
{

}
