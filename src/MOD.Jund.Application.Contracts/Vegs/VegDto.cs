using System;
using System.Collections.Generic;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Domain.Entities;

namespace MOD.Jund.Vegs;

public abstract class VegDtoBase : FullAuditedEntityDto<Guid>, IHasConcurrencyStamp
{
    public string? NameAr { get; set; }

    public string ConcurrencyStamp { get; set; } = null!;
}