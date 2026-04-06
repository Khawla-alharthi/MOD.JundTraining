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

public class EfCoreVegRepository : EfCoreVegRepositoryBase, IVegRepository
{
    public EfCoreVegRepository(IDbContextProvider<JundDbContext> dbContextProvider) : base(dbContextProvider)
    {
    }
}