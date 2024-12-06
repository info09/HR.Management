﻿using System;
using Volo.Abp.Application.Dtos;

namespace HR.Management.Departments
{
    public class DepartmentInListDto : EntityDto<Guid>
    {
        public string Name { get; set; }
        public string Location { get; set; }
    }
}