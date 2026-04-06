using System.Threading.Tasks;

namespace MOD.Jund.Data;

public interface IJundDbSchemaMigrator
{
    Task MigrateAsync();
}
