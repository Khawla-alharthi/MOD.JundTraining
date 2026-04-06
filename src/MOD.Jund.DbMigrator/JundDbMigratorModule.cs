using MOD.Jund.EntityFrameworkCore;
using Volo.Abp.Autofac;
using Volo.Abp.Modularity;

namespace MOD.Jund.DbMigrator;

[DependsOn(
    typeof(AbpAutofacModule),
    typeof(JundEntityFrameworkCoreModule),
    typeof(JundApplicationContractsModule)
)]
public class JundDbMigratorModule : AbpModule
{
}
