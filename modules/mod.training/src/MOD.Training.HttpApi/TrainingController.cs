using MOD.Training.Localization;
using Volo.Abp.AspNetCore.Mvc;

namespace MOD.Training;

public abstract class TrainingController : AbpControllerBase
{
    protected TrainingController()
    {
        LocalizationResource = typeof(TrainingResource);
    }
}
