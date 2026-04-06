using MOD.Training.Fruits;
using Volo.Abp.EntityFrameworkCore.Modeling;
using Microsoft.EntityFrameworkCore;
using Volo.Abp.Data;
using Volo.Abp.EntityFrameworkCore;

namespace MOD.Training.EntityFrameworkCore;

[ConnectionStringName(TrainingDbProperties.ConnectionStringName)]
public class TrainingDbContext : AbpDbContext<TrainingDbContext>, ITrainingDbContext
{
        public DbSet<Fruit> Fruits { get; set; } = null!;
    /* Add DbSet for each Aggregate Root here. Example:
     * public DbSet<Question> Questions { get; set; }
     */

    public TrainingDbContext(DbContextOptions<TrainingDbContext> options)
        : base(options)
    {

    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.ConfigureTraining();
    }
}
