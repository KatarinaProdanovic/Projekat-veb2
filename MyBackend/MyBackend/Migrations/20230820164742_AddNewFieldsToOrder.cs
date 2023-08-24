using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyBackend.Migrations
{
    /// <inheritdoc />
    public partial class AddNewFieldsToOrder : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsCenceled",
                table: "Orders",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "Price",
                table: "Orders",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "ConfirmPassword", "DateOfBirth", "Password" },
                values: new object[] { "$2a$11$e2ewBrZj98oYEk6F6XvKiuaeEZyF0Hjch/PT72.bknizU0d0zZ6sO", new DateTime(2023, 8, 20, 18, 47, 41, 694, DateTimeKind.Local).AddTicks(9162), "$2a$11$UvFWTSn8j3qgO9/9beBOVOQbQOINh7EIqJhKLHRz2sOkzdIYylkbi" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsCenceled",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "Price",
                table: "Orders");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "ConfirmPassword", "DateOfBirth", "Password" },
                values: new object[] { "$2a$11$4y5K8vBX4N9G2JoqyxPY3uddfv5cqNzDp1yjsEvnsSt0xSLIDITuW", new DateTime(2023, 8, 12, 16, 24, 2, 241, DateTimeKind.Local).AddTicks(3780), "$2a$11$icPA4CWH3EoypUGfkNfDaedxQl1fpSGQrnHOxUxD3bOYI3UbUtuR6" });
        }
    }
}
