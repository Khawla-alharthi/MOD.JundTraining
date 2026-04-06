using Xunit;

namespace MOD.Jund.EntityFrameworkCore;

[CollectionDefinition(JundTestConsts.CollectionDefinitionName)]
public class JundEntityFrameworkCoreCollection : ICollectionFixture<JundEntityFrameworkCoreFixture>
{

}
