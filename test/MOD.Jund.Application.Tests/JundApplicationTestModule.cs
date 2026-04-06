using Volo.Abp.Modularity;

namespace MOD.Jund;

[DependsOn(
    typeof(JundApplicationModule),
    typeof(JundDomainTestModule)
)]
public class JundApplicationTestModule : AbpModule
{

}
