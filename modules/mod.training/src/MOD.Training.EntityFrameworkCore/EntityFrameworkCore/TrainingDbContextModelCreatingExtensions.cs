using MOD.Training.Fruits;
using Volo.Abp.EntityFrameworkCore.Modeling;
using Microsoft.EntityFrameworkCore;
using Volo.Abp;

namespace MOD.Training.EntityFrameworkCore;

public static class TrainingDbContextModelCreatingExtensions
{
    public static void ConfigureTraining(this ModelBuilder builder)
    {
        Check.NotNull(builder, nameof(builder));
        /* Configure all entities here. Example:

        builder.Entity<Question>(b =>
        {
            //Configure table & schema name
            b.ToTable(TrainingDbProperties.DbTablePrefix + "Questions", TrainingDbProperties.DbSchema);

            b.ConfigureByConvention();

            //Properties
            b.Property(q => q.Title).IsRequired().HasMaxLength(QuestionConsts.MaxTitleLength);

            //Relations
            b.HasMany(question => question.Tags).WithOne().HasForeignKey(qt => qt.QuestionId);

            //Indexes
            b.HasIndex(q => q.CreationTime);
        });
        */
        if (builder.IsHostDatabase())
        {
        }

        if (builder.IsHostDatabase())
        {
            builder.Entity<Fruit>(b => {
                b.ToTable(TrainingDbProperties.DbTablePrefix + "Fruits", TrainingDbProperties.DbSchema);
                b.ConfigureByConvention();
                b.Property(x => x.NameAr).HasColumnName(nameof(Fruit.NameAr));
            });
        }
    }
}