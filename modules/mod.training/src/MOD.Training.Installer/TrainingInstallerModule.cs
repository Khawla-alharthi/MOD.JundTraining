using Volo.Abp.Modularity;
using Volo.Abp.VirtualFileSystem;

namespace MOD.Training;

[DependsOn(
    typeof(AbpVirtualFileSystemModule)
    )]
public class TrainingInstallerModule : AbpModule
{
    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        Configure<AbpVirtualFileSystemOptions>(options =>
        {
            options.FileSets.AddEmbedded<TrainingInstallerModule>();
        });
    }
}
