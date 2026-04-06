using System;
using System.Collections.Generic;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Domain.Entities;

namespace MOD.Training.Fruits;

public abstract class FruitDtoBase : FullAuditedEntityDto<Guid>, IHasConcurrencyStamp
{
    public string? NameAr { get; set; }

    public string ConcurrencyStamp { get; set; } = null!;
}