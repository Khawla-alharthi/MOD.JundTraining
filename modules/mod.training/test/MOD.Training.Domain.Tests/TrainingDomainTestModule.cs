using Volo.Abp.Modularity;

namespace MOD.Training;

[DependsOn(
    typeof(TrainingDomainModule),
    typeof(TrainingTestBaseModule)
)]
public class TrainingDomainTestModule : AbpModule
{

}
