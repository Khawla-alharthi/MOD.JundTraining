using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace MOD.Training.Fruits;

public partial interface IFruitsAppService : IApplicationService
{
    Task<PagedResultDto<FruitDto>> GetListAsync(GetFruitsInput input);
    Task<FruitDto> GetAsync(Guid id);
    Task DeleteAsync(Guid id);
    Task<FruitDto> CreateAsync(FruitCreateDto input);
    Task<FruitDto> UpdateAsync(Guid id, FruitUpdateDto input);
}