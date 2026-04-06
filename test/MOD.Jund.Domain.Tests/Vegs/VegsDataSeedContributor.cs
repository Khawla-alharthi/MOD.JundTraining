using System;
using System.Threading.Tasks;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Uow;
using MOD.Jund.Vegs;

namespace MOD.Jund.Vegs;

public class VegsDataSeedContributor : IDataSeedContributor, ISingletonDependency
{
    private bool IsSeeded = false;
    private readonly IVegRepository _vegRepository;
    private readonly IUnitOfWorkManager _unitOfWorkManager;

    public VegsDataSeedContributor(IVegRepository vegRepository, IUnitOfWorkManager unitOfWorkManager)
    {
        _vegRepository = vegRepository;
        _unitOfWorkManager = unitOfWorkManager;
    }

    public async Task SeedAsync(DataSeedContext context)
    {
        if (IsSeeded)
        {
            return;
        }

        await _vegRepository.InsertAsync(new Veg(id: Guid.Parse("4d4cc034-466e-4b2d-b566-140ba951deb0"), nameAr: "8b76f634463c418f90b3a7be5c5ea00c32767856ef65492"));
        await _vegRepository.InsertAsync(new Veg(id: Guid.Parse("d5d411f9-3177-4bbe-8219-f9493ff2ab02"), nameAr: "ac900f6f3a204ae4afc3755892b11f9de4a08c6"));
        await _unitOfWorkManager!.Current!.SaveChangesAsync();
        IsSeeded = true;
    }
}