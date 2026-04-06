using Asp.Versioning;
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Volo.Abp;
using Volo.Abp.AspNetCore.Mvc;
using Volo.Abp.Application.Dtos;
using MOD.Jund.Vegs;

namespace MOD.Jund.Controllers.Vegs;

[RemoteService]
[Area("app")]
[ControllerName("Veg")]
[Route("api/app/vegs")]
public class VegController : VegControllerBase, IVegsAppService
{
    public VegController(IVegsAppService vegsAppService) : base(vegsAppService)
    {
    }
}