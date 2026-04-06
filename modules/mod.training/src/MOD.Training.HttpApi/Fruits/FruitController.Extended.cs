using Asp.Versioning;
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Volo.Abp;
using Volo.Abp.AspNetCore.Mvc;
using Volo.Abp.Application.Dtos;
using MOD.Training.Fruits;

namespace MOD.Training.Fruits;

[RemoteService(Name = "Training")]
[Area("training")]
[ControllerName("Fruit")]
[Route("api/training/fruits")]
public class FruitController : FruitControllerBase, IFruitsAppService
{
    public FruitController(IFruitsAppService fruitsAppService) : base(fruitsAppService)
    {
    }
}