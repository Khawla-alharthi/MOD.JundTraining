using System;
using System.IO;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq.Dynamic.Core;
using Microsoft.AspNetCore.Authorization;
using Volo.Abp;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
using MOD.Training.Permissions;
using MOD.Training.Fruits;

namespace MOD.Training.Fruits;

[Authorize(TrainingPermissions.Fruits.Default)]
public abstract class FruitsAppServiceBase : TrainingAppService
{
    protected IFruitRepository _fruitRepository;
    protected FruitManager _fruitManager;

    public FruitsAppServiceBase(IFruitRepository fruitRepository, FruitManager fruitManager)
    {
        _fruitRepository = fruitRepository;
        _fruitManager = fruitManager;
    }

    public virtual async Task<PagedResultDto<FruitDto>> GetListAsync(GetFruitsInput input)
    {
        var totalCount = await _fruitRepository.GetCountAsync(input.FilterText, input.NameAr);
        var items = await _fruitRepository.GetListAsync(input.FilterText, input.NameAr, input.Sorting, input.MaxResultCount, input.SkipCount);
        return new PagedResultDto<FruitDto>
        {
            TotalCount = totalCount,
            Items = ObjectMapper.Map<List<Fruit>, List<FruitDto>>(items)
        };
    }

    public virtual async Task<FruitDto> GetAsync(Guid id)
    {
        return ObjectMapper.Map<Fruit, FruitDto>(await _fruitRepository.GetAsync(id));
    }

    [Authorize(TrainingPermissions.Fruits.Delete)]
    public virtual async Task DeleteAsync(Guid id)
    {
        await _fruitRepository.DeleteAsync(id);
    }

    [Authorize(TrainingPermissions.Fruits.Create)]
    public virtual async Task<FruitDto> CreateAsync(FruitCreateDto input)
    {
        var fruit = await _fruitManager.CreateAsync(input.NameAr);
        return ObjectMapper.Map<Fruit, FruitDto>(fruit);
    }

    [Authorize(TrainingPermissions.Fruits.Edit)]
    public virtual async Task<FruitDto> UpdateAsync(Guid id, FruitUpdateDto input)
    {
        var fruit = await _fruitManager.UpdateAsync(id, input.NameAr, input.ConcurrencyStamp);
        return ObjectMapper.Map<Fruit, FruitDto>(fruit);
    }
}