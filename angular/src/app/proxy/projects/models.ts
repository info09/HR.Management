import type { EntityDto } from '@abp/ng.core';

export interface CreateUpdateProjectDto {
  name?: string;
  startDate?: string;
  endDate?: string;
  budget: number;
  code?: string;
}

export interface ProjectDto extends EntityDto<string> {
  name?: string;
  startDate?: string;
  endDate?: string;
  budget: number;
  code?: string;
}

export interface ProjectInListDto extends EntityDto<string> {
  name?: string;
  startDate?: string;
  endDate?: string;
  budget: number;
  code?: string;
}
