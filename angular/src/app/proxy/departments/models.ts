import type { EntityDto } from '@abp/ng.core';

export interface CreateUpdateDepartmentDto {
  name?: string;
  location?: string;
}

export interface DepartmentDto extends EntityDto<string> {
  name?: string;
  location?: string;
}

export interface DepartmentInListDto extends EntityDto<string> {
  name?: string;
  location?: string;
}

export interface CreateUpdatePositionDto {
  name?: string;
  location?: string;
}

export interface PositionDto extends EntityDto<string> {
  name?: string;
  location?: string;
}

export interface PositionInListDto extends EntityDto<string> {
  name?: string;
  location?: string;
}
