using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HR.Management.Migrations
{
    public partial class UpdateEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Code",
                table: "AppProjects",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Code",
                table: "AppPositions",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "AppEmployees",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Code",
                table: "AppDepartments",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Code",
                table: "AppProjects");

            migrationBuilder.DropColumn(
                name: "Code",
                table: "AppPositions");

            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "AppEmployees");

            migrationBuilder.DropColumn(
                name: "Code",
                table: "AppDepartments");
        }
    }
}
