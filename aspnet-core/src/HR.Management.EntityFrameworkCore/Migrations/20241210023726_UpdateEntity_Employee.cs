using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HR.Management.Migrations
{
    public partial class UpdateEntity_Employee : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "AppEmployees");

            migrationBuilder.DropColumn(
                name: "Photo",
                table: "AppEmployees");

            migrationBuilder.RenameColumn(
                name: "EmergencyPhone",
                table: "AppEmployees",
                newName: "ThumbnailPicture");

            migrationBuilder.RenameColumn(
                name: "EmergencyContact",
                table: "AppEmployees",
                newName: "CivilId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ThumbnailPicture",
                table: "AppEmployees",
                newName: "EmergencyPhone");

            migrationBuilder.RenameColumn(
                name: "CivilId",
                table: "AppEmployees",
                newName: "EmergencyContact");

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "AppEmployees",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<byte[]>(
                name: "Photo",
                table: "AppEmployees",
                type: "varbinary(max)",
                nullable: true);
        }
    }
}
