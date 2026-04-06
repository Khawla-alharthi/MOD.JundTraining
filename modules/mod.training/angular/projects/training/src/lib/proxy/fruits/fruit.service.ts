import type { FruitCreateDto, FruitDto, FruitUpdateDto, GetFruitsInput } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable, inject } from '@angular/core';
import type { AppFileDescriptorDto, DownloadTokenResultDto, GetFileInput } from '../shared/models';

@Injectable({
  providedIn: 'root',
})
export class FruitService {
  private restService = inject(RestService);
  apiName = 'Training';

  create = (input: FruitCreateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, FruitDto>(
      {
        method: 'POST',
        url: '/api/training/fruits',
        body: input,
      },
      { apiName: this.apiName, ...config },
    );

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>(
      {
        method: 'DELETE',
        url: `/api/training/fruits/${id}`,
      },
      { apiName: this.apiName, ...config },
    );

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, FruitDto>(
      {
        method: 'GET',
        url: `/api/training/fruits/${id}`,
      },
      { apiName: this.apiName, ...config },
    );

  getDownloadToken = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, DownloadTokenResultDto>(
      {
        method: 'GET',
        url: '/api/training/fruits/download-token',
      },
      { apiName: this.apiName, ...config },
    );

  getFile = (input: GetFileInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, Blob>(
      {
        method: 'GET',
        responseType: 'blob',
        url: '/api/training/fruits/file',
        params: { downloadToken: input.downloadToken, fileId: input.fileId },
      },
      { apiName: this.apiName, ...config },
    );

  getList = (input: GetFruitsInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<FruitDto>>(
      {
        method: 'GET',
        url: '/api/training/fruits',
        params: {
          filterText: input.filterText,
          sorting: input.sorting,
          skipCount: input.skipCount,
          maxResultCount: input.maxResultCount,
          nameAr: input.nameAr,
        },
      },
      { apiName: this.apiName, ...config },
    );

  update = (id: string, input: FruitUpdateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, FruitDto>(
      {
        method: 'PUT',
        url: `/api/training/fruits/${id}`,
        body: input,
      },
      { apiName: this.apiName, ...config },
    );

  uploadFile = (input: FormData, config?: Partial<Rest.Config>) =>
    this.restService.request<any, AppFileDescriptorDto>(
      {
        method: 'POST',
        url: '/api/training/fruits/upload-file',
        body: input,
      },
      { apiName: this.apiName, ...config },
    );
}
