using Shouldly;
using System;
using System.Linq;
using System.Threading.Tasks;
using MOD.Jund.Vegs;
using MOD.Jund.EntityFrameworkCore;
using Xunit;

namespace MOD.Jund.EntityFrameworkCore.Domains.Vegs;

public class VegRepositoryTests : JundEntityFrameworkCoreTestBase
{
    private readonly IVegRepository _vegRepository;

    public VegRepositoryTests()
    {
        _vegRepository = GetRequiredService<IVegRepository>();
    }

    [Fact]
    public async Task GetListAsync()
    {
        // Arrange
        await WithUnitOfWorkAsync(async () => {
            // Act
            var result = await _vegRepository.GetListAsync(nameAr: "8b76f634463c418f90b3a7be5c5ea00c32767856ef65492");
            // Assert
            result.Count.ShouldBe(1);
            result.FirstOrDefault().ShouldNotBe(null);
            result.First().Id.ShouldBe(Guid.Parse("4d4cc034-466e-4b2d-b566-140ba951deb0"));
        });
    }

    [Fact]
    public async Task GetCountAsync()
    {
        // Arrange
        await WithUnitOfWorkAsync(async () => {
            // Act
            var result = await _vegRepository.GetCountAsync(nameAr: "ac900f6f3a204ae4afc3755892b11f9de4a08c6");
            // Assert
            result.ShouldBe(1);
        });
    }
}