import ExcelJS from "exceljs";

export const exportToExcel = async (deal) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Quotation");

  // Set column widths
  worksheet.columns = [
    { width: 20 },
    { width: 30 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
  ];

  // Header styles
  const headerStyle = {
    font: { bold: true, size: 14 },
    fill: {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFE0E0E0" },
    },
    alignment: { horizontal: "left" },
  };

  // Add title
  worksheet.addRow(["Quotation Details"]).font = { bold: true, size: 16 };
  worksheet.addRow([]);

  // Customer Information
  worksheet.addRow(["Customer Information"]).font = { bold: true, size: 14 };
  worksheet.addRow([
    "Name",
    `${deal.customerId.firstName} ${deal.customerId.lastName}`,
  ]);
  worksheet.addRow(["Email", deal.customerId.email]);
  worksheet.addRow(["Phone", deal.customerId.phone]);
  worksheet.addRow([]);

  // Products header
  const productsHeader = worksheet.addRow([
    "Name",
    "Category",
    "Unit",
    "Price",
    "Quantity",
    "Total",
  ]);
  productsHeader.eachCell((cell) => {
    cell.font = { bold: true };
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFE0E0E0" },
    };
  });

  // Add product rows
  deal.products.forEach((product) => {
    const row = worksheet.addRow([
      product.productId.name,
      product.productId.category.name,
      product.productId.unit,
      product.productId.price,
      product.quantity,
      product.productId.price * product.quantity,
    ]);

    // Format currency cells
    row.getCell(4).numFmt = '"$"#,##0.00';
    row.getCell(6).numFmt = '"$"#,##0.00';
  });

  worksheet.addRow([]);

  // Summary section
  worksheet.addRow(["Summary"]).font = { bold: true, size: 14 };

  const summaryRows = [
    ["Total Price", deal.quotationId.totalPrice],
    ["Discount Type", deal.quotationId.discount.type],
    [
      "Discount Value",
      deal.quotationId.discount.type === "fixed"
        ? deal.quotationId.discount.value
        : `${deal.quotationId.discount.value}%`,
    ],
    ["Final Price", deal.quotationId.finalPrice],
  ];

  summaryRows.forEach((row) => {
    const newRow = worksheet.addRow(row);
    newRow.getCell(1).font = { bold: true };
    if (row[0].includes("Price")) {
      newRow.getCell(2).numFmt = '"$"#,##0.00';
    }
    if (
      row[0].includes("Discount Value") &&
      deal.quotationId.discount.type === "fixed"
    ) {
      newRow.getCell(2).numFmt = '"$"#,##0.00';
    }
  });

  worksheet.addRow([]);
  const dateRow = worksheet.addRow([
    "Created Date",
    new Date(deal.createdAt).toLocaleDateString(),
  ]);
  dateRow.getCell(1).font = { bold: true };

  // Create buffer and trigger download
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `Quotation-${deal._id}.xlsx`;
  link.click();
  window.URL.revokeObjectURL(url);
};
