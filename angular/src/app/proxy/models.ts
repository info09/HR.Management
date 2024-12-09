import type { PagedResultRequestDto } from '@abp/ng.core';

export interface BaseListFilter extends PagedResultRequestDto {
  keyword?: string;
}
