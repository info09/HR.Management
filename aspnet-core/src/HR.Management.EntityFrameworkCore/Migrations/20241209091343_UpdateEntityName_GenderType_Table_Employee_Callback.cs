using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HR.Management.Migrations
{
    public partial class UpdateEntityName_GenderType_Table_Employee_Callback : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "GenderTypes",
                table: "AppEmployees",
                newName: "GenderType");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "GenderType",
                table: "AppEmployees",
                newName: "GenderTypes");
        }
    }
}
