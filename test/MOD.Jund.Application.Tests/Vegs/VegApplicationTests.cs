using System;
using System.Linq;
using Shouldly;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Modularity;
using Xunit;

namespace MOD.Jund.Vegs;

public abstract class VegsAppServiceTests<TStartupModule> : JundApplicationTestBase<TStartupModule> where TStartupModule : IAbpModule
{
    private readonly IVegsAppService _vegsAppService;
    private readonly IRepository<Veg, Guid> _vegRepository;

    public VegsAppServiceTests()
    {
        _vegsAppService = GetRequiredService<IVegsAppService>();
        _vegRepository = GetRequiredService<IRepository<Veg, Guid>>();
    }

    [Fact]
    public async Task GetListAsync()
    {
        // Act
        var result = await _vegsAppService.GetListAsync(new GetVegsInput());
        // Assert
        result.TotalCount.ShouldBe(2);
        result.Items.Count.ShouldBe(2);
        result.Items.Any(x => x.Id == Guid.Parse("4d4cc034-466e-4b2d-b566-140ba951deb0")).ShouldBe(true);
        result.Items.Any(x => x.Id == Guid.Parse("d5d411f9-3177-4bbe-8219-f9493ff2ab02")).ShouldBe(true);
    }

    [Fact]
    public async Task GetAsync()
    {
        // Act
        var result = await _vegsAppService.GetAsync(Guid.Parse("4d4cc034-466e-4b2d-b566-140ba951deb0"));
        // Assert
        result.ShouldNotBeNull();
        result.Id.ShouldBe(Guid.Parse("4d4cc034-466e-4b2d-b566-140ba951deb0"));
    }

    [Fact]
    public async Task CreateAsync()
    {
        // Arrange
        var input = new VegCreateDto
        {
            NameAr = "0275ca769a9a40ff945a4e25960d5e4d079e3daabcfe4b4c"
        };
        // Act
        var serviceResult = await _vegsAppService.CreateAsync(input);
        // Assert
        var result = await _vegRepository.FindAsync(c => c.Id == serviceResult.Id);
        result.ShouldNotBe(null);
        result.NameAr.ShouldBe("0275ca769a9a40ff945a4e25960d5e4d079e3daabcfe4b4c");
    }

    [Fact]
    public async Task UpdateAsync()
    {
        // Arrange
        var input = new VegUpdateDto()
        {
            NameAr = "2822e49dc2b04d2592df856a978a8f8f6d167718aea144769a71bd3bb72bc8e66ca5b6"
        };
        // Act
        var serviceResult = await _vegsAppService.UpdateAsync(Guid.Parse("4d4cc034-466e-4b2d-b566-140ba951deb0"), input);
        // Assert
        var result = await _vegRepository.FindAsync(c => c.Id == serviceResult.Id);
        result.ShouldNotBe(null);
        result.NameAr.ShouldBe("2822e49dc2b04d2592df856a978a8f8f6d167718aea144769a71bd3bb72bc8e66ca5b6");
    }

    [Fact]
    public async Task DeleteAsync()
    {
        // Act
        await _vegsAppService.DeleteAsync(Guid.Parse("4d4cc034-466e-4b2d-b566-140ba951deb0"));
        // Assert
        var result = await _vegRepository.FindAsync(c => c.Id == Guid.Parse("4d4cc034-466e-4b2d-b566-140ba951deb0"));
        result.ShouldBeNull();
    }
}