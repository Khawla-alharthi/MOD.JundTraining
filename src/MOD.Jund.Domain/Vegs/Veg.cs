using System;
using System.Linq;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using Volo.Abp.Domain.Entities;
using Volo.Abp.Domain.Entities.Auditing;
using Volo.Abp.MultiTenancy;
using JetBrains.Annotations;
using Volo.Abp;

namespace MOD.Jund.Vegs;

public abstract class VegBase : FullAuditedAggregateRoot<Guid>
{
    [CanBeNull]
    public virtual string? NameAr { get; set; }

    protected VegBase()
    {
    }

    public VegBase(Guid id, string? nameAr = null)
    {
        Id = id;
        NameAr = nameAr;
    }
}