import type { CreateUpdateProjectDto, ProjectDto, ProjectInListDto } from './models';
import { RestService } from '@abp/ng.core';
import type { PagedResultDto, PagedResultRequestDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { BaseListFilter } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  apiName = 'Default';
  

  create = (input: CreateUpdateProjectDto) =>
    this.restService.request<any, ProjectDto>({
      method: 'POST',
      url: '/api/app/project',
      body: input,
    },
    { apiName: this.apiName });
  

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/project/${id}`,
    },
    { apiName: this.apiName });
  

  deleteMultile = (ids: string[]) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: '/api/app/project/multile',
      params: { ids },
    },
    { apiName: this.apiName });
  

  get = (id: string) =>
    this.restService.request<any, ProjectDto>({
      method: 'GET',
      url: `/api/app/project/${id}`,
    },
    { apiName: this.apiName });
  

  getList = (input: PagedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<ProjectDto>>({
      method: 'GET',
      url: '/api/app/project',
      params: { maxResultCount: input.maxResultCount, skipCount: input.skipCount },
    },
    { apiName: this.apiName });
  

  getListAll = () =>
    this.restService.request<any, ProjectInListDto[]>({
      method: 'GET',
      url: '/api/app/project/all',
    },
    { apiName: this.apiName });
  

  getListFilter = (filter: BaseListFilter) =>
    this.restService.request<any, PagedResultDto<ProjectInListDto>>({
      method: 'GET',
      url: '/api/app/project/filter',
      params: { keyword: filter.keyword, skipCount: filter.skipCount, maxResultCount: filter.maxResultCount },
    },
    { apiName: this.apiName });
  

  update = (id: string, input: CreateUpdateProjectDto) =>
    this.restService.request<any, ProjectDto>({
      method: 'PUT',
      url: `/api/app/project/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
