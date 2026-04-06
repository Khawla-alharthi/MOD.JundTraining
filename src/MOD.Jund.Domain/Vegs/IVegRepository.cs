using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;

namespace MOD.Jund.Vegs;

public partial interface IVegRepository : IRepository<Veg, Guid>
{
    Task<List<Veg>> GetListAsync(string? filterText = null, string? nameAr = null, string? sorting = null, int maxResultCount = int.MaxValue, int skipCount = 0, CancellationToken cancellationToken = default);
    Task<long> GetCountAsync(string? filterText = null, string? nameAr = null, CancellationToken cancellationToken = default);
}