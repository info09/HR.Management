import type { CreateUpdateDepartmentDto, DepartmentDto, DepartmentInListDto } from './models';
import { RestService } from '@abp/ng.core';
import type { PagedResultDto, PagedResultRequestDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { BaseListFilter } from '../models';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  apiName = 'Default';
  

  create = (input: CreateUpdateDepartmentDto) =>
    this.restService.request<any, DepartmentDto>({
      method: 'POST',
      url: '/api/app/department',
      body: input,
    },
    { apiName: this.apiName });
  

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/department/${id}`,
    },
    { apiName: this.apiName });
  

  deleteMultile = (ids: string[]) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: '/api/app/department/multile',
      params: { ids },
    },
    { apiName: this.apiName });
  

  get = (id: string) =>
    this.restService.request<any, DepartmentDto>({
      method: 'GET',
      url: `/api/app/department/${id}`,
    },
    { apiName: this.apiName });
  

  getList = (input: PagedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<DepartmentDto>>({
      method: 'GET',
      url: '/api/app/department',
      params: { maxResultCount: input.maxResultCount, skipCount: input.skipCount },
    },
    { apiName: this.apiName });
  

  getListAll = () =>
    this.restService.request<any, DepartmentInListDto[]>({
      method: 'GET',
      url: '/api/app/department/all',
    },
    { apiName: this.apiName });
  

  getListFilter = (filter: BaseListFilter) =>
    this.restService.request<any, PagedResultDto<DepartmentInListDto>>({
      method: 'GET',
      url: '/api/app/department/filter',
      params: { keyword: filter.keyword, skipCount: filter.skipCount, maxResultCount: filter.maxResultCount },
    },
    { apiName: this.apiName });
  

  update = (id: string, input: CreateUpdateDepartmentDto) =>
    this.restService.request<any, DepartmentDto>({
      method: 'PUT',
      url: `/api/app/department/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
