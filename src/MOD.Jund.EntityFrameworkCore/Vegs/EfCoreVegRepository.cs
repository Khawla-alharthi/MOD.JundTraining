using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;
using MOD.Jund.EntityFrameworkCore;

namespace MOD.Jund.Vegs;

public abstract class EfCoreVegRepositoryBase : EfCoreRepository<JundDbContext, Veg, Guid>
{
    public EfCoreVegRepositoryBase(IDbContextProvider<JundDbContext> dbContextProvider) : base(dbContextProvider)
    {
    }

    public virtual async Task<List<Veg>> GetListAsync(string? filterText = null, string? nameAr = null, string? sorting = null, int maxResultCount = int.MaxValue, int skipCount = 0, CancellationToken cancellationToken = default)
    {
        var query = ApplyFilter((await GetQueryableAsync()), filterText, nameAr);
        query = query.OrderBy(string.IsNullOrWhiteSpace(sorting) ? VegConsts.GetDefaultSorting(false) : sorting);
        return await query.PageBy(skipCount, maxResultCount).ToListAsync(cancellationToken);
    }

    public virtual async Task<long> GetCountAsync(string? filterText = null, string? nameAr = null, CancellationToken cancellationToken = default)
    {
        var query = ApplyFilter((await GetDbSetAsync()), filterText, nameAr);
        return await query.LongCountAsync(GetCancellationToken(cancellationToken));
    }

    protected virtual IQueryable<Veg> ApplyFilter(IQueryable<Veg> query, string? filterText = null, string? nameAr = null)
    {
        return query.WhereIf(!string.IsNullOrWhiteSpace(filterText), e => e.NameAr!.Contains(filterText!)).WhereIf(!string.IsNullOrWhiteSpace(nameAr), e => e.NameAr.Contains(nameAr));
    }
}