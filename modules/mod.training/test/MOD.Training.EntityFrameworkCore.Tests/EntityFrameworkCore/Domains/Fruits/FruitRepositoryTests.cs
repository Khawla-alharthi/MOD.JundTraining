using Shouldly;
using System;
using System.Linq;
using System.Threading.Tasks;
using MOD.Training.Fruits;
using MOD.Training.EntityFrameworkCore;
using Xunit;

namespace MOD.Training.EntityFrameworkCore.Domains.Fruits;

public class FruitRepositoryTests : TrainingEntityFrameworkCoreTestBase
{
    private readonly IFruitRepository _fruitRepository;

    public FruitRepositoryTests()
    {
        _fruitRepository = GetRequiredService<IFruitRepository>();
    }

    [Fact]
    public async Task GetListAsync()
    {
        // Arrange
        await WithUnitOfWorkAsync(async () => {
            // Act
            var result = await _fruitRepository.GetListAsync(nameAr: "d947aacc129f4e8f9479627cd60d133bed1c5d585b1548b094418aa5ba7b0edc40b7508cb6764f22b251b");
            // Assert
            result.Count.ShouldBe(1);
            result.FirstOrDefault().ShouldNotBe(null);
            result.First().Id.ShouldBe(Guid.Parse("94be7652-fae7-4134-b777-193b42cc8ae2"));
        });
    }

    [Fact]
    public async Task GetCountAsync()
    {
        // Arrange
        await WithUnitOfWorkAsync(async () => {
            // Act
            var result = await _fruitRepository.GetCountAsync(nameAr: "bd210b1a7d0649419b4d802d05b8ed3a10a29c7c9");
            // Assert
            result.ShouldBe(1);
        });
    }
}