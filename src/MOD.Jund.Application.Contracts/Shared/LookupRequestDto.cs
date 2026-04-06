using Volo.Abp.Application.Dtos;

namespace MOD.Jund.Shared;

public abstract class LookupRequestDtoBase : PagedResultRequestDto
{
    public string? Filter { get; set; }

    public LookupRequestDtoBase()
    {
        MaxResultCount = MaxMaxResultCount;
    }
}