import type { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface FruitCreateDto {
  nameAr?: string;
}

export interface FruitDto extends FullAuditedEntityDto<string> {
  nameAr?: string;
  concurrencyStamp?: string;
}

export interface FruitUpdateDto {
  nameAr?: string;
  concurrencyStamp?: string;
}

export interface GetFruitsInput extends PagedAndSortedResultRequestDto {
  filterText?: string;
  nameAr?: string;
}
