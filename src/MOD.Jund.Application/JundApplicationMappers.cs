using System;
using MOD.Jund.Shared;
using MOD.Jund.Vegs;
using System.Linq;
using System.Collections.Generic;
using Riok.Mapperly.Abstractions;
using Volo.Abp.Mapperly;

namespace MOD.Jund;

/*
 * You can add your own mappings here.
 * [Mapper(RequiredMappingStrategy = RequiredMappingStrategy.Target)]
 * public partial class JundApplicationMappers : MapperBase<BookDto, CreateUpdateBookDto>
 * {
 *    public override partial CreateUpdateBookDto Map(BookDto source);
 * 
 *    public override partial void Map(BookDto source, CreateUpdateBookDto destination);
 * }
 */
[Mapper]
public partial class VegToVegDtoMappers : MapperBase<Veg, VegDto>
{
    public override partial VegDto Map(Veg source);
    public override partial void Map(Veg source, VegDto destination);
}