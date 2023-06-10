using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyBackend.Migrations
{
    /// <inheritdoc />
    public partial class AddedAdminMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Adress", "ConfirmPassword", "DateOfBirth", "Email", "Name", "Password", "PhotoPath", "Surname", "Type", "UserName" },
                values: new object[] { 2L, "GLjub", "$2a$11$HP5NFJSLtdezTXt5Yi4vIe2n9KkY88gtIN38RbDVcxj.XwQEhrJmm", new DateTime(2023, 6, 10, 3, 53, 28, 368, DateTimeKind.Local).AddTicks(1435), "kaca@gmail.com", "Ana", "$2a$11$F6pOw/sr4H6y32ejwicGiuiyU3/KwvZqjdBgz8xwdGzuY7Kboh4ye", null, "Anic", "Admin", "Kaca" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2L);
        }
    }
}
