using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TextilTech.Migrations
{
    /// <inheritdoc />
    public partial class IdentifierSells : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Quantity",
                table: "Sells");

            migrationBuilder.AddColumn<string>(
                name: "Identifier",
                table: "Sells",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Identifier",
                table: "Sells");

            migrationBuilder.AddColumn<int>(
                name: "Quantity",
                table: "Sells",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }
    }
}
