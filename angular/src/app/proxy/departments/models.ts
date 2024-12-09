import type { EntityDto } from '@abp/ng.core';

export interface CreateUpdateDepartmentDto {
  name?: string;
  code?: string;
  location?: string;
}

export interface DepartmentDto extends EntityDto<string> {
  name?: string;
  code?: string;
  location?: string;
}

export interface DepartmentInListDto extends EntityDto<string> {
  name?: string;
  code?: string;
  location?: string;
}

export interface CreateUpdatePositionDto {
  name?: string;
  code?: string;
  baseSalary: number;
}

export interface PositionDto extends EntityDto<string> {
  name?: string;
  code?: string;
  baseSalary: number;
}

export interface PositionInListDto extends EntityDto<string> {
  name?: string;
  code?: string;
  baseSalary: number;
}
