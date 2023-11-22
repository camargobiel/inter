using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TextilTech.Migrations
{
    /// <inheritdoc />
    public partial class ProductFieldsNew : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "NCM",
                table: "Products",
                type: "character varying(8)",
                maxLength: 8,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Reference",
                table: "Products",
                type: "character varying(255)",
                maxLength: 255,
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NCM",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "Reference",
                table: "Products");
        }
    }
}
