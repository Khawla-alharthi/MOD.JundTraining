using MOD.Jund.Samples;
using Xunit;

namespace MOD.Jund.EntityFrameworkCore.Applications;

[Collection(JundTestConsts.CollectionDefinitionName)]
public class EfCoreSampleAppServiceTests : SampleAppServiceTests<JundEntityFrameworkCoreTestModule>
{

}
