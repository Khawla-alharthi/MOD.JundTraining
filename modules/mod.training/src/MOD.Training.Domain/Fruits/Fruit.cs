using System;
using System.Linq;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using Volo.Abp.Domain.Entities;
using Volo.Abp.Domain.Entities.Auditing;
using Volo.Abp.MultiTenancy;
using JetBrains.Annotations;
using Volo.Abp;

namespace MOD.Training.Fruits;

public abstract class FruitBase : FullAuditedAggregateRoot<Guid>
{
    [CanBeNull]
    public virtual string? NameAr { get; set; }

    protected FruitBase()
    {
    }

    public FruitBase(Guid id, string? nameAr = null)
    {
        Id = id;
        NameAr = nameAr;
    }
}