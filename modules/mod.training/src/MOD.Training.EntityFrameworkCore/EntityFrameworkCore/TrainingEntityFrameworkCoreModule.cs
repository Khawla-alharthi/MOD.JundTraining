using MOD.Training.Fruits;
using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.EntityFrameworkCore;
using Volo.Abp.Modularity;

namespace MOD.Training.EntityFrameworkCore;

[DependsOn(typeof(TrainingDomainModule), typeof(AbpEntityFrameworkCoreModule))]
public class TrainingEntityFrameworkCoreModule : AbpModule
{
    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        context.Services.AddAbpDbContext<TrainingDbContext>(options => {
            options.AddDefaultRepositories<ITrainingDbContext>(includeAllEntities: true);
            /* Add custom repositories here. Example:
            * options.AddRepository<Question, EfCoreQuestionRepository>();
            */
            options.AddRepository<Fruit, Fruits.EfCoreFruitRepository>();
        });
    }
}