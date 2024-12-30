import { mapEnumToOptions } from '@abp/ng.core';

export enum GraduationType {
  None = 1,
  Diploma = 2,
  Certificate = 3,
  Associate = 4,
  Bachelor = 5,
  Master = 6,
  Doctorate = 7,
}

export const graduationTypeOptions = mapEnumToOptions(GraduationType);
