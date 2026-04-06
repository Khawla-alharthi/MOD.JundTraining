using System;
using MOD.Training.Shared;
using MOD.Training.Fruits;
using System.Linq;
using System.Collections.Generic;
using Riok.Mapperly.Abstractions;
using Volo.Abp.Mapperly;

namespace MOD.Training;

/*
Write your mappings here...

[Mapper(RequiredMappingStrategy = RequiredMappingStrategy.Target)]
public partial class TrainingApplicationMappers : MapperBase<Book, BookDto>
{
    public override partial BookDto Map(Book source);

    public override partial void Map(Book source, BookDto destination);
}
*/
[Mapper]
public partial class FruitToFruitDtoMappers : MapperBase<Fruit, FruitDto>
{
    public override partial FruitDto Map(Fruit source);
    public override partial void Map(Fruit source, FruitDto destination);
}