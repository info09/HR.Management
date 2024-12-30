import { mapEnumToOptions } from '@abp/ng.core';

export enum EducationLevel {
  None = 1,
  HighSchool = 2,
  Associate = 3,
  Bachelor = 4,
  Master = 5,
  Doctorate = 6,
}

export const educationLevelOptions = mapEnumToOptions(EducationLevel);
