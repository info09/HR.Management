import type { EntityDto } from '@abp/ng.core';

export interface CreateUpdateProjectDto {
  name?: string;
  startDate?: string;
  endDate?: string;
  budget: number;
}

export interface ProjectDto extends EntityDto<string> {
  name?: string;
  startDate?: string;
  endDate?: string;
  budget: number;
}

export interface ProjectInListDto extends EntityDto<string> {
  name?: string;
  startDate?: string;
  endDate?: string;
  budget: number;
}
