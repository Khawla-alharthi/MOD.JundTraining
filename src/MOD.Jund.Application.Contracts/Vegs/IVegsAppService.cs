using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace MOD.Jund.Vegs;

public partial interface IVegsAppService : IApplicationService
{
    Task<PagedResultDto<VegDto>> GetListAsync(GetVegsInput input);
    Task<VegDto> GetAsync(Guid id);
    Task DeleteAsync(Guid id);
    Task<VegDto> CreateAsync(VegCreateDto input);
    Task<VegDto> UpdateAsync(Guid id, VegUpdateDto input);
}