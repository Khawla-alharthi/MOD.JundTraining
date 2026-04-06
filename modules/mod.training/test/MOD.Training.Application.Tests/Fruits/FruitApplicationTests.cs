using System;
using System.Linq;
using Shouldly;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Modularity;
using Xunit;

namespace MOD.Training.Fruits;

public abstract class FruitsAppServiceTests<TStartupModule> : TrainingApplicationTestBase<TStartupModule> where TStartupModule : IAbpModule
{
    private readonly IFruitsAppService _fruitsAppService;
    private readonly IRepository<Fruit, Guid> _fruitRepository;

    public FruitsAppServiceTests()
    {
        _fruitsAppService = GetRequiredService<IFruitsAppService>();
        _fruitRepository = GetRequiredService<IRepository<Fruit, Guid>>();
    }

    [Fact]
    public async Task GetListAsync()
    {
        // Act
        var result = await _fruitsAppService.GetListAsync(new GetFruitsInput());
        // Assert
        result.TotalCount.ShouldBe(2);
        result.Items.Count.ShouldBe(2);
        result.Items.Any(x => x.Id == Guid.Parse("94be7652-fae7-4134-b777-193b42cc8ae2")).ShouldBe(true);
        result.Items.Any(x => x.Id == Guid.Parse("6c0161da-f605-4869-9a44-5bf065b484a5")).ShouldBe(true);
    }

    [Fact]
    public async Task GetAsync()
    {
        // Act
        var result = await _fruitsAppService.GetAsync(Guid.Parse("94be7652-fae7-4134-b777-193b42cc8ae2"));
        // Assert
        result.ShouldNotBeNull();
        result.Id.ShouldBe(Guid.Parse("94be7652-fae7-4134-b777-193b42cc8ae2"));
    }

    [Fact]
    public async Task CreateAsync()
    {
        // Arrange
        var input = new FruitCreateDto
        {
            NameAr = "c173b5bee2ff46ffb9b8329136685040cc7701698b854424846313"
        };
        // Act
        var serviceResult = await _fruitsAppService.CreateAsync(input);
        // Assert
        var result = await _fruitRepository.FindAsync(c => c.Id == serviceResult.Id);
        result.ShouldNotBe(null);
        result.NameAr.ShouldBe("c173b5bee2ff46ffb9b8329136685040cc7701698b854424846313");
    }

    [Fact]
    public async Task UpdateAsync()
    {
        // Arrange
        var input = new FruitUpdateDto()
        {
            NameAr = "05f578de299c43468eec054916d23a4421543a1b85024eb49d7acad8b6928f8b3e200ee3baf9"
        };
        // Act
        var serviceResult = await _fruitsAppService.UpdateAsync(Guid.Parse("94be7652-fae7-4134-b777-193b42cc8ae2"), input);
        // Assert
        var result = await _fruitRepository.FindAsync(c => c.Id == serviceResult.Id);
        result.ShouldNotBe(null);
        result.NameAr.ShouldBe("05f578de299c43468eec054916d23a4421543a1b85024eb49d7acad8b6928f8b3e200ee3baf9");
    }

    [Fact]
    public async Task DeleteAsync()
    {
        // Act
        await _fruitsAppService.DeleteAsync(Guid.Parse("94be7652-fae7-4134-b777-193b42cc8ae2"));
        // Assert
        var result = await _fruitRepository.FindAsync(c => c.Id == Guid.Parse("94be7652-fae7-4134-b777-193b42cc8ae2"));
        result.ShouldBeNull();
    }
}