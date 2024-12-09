﻿using System;

namespace HR.Management.Employees
{
    public class CreateUpdateEmployeeDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public GenderType GenderType { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public Guid DepartmentId { get; set; }
        public Guid PositionId { get; set; }
        public DateTime HireDate { get; set; }
        public decimal Salary { get; set; }
        public bool Status { get; set; }
        public string Nationality { get; set; }
        public string MaritalStatus { get; set; }
        public string EmergencyContact { get; set; }
        public string EmergencyPhone { get; set; }
        public string EducationLevel { get; set; }
        public string ThumbnailPictureName { get; set; }
        public string ThumbnailPictureContent { get; set; }
        public string BankAccountNumber { get; set; }
        public string TaxCode { get; set; }
        public string SocialInsurance { get; set; }
    }
}
