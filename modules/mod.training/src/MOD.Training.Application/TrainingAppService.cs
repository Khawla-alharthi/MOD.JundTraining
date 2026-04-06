using MOD.Training.Localization;
using Volo.Abp.Application.Services;

namespace MOD.Training;

public abstract class TrainingAppService : ApplicationService
{
    protected TrainingAppService()
    {
        LocalizationResource = typeof(TrainingResource);
        ObjectMapperContext = typeof(TrainingApplicationModule);
    }
}
