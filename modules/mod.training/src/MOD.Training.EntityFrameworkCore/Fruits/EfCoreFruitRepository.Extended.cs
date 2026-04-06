using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;
using MOD.Training.EntityFrameworkCore;

namespace MOD.Training.Fruits;

public class EfCoreFruitRepository : EfCoreFruitRepositoryBase, IFruitRepository
{
    public EfCoreFruitRepository(IDbContextProvider<TrainingDbContext> dbContextProvider) : base(dbContextProvider)
    {
    }
}