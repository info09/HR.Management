import type { GenderType } from './gender-type.enum';
import type { EntityDto } from '@abp/ng.core';
import type { BaseListFilter } from '../models';

export interface CreateUpdateEmployeeDto {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  genderType: GenderType;
  phoneNumber?: string;
  email?: string;
  address?: string;
  departmentId?: string;
  positionId?: string;
  hireDate?: string;
  salary: number;
  status: boolean;
  nationality?: string;
  maritalStatus?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  educationLevel?: string;
  photo: number[];
  bankAccountNumber?: string;
  taxCode?: string;
  socialInsurance?: string;
}

export interface EmployeeDto extends EntityDto<string> {
  code?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  genderType: GenderType;
  phoneNumber?: string;
  email?: string;
  address?: string;
  departmentId?: string;
  positionId?: string;
  hireDate?: string;
  salary: number;
  status: boolean;
  nationality?: string;
  maritalStatus?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  educationLevel?: string;
  photo: number[];
  bankAccountNumber?: string;
  taxCode?: string;
  socialInsurance?: string;
}

export interface EmployeeInListDto extends EntityDto<string> {
  code?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  genderType: GenderType;
  phoneNumber?: string;
  email?: string;
  address?: string;
  departmentId?: string;
  positionId?: string;
  hireDate?: string;
  salary: number;
  status: boolean;
  nationality?: string;
  maritalStatus?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  educationLevel?: string;
  photo: number[];
  bankAccountNumber?: string;
  taxCode?: string;
  socialInsurance?: string;
}

export interface EmployeeListFilter extends BaseListFilter {
  departmentId?: string;
  positionId?: string;
}
