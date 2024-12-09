import { RestService } from '@abp/ng.core';
import type { PagedResultDto, PagedResultRequestDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { CreateUpdatePositionDto, PositionDto, PositionInListDto } from '../departments/models';
import type { BaseListFilter } from '../models';

@Injectable({
  providedIn: 'root',
})
export class PositionService {
  apiName = 'Default';
  

  create = (input: CreateUpdatePositionDto) =>
    this.restService.request<any, PositionDto>({
      method: 'POST',
      url: '/api/app/position',
      body: input,
    },
    { apiName: this.apiName });
  

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/position/${id}`,
    },
    { apiName: this.apiName });
  

  deleteMultile = (ids: string[]) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: '/api/app/position/multile',
      params: { ids },
    },
    { apiName: this.apiName });
  

  get = (id: string) =>
    this.restService.request<any, PositionDto>({
      method: 'GET',
      url: `/api/app/position/${id}`,
    },
    { apiName: this.apiName });
  

  getList = (input: PagedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<PositionDto>>({
      method: 'GET',
      url: '/api/app/position',
      params: { maxResultCount: input.maxResultCount, skipCount: input.skipCount },
    },
    { apiName: this.apiName });
  

  getListAll = () =>
    this.restService.request<any, PositionInListDto[]>({
      method: 'GET',
      url: '/api/app/position/all',
    },
    { apiName: this.apiName });
  

  getListFilter = (filter: BaseListFilter) =>
    this.restService.request<any, PagedResultDto<PositionInListDto>>({
      method: 'GET',
      url: '/api/app/position/filter',
      params: { keyword: filter.keyword, skipCount: filter.skipCount, maxResultCount: filter.maxResultCount },
    },
    { apiName: this.apiName });
  

  update = (id: string, input: CreateUpdatePositionDto) =>
    this.restService.request<any, PositionDto>({
      method: 'PUT',
      url: `/api/app/position/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
