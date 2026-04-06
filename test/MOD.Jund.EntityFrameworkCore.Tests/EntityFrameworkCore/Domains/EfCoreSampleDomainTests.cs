using MOD.Jund.Samples;
using Xunit;

namespace MOD.Jund.EntityFrameworkCore.Domains;

[Collection(JundTestConsts.CollectionDefinitionName)]
public class EfCoreSampleDomainTests : SampleDomainTests<JundEntityFrameworkCoreTestModule>
{

}
