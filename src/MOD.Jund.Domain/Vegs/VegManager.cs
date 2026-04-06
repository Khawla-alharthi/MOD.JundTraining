using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JetBrains.Annotations;
using Volo.Abp;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Domain.Services;
using Volo.Abp.Data;

namespace MOD.Jund.Vegs;

public abstract class VegManagerBase : DomainService
{
    protected IVegRepository _vegRepository;

    public VegManagerBase(IVegRepository vegRepository)
    {
        _vegRepository = vegRepository;
    }

    public virtual async Task<Veg> CreateAsync(string? nameAr = null)
    {
        var veg = new Veg(GuidGenerator.Create(), nameAr);
        return await _vegRepository.InsertAsync(veg);
    }

    public virtual async Task<Veg> UpdateAsync(Guid id, string? nameAr = null, [CanBeNull] string? concurrencyStamp = null)
    {
        var veg = await _vegRepository.GetAsync(id);
        veg.NameAr = nameAr;
        veg.SetConcurrencyStampIfNotNull(concurrencyStamp);
        return await _vegRepository.UpdateAsync(veg);
    }
}