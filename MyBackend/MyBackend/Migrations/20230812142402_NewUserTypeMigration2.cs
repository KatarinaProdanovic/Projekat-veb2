using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyBackend.Migrations
{
    /// <inheritdoc />
    public partial class NewUserTypeMigration2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "UserName",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "ConfirmPassword", "DateOfBirth", "Password" },
                values: new object[] { "$2a$11$4y5K8vBX4N9G2JoqyxPY3uddfv5cqNzDp1yjsEvnsSt0xSLIDITuW", new DateTime(2023, 8, 12, 16, 24, 2, 241, DateTimeKind.Local).AddTicks(3780), "$2a$11$icPA4CWH3EoypUGfkNfDaedxQl1fpSGQrnHOxUxD3bOYI3UbUtuR6" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "UserName",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "ConfirmPassword", "DateOfBirth", "Password" },
                values: new object[] { "$2a$11$CchdC8MLhsiWW1a/BpIvDuci4.Kgw9u5uGvoXpOvcv7EkmU752Csi", new DateTime(2023, 8, 12, 16, 23, 17, 828, DateTimeKind.Local).AddTicks(5909), "$2a$11$0j0.L8EgJs72STnSeEoAYOLWM8f9yAFzArFVwwg.aviSvxHT6WVcS" });
        }
    }
}
