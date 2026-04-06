using System;
using System.IO;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace MOD.Jund.EntityFrameworkCore;

/* This class is needed for EF Core console commands
 * (like Add-Migration and Update-Database commands) */
public class JundDbContextFactory : IDesignTimeDbContextFactory<JundDbContext>
{
    public JundDbContext CreateDbContext(string[] args)
    {
        var configuration = BuildConfiguration();
        
        JundEfCoreEntityExtensionMappings.Configure();

        var builder = new DbContextOptionsBuilder<JundDbContext>()
            .UseSqlServer(configuration.GetConnectionString("Default"));
        
        return new JundDbContext(builder.Options);
    }

    private static IConfigurationRoot BuildConfiguration()
    {
        var builder = new ConfigurationBuilder()
            .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), "../MOD.Jund.DbMigrator/"))
            .AddJsonFile("appsettings.json", optional: false)
            .AddEnvironmentVariables();

        return builder.Build();
    }
}
