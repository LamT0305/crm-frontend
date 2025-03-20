import * as XLSX from "xlsx";

export const exportToExcel = (deal) => {
  const workbook = XLSX.utils.book_new();

  const quotationData = [
    ["Quotation Details"],
    [""],
    ["Customer Information"],
    ["Name", `${deal.customerId.firstName} ${deal.customerId.lastName}`],
    ["Email", deal.customerId.email],
    ["Phone", deal.customerId.phone],
    [""],
    ["Products"],
    ["Name", "Category", "Unit", "Price", "Quantity", "Total"],
    ...deal.products.map((product) => [
      product.productId.name,
      product.productId.category,
      product.productId.unit,
      `$${product.productId.price}`,
      product.quantity,
      `$${product.productId.price * product.quantity}`,
    ]),
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
  ];

  const worksheet = XLSX.utils.aoa_to_sheet(quotationData);
  XLSX.utils.book_append_sheet(workbook, worksheet, "Quotation");

  // Auto-size columns
  const maxWidth = quotationData.reduce((w, r) => Math.max(w, r.length), 0);
  const wscols = Array(maxWidth).fill({ wch: 15 });
  worksheet["!cols"] = wscols;

  // Save file
  XLSX.writeFile(workbook, `Quotation-${deal._id}.xlsx`);
};
