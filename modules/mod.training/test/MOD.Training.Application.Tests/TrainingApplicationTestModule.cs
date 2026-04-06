using Volo.Abp.Modularity;

namespace MOD.Training;

[DependsOn(
    typeof(TrainingApplicationModule),
    typeof(TrainingDomainTestModule)
    )]
public class TrainingApplicationTestModule : AbpModule
{

}
