using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HR.Management.Migrations
{
    public partial class UpdateEntityName_GenderType_Table_Employee : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Gender",
                table: "AppEmployees",
                newName: "GenderTypes");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "GenderTypes",
                table: "AppEmployees",
                newName: "Gender");
        }
    }
}
