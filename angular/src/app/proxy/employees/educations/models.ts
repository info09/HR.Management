import type { EducationLevel } from '../education-level.enum';
import type { GraduationType } from '../graduation-type.enum';
import type { EntityDto } from '@abp/ng.core';

export interface CreateUpdateEmployeeEducationDto {
  employeeId?: string;
  level: EducationLevel;
  major?: string;
  schoolName?: string;
  startYear: number;
  endYear: number;
  graduationType: GraduationType;
}

export interface EmployeeEducationDto extends EntityDto<string> {
  employeeId?: string;
  level: EducationLevel;
  major?: string;
  schoolName?: string;
  startYear: number;
  endYear: number;
  graduationType: GraduationType;
}
