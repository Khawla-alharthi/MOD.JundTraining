using MOD.Training.Fruits;
using Microsoft.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore.Modeling;
using Volo.Abp.Data;
using Volo.Abp.EntityFrameworkCore;

namespace MOD.Training.EntityFrameworkCore;

[ConnectionStringName(TrainingDbProperties.ConnectionStringName)]
public interface ITrainingDbContext : IEfCoreDbContext
{
        DbSet<Fruit> Fruits { get; set; }
    /* Add DbSet for each Aggregate Root here. Example:
     * DbSet<Question> Questions { get; }
     */
}
