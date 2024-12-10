using System;

using Volo.Abp.Domain.Entities.Auditing;

namespace HR.Management.Employees
{
    public class Employee : FullAuditedAggregateRoot<Guid>
    {
        public Employee(Guid id, string code, string firstName, string lastName, string civilId, DateTime dateOfBirth, GenderType genderType, string phoneNumber, string email, string address, Guid departmentId, string departmentName, Guid positionId, string positionName, DateTime hireDate, decimal salary, string nationality, string maritalStatus, string educationLevel, string thumbnailPicture, string bankAccountNumber, string taxCode, string socialInsurance)
        {
            Id = id;
            Code = code;
            FirstName = firstName;
            LastName = lastName;
            CivilId = civilId;
            DateOfBirth = dateOfBirth;
            GenderType = genderType;
            PhoneNumber = phoneNumber;
            Email = email;
            Address = address;
            DepartmentId = departmentId;
            DepartmentName = departmentName;
            PositionId = positionId;
            PositionName = positionName;
            HireDate = hireDate;
            Salary = salary;
            Nationality = nationality;
            MaritalStatus = maritalStatus;
            EducationLevel = educationLevel;
            ThumbnailPicture = thumbnailPicture;
            BankAccountNumber = bankAccountNumber;
            TaxCode = taxCode;
            SocialInsurance = socialInsurance;
        }

        public string Code { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string CivilId { get; set; }
        public DateTime DateOfBirth { get; set; }
        public GenderType GenderType { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public Guid DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public Guid PositionId { get; set; }
        public string PositionName { get; set; }
        public DateTime HireDate { get; set; }
        public decimal Salary { get; set; }
        public bool Status { get; set; }
        public string Nationality { get; set; }
        public string MaritalStatus { get; set; }
        public string EducationLevel { get; set; }
        public string ThumbnailPicture { get; set; }
        public string BankAccountNumber { get; set; }
        public string TaxCode { get; set; }
        public string SocialInsurance { get; set; }
    }
}
