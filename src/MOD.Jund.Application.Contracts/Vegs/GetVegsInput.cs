using Volo.Abp.Application.Dtos;
using System;

namespace MOD.Jund.Vegs;

public abstract class GetVegsInputBase : PagedAndSortedResultRequestDto
{
    public string? FilterText { get; set; }

    public string? NameAr { get; set; }

    public GetVegsInputBase()
    {
    }
}