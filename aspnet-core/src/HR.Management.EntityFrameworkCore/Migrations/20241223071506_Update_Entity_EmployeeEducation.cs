using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HR.Management.Migrations
{
    public partial class Update_Entity_EmployeeEducation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Degree",
                table: "AppEmployeeEducations");

            migrationBuilder.RenameColumn(
                name: "Institution",
                table: "AppEmployeeEducations",
                newName: "SchoolName");

            migrationBuilder.RenameColumn(
                name: "Grade",
                table: "AppEmployeeEducations",
                newName: "Major");

            migrationBuilder.AddColumn<int>(
                name: "GraduationType",
                table: "AppEmployeeEducations",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Level",
                table: "AppEmployeeEducations",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "GraduationType",
                table: "AppEmployeeEducations");

            migrationBuilder.DropColumn(
                name: "Level",
                table: "AppEmployeeEducations");

            migrationBuilder.RenameColumn(
                name: "SchoolName",
                table: "AppEmployeeEducations",
                newName: "Institution");

            migrationBuilder.RenameColumn(
                name: "Major",
                table: "AppEmployeeEducations",
                newName: "Grade");

            migrationBuilder.AddColumn<string>(
                name: "Degree",
                table: "AppEmployeeEducations",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
