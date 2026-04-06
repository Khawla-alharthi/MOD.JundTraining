using System;
using System.Threading.Tasks;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Uow;
using MOD.Training.Fruits;

namespace MOD.Training.Fruits;

public class FruitsDataSeedContributor : IDataSeedContributor, ISingletonDependency
{
    private bool IsSeeded = false;
    private readonly IFruitRepository _fruitRepository;
    private readonly IUnitOfWorkManager _unitOfWorkManager;

    public FruitsDataSeedContributor(IFruitRepository fruitRepository, IUnitOfWorkManager unitOfWorkManager)
    {
        _fruitRepository = fruitRepository;
        _unitOfWorkManager = unitOfWorkManager;
    }

    public async Task SeedAsync(DataSeedContext context)
    {
        if (IsSeeded)
        {
            return;
        }

        await _fruitRepository.InsertAsync(new Fruit(id: Guid.Parse("94be7652-fae7-4134-b777-193b42cc8ae2"), nameAr: "d947aacc129f4e8f9479627cd60d133bed1c5d585b1548b094418aa5ba7b0edc40b7508cb6764f22b251b"));
        await _fruitRepository.InsertAsync(new Fruit(id: Guid.Parse("6c0161da-f605-4869-9a44-5bf065b484a5"), nameAr: "bd210b1a7d0649419b4d802d05b8ed3a10a29c7c9"));
        await _unitOfWorkManager!.Current!.SaveChangesAsync();
        IsSeeded = true;
    }
}