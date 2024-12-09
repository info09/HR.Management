using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HR.Management.Migrations
{
    public partial class UpdateEntity_Code_Table_Employee : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Code",
                table: "AppEmployees",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Code",
                table: "AppEmployees");
        }
    }
}
