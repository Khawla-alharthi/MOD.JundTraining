using Volo.Abp.Application.Dtos;
using System;

namespace MOD.Training.Fruits;

public abstract class GetFruitsInputBase : PagedAndSortedResultRequestDto
{
    public string? FilterText { get; set; }

    public string? NameAr { get; set; }

    public GetFruitsInputBase()
    {
    }
}