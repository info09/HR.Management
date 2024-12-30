import type { CreateUpdateEmployeeEducationDto, EmployeeEducationDto } from './educations/models';
import type { CreateUpdateEmployeeDto, EmployeeDto, EmployeeInListDto, EmployeeListFilter, UpdateImageEmployeeDto } from './models';
import { RestService } from '@abp/ng.core';
import type { PagedResultDto, PagedResultRequestDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  apiName = 'Default';
  

  addEducationByEmployeeIdAndInput = (employeeId: string, input: CreateUpdateEmployeeEducationDto) =>
    this.restService.request<any, EmployeeEducationDto>({
      method: 'POST',
      url: `/api/app/employee/education/${employeeId}`,
      body: input,
    },
    { apiName: this.apiName });
  

  create = (input: CreateUpdateEmployeeDto) =>
    this.restService.request<any, EmployeeDto>({
      method: 'POST',
      url: '/api/app/employee',
      body: input,
    },
    { apiName: this.apiName });
  

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/employee/${id}`,
    },
    { apiName: this.apiName });
  

  deleteMultiple = (ids: string[]) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: '/api/app/employee/multiple',
      params: { ids },
    },
    { apiName: this.apiName });
  

  get = (id: string) =>
    this.restService.request<any, EmployeeDto>({
      method: 'GET',
      url: `/api/app/employee/${id}`,
    },
    { apiName: this.apiName });
  

  getEducationByEducationIdByEducationId = (educationId: string) =>
    this.restService.request<any, EmployeeEducationDto>({
      method: 'GET',
      url: `/api/app/employee/education-by-education-id/${educationId}`,
    },
    { apiName: this.apiName });
  

  getEducationByEmployeeIdByEmployeeId = (employeeId: string) =>
    this.restService.request<any, EmployeeEducationDto[]>({
      method: 'GET',
      url: `/api/app/employee/education-by-employee-id/${employeeId}`,
    },
    { apiName: this.apiName });
  

  getList = (input: PagedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<EmployeeDto>>({
      method: 'GET',
      url: '/api/app/employee',
      params: { maxResultCount: input.maxResultCount, skipCount: input.skipCount },
    },
    { apiName: this.apiName });
  

  getListAll = () =>
    this.restService.request<any, EmployeeInListDto[]>({
      method: 'GET',
      url: '/api/app/employee/all',
    },
    { apiName: this.apiName });
  

  getListFilter = (filter: EmployeeListFilter) =>
    this.restService.request<any, PagedResultDto<EmployeeInListDto>>({
      method: 'GET',
      url: '/api/app/employee/filter',
      params: { departmentId: filter.departmentId, positionId: filter.positionId, keyword: filter.keyword, skipCount: filter.skipCount, maxResultCount: filter.maxResultCount },
    },
    { apiName: this.apiName });
  

  getThumbnailImage = (fileName: string) =>
    this.restService.request<any, string>({
      method: 'GET',
      responseType: 'text',
      url: '/api/app/employee/thumbnail-image',
      params: { fileName },
    },
    { apiName: this.apiName });
  

  update = (id: string, input: CreateUpdateEmployeeDto) =>
    this.restService.request<any, EmployeeDto>({
      method: 'PUT',
      url: `/api/app/employee/${id}`,
      body: input,
    },
    { apiName: this.apiName });
  

  updateEducationByEmployeeIdAndEducationIdAndInput = (employeeId: string, educationId: string, input: CreateUpdateEmployeeEducationDto) =>
    this.restService.request<any, EmployeeEducationDto>({
      method: 'PUT',
      url: '/api/app/employee/education',
      params: { employeeId, educationId },
      body: input,
    },
    { apiName: this.apiName });
  

  updateImageByIdAndInput = (id: string, input: UpdateImageEmployeeDto) =>
    this.restService.request<any, EmployeeDto>({
      method: 'PUT',
      url: `/api/app/employee/${id}/image`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
