import ExcelJS from "exceljs";

export const exportToExcel = async (deal) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Quotation");

  // Add data
  worksheet.addRows([
    ["Quotation Details"],
    [""],
    ["Customer Information"],
    ["Name", `${deal.customerId.firstName} ${deal.customerId.lastName}`],
    ["Email", deal.customerId.email],
    ["Phone", deal.customerId.phone],
    [""],
    ["Products"],
    ["Name", "Category", "Unit", "Price", "Quantity", "Total"],
  ]);

  // Add product rows
  deal.products.forEach((product) => {
    worksheet.addRow([
      product.productId.name,
      product.productId.category,
      product.productId.unit,
      `$${product.productId.price}`,
      product.quantity,
      `$${product.productId.price * product.quantity}`,
    ]);
  });

  // Add summary
  worksheet.addRows([
    [""],
    ["Summary"],
    ["Total Price", `$${deal.quotationId.totalPrice}`],
    ["Discount Type", deal.quotationId.discount.type],
    [
      "Discount Value",
      `${deal.quotationId.discount.type === "fixed" ? "$" : ""}${
        deal.quotationId.discount.value
      }${deal.quotationId.discount.type === "percentage" ? "%" : ""}`,
    ],
    ["Final Price", `$${deal.quotationId.finalPrice}`],
    [""],
    ["Created Date", new Date(deal.createdAt).toLocaleDateString()],
  ]);

  // Auto-fit columns
  worksheet.columns.forEach((column) => {
    column.width = 15;
  });

  // Save file
  await workbook.xlsx.writeFile(`Quotation-${deal._id}.xlsx`);
};
