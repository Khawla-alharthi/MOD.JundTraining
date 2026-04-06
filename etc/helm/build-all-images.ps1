./build-image.ps1 -ProjectPath "../../src/MOD.Jund.DbMigrator/MOD.Jund.DbMigrator.csproj" -ImageName jund/dbmigrator
./build-image.ps1 -ProjectPath "../../src/MOD.Jund.HttpApi.Host/MOD.Jund.HttpApi.Host.csproj" -ImageName jund/httpapihost
./build-image.ps1 -ProjectPath "../../angular" -ImageName jund/angular -ProjectType "angular"
