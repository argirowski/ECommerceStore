using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class ChangingTheNamesOfStripeFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ShippingAddress_LineTwo",
                table: "Orders",
                newName: "ShippingAddress_Line2");

            migrationBuilder.RenameColumn(
                name: "ShippingAddress_LineOne",
                table: "Orders",
                newName: "ShippingAddress_Line1");

            migrationBuilder.RenameColumn(
                name: "PaymentSummary_LastFor",
                table: "Orders",
                newName: "PaymentSummary_Last4");

            migrationBuilder.RenameColumn(
                name: "LineTwo",
                table: "Address",
                newName: "Line2");

            migrationBuilder.RenameColumn(
                name: "LineOne",
                table: "Address",
                newName: "Line1");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ShippingAddress_Line2",
                table: "Orders",
                newName: "ShippingAddress_LineTwo");

            migrationBuilder.RenameColumn(
                name: "ShippingAddress_Line1",
                table: "Orders",
                newName: "ShippingAddress_LineOne");

            migrationBuilder.RenameColumn(
                name: "PaymentSummary_Last4",
                table: "Orders",
                newName: "PaymentSummary_LastFor");

            migrationBuilder.RenameColumn(
                name: "Line2",
                table: "Address",
                newName: "LineTwo");

            migrationBuilder.RenameColumn(
                name: "Line1",
                table: "Address",
                newName: "LineOne");
        }
    }
}
