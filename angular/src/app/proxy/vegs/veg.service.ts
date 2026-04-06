import type { GetVegsInput, VegCreateDto, VegDto, VegUpdateDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable, inject } from '@angular/core';
import type { AppFileDescriptorDto, DownloadTokenResultDto, GetFileInput } from '../shared/models';

@Injectable({
  providedIn: 'root',
})
export class VegService {
  private restService = inject(RestService);
  apiName = 'Default';

  create = (input: VegCreateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, VegDto>(
      {
        method: 'POST',
        url: '/api/app/vegs',
        body: input,
      },
      { apiName: this.apiName, ...config },
    );

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>(
      {
        method: 'DELETE',
        url: `/api/app/vegs/${id}`,
      },
      { apiName: this.apiName, ...config },
    );

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, VegDto>(
      {
        method: 'GET',
        url: `/api/app/vegs/${id}`,
      },
      { apiName: this.apiName, ...config },
    );

  getDownloadToken = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, DownloadTokenResultDto>(
      {
        method: 'GET',
        url: '/api/app/vegs/download-token',
      },
      { apiName: this.apiName, ...config },
    );

  getFile = (input: GetFileInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, Blob>(
      {
        method: 'GET',
        responseType: 'blob',
        url: '/api/app/vegs/file',
        params: { downloadToken: input.downloadToken, fileId: input.fileId },
      },
      { apiName: this.apiName, ...config },
    );

  getList = (input: GetVegsInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<VegDto>>(
      {
        method: 'GET',
        url: '/api/app/vegs',
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

  update = (id: string, input: VegUpdateDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, VegDto>(
      {
        method: 'PUT',
        url: `/api/app/vegs/${id}`,
        body: input,
      },
      { apiName: this.apiName, ...config },
    );

  uploadFile = (input: FormData, config?: Partial<Rest.Config>) =>
    this.restService.request<any, AppFileDescriptorDto>(
      {
        method: 'POST',
        url: '/api/app/vegs/upload-file',
        body: input,
      },
      { apiName: this.apiName, ...config },
    );
}
