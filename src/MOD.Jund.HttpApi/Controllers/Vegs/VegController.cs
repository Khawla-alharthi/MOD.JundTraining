using Asp.Versioning;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Volo.Abp;
using Volo.Abp.AspNetCore.Mvc;
using Volo.Abp.Application.Dtos;
using MOD.Jund.Vegs;

namespace MOD.Jund.Controllers.Vegs;

[RemoteService]
[Area("app")]
[ControllerName("Veg")]
[Route("api/app/vegs")]
public abstract class VegControllerBase : AbpController
{
    protected IVegsAppService _vegsAppService;

    public VegControllerBase(IVegsAppService vegsAppService)
    {
        _vegsAppService = vegsAppService;
    }

    [HttpGet]
    public virtual Task<PagedResultDto<VegDto>> GetListAsync(GetVegsInput input)
    {
        return _vegsAppService.GetListAsync(input);
    }

    [HttpGet]
    [Route("{id}")]
    public virtual Task<VegDto> GetAsync(Guid id)
    {
        return _vegsAppService.GetAsync(id);
    }

    [HttpPost]
    public virtual Task<VegDto> CreateAsync(VegCreateDto input)
    {
        return _vegsAppService.CreateAsync(input);
    }

    [HttpPut]
    [Route("{id}")]
    public virtual Task<VegDto> UpdateAsync(Guid id, VegUpdateDto input)
    {
        return _vegsAppService.UpdateAsync(id, input);
    }

    [HttpDelete]
    [Route("{id}")]
    public virtual Task DeleteAsync(Guid id)
    {
        return _vegsAppService.DeleteAsync(id);
    }
}