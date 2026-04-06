using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;

namespace MOD.Training.Fruits;

public partial interface IFruitRepository : IRepository<Fruit, Guid>
{
    Task<List<Fruit>> GetListAsync(string? filterText = null, string? nameAr = null, string? sorting = null, int maxResultCount = int.MaxValue, int skipCount = 0, CancellationToken cancellationToken = default);
    Task<long> GetCountAsync(string? filterText = null, string? nameAr = null, CancellationToken cancellationToken = default);
}