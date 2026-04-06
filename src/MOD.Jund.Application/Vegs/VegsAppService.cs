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
using MOD.Jund.Permissions;
using MOD.Jund.Vegs;

namespace MOD.Jund.Vegs;

[RemoteService(IsEnabled = false)]
[Authorize(JundPermissions.Vegs.Default)]
public abstract class VegsAppServiceBase : JundAppService
{
    protected IVegRepository _vegRepository;
    protected VegManager _vegManager;

    public VegsAppServiceBase(IVegRepository vegRepository, VegManager vegManager)
    {
        _vegRepository = vegRepository;
        _vegManager = vegManager;
    }

    public virtual async Task<PagedResultDto<VegDto>> GetListAsync(GetVegsInput input)
    {
        var totalCount = await _vegRepository.GetCountAsync(input.FilterText, input.NameAr);
        var items = await _vegRepository.GetListAsync(input.FilterText, input.NameAr, input.Sorting, input.MaxResultCount, input.SkipCount);
        return new PagedResultDto<VegDto>
        {
            TotalCount = totalCount,
            Items = ObjectMapper.Map<List<Veg>, List<VegDto>>(items)
        };
    }

    public virtual async Task<VegDto> GetAsync(Guid id)
    {
        return ObjectMapper.Map<Veg, VegDto>(await _vegRepository.GetAsync(id));
    }

    [Authorize(JundPermissions.Vegs.Delete)]
    public virtual async Task DeleteAsync(Guid id)
    {
        await _vegRepository.DeleteAsync(id);
    }

    [Authorize(JundPermissions.Vegs.Create)]
    public virtual async Task<VegDto> CreateAsync(VegCreateDto input)
    {
        var veg = await _vegManager.CreateAsync(input.NameAr);
        return ObjectMapper.Map<Veg, VegDto>(veg);
    }

    [Authorize(JundPermissions.Vegs.Edit)]
    public virtual async Task<VegDto> UpdateAsync(Guid id, VegUpdateDto input)
    {
        var veg = await _vegManager.UpdateAsync(id, input.NameAr, input.ConcurrencyStamp);
        return ObjectMapper.Map<Veg, VegDto>(veg);
    }
}