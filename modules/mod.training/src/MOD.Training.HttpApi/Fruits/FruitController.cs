using Asp.Versioning;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Volo.Abp;
using Volo.Abp.AspNetCore.Mvc;
using Volo.Abp.Application.Dtos;
using MOD.Training.Fruits;

namespace MOD.Training.Fruits;

[RemoteService(Name = "Training")]
[Area("training")]
[ControllerName("Fruit")]
[Route("api/training/fruits")]
public abstract class FruitControllerBase : AbpController
{
    protected IFruitsAppService _fruitsAppService;

    public FruitControllerBase(IFruitsAppService fruitsAppService)
    {
        _fruitsAppService = fruitsAppService;
    }

    [HttpGet]
    public virtual Task<PagedResultDto<FruitDto>> GetListAsync(GetFruitsInput input)
    {
        return _fruitsAppService.GetListAsync(input);
    }

    [HttpGet]
    [Route("{id}")]
    public virtual Task<FruitDto> GetAsync(Guid id)
    {
        return _fruitsAppService.GetAsync(id);
    }

    [HttpPost]
    public virtual Task<FruitDto> CreateAsync(FruitCreateDto input)
    {
        return _fruitsAppService.CreateAsync(input);
    }

    [HttpPut]
    [Route("{id}")]
    public virtual Task<FruitDto> UpdateAsync(Guid id, FruitUpdateDto input)
    {
        return _fruitsAppService.UpdateAsync(id, input);
    }

    [HttpDelete]
    [Route("{id}")]
    public virtual Task DeleteAsync(Guid id)
    {
        return _fruitsAppService.DeleteAsync(id);
    }
}