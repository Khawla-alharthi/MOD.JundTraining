using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JetBrains.Annotations;
using Volo.Abp;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Domain.Services;
using Volo.Abp.Data;

namespace MOD.Training.Fruits;

public abstract class FruitManagerBase : DomainService
{
    protected IFruitRepository _fruitRepository;

    public FruitManagerBase(IFruitRepository fruitRepository)
    {
        _fruitRepository = fruitRepository;
    }

    public virtual async Task<Fruit> CreateAsync(string? nameAr = null)
    {
        var fruit = new Fruit(GuidGenerator.Create(), nameAr);
        return await _fruitRepository.InsertAsync(fruit);
    }

    public virtual async Task<Fruit> UpdateAsync(Guid id, string? nameAr = null, [CanBeNull] string? concurrencyStamp = null)
    {
        var fruit = await _fruitRepository.GetAsync(id);
        fruit.NameAr = nameAr;
        fruit.SetConcurrencyStampIfNotNull(concurrencyStamp);
        return await _fruitRepository.UpdateAsync(fruit);
    }
}