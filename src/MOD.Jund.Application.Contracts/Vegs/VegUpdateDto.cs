using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using Volo.Abp.Domain.Entities;

namespace MOD.Jund.Vegs;

public abstract class VegUpdateDtoBase : IHasConcurrencyStamp
{
    public string? NameAr { get; set; }

    public string ConcurrencyStamp { get; set; } = null!;
}