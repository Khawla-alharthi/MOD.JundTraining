import type { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface GetVegsInput extends PagedAndSortedResultRequestDto {
  filterText?: string;
  nameAr?: string;
}

export interface VegCreateDto {
  nameAr?: string;
}

export interface VegDto extends FullAuditedEntityDto<string> {
  nameAr?: string;
  concurrencyStamp?: string;
}

export interface VegUpdateDto {
  nameAr?: string;
  concurrencyStamp?: string;
}
