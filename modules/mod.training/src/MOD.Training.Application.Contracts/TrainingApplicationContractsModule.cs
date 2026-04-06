using Volo.Abp.Application;
using Volo.Abp.Modularity;
using Volo.Abp.Authorization;

namespace MOD.Training;

[DependsOn(
    typeof(TrainingDomainSharedModule),
    typeof(AbpDddApplicationContractsModule),
    typeof(AbpAuthorizationModule)
    )]
public class TrainingApplicationContractsModule : AbpModule
{

}
