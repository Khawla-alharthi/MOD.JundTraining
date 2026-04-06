using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;

namespace MOD.Jund.Data;

/* This is used if database provider does't define
 * IJundDbSchemaMigrator implementation.
 */
public class NullJundDbSchemaMigrator : IJundDbSchemaMigrator, ITransientDependency
{
    public Task MigrateAsync()
    {
        return Task.CompletedTask;
    }
}
