import { jsPDF } from "jspdf";

export const generateCertificate = (studentName: string, courseTitle: string) => {
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  const width = doc.internal.pageSize.getWidth();
  const height = doc.internal.pageSize.getHeight();

  // Background
  doc.setFillColor(250, 250, 250);
  doc.rect(0, 0, width, height, "F");

  // Border
  doc.setDrawColor(16, 185, 129); // Emerald 500
  doc.setLineWidth(5);
  doc.rect(10, 10, width - 20, height - 20, "D");

  doc.setDrawColor(15, 23, 42); // Slate 900
  doc.setLineWidth(1);
  doc.rect(15, 15, width - 30, height - 30, "D");

  // Content
  doc.setTextColor(15, 23, 42);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(40);
  doc.text("CERTIFICATE", width / 2, 50, { align: "center" });

  doc.setFontSize(20);
  doc.setFont("helvetica", "normal");
  doc.text("OF COMPLETION", width / 2, 65, { align: "center" });

  doc.setFontSize(16);
  doc.text("This is to certify that", width / 2, 90, { align: "center" });

  doc.setFontSize(30);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(16, 185, 129);
  doc.text(studentName.toUpperCase(), width / 2, 110, { align: "center" });

  doc.setTextColor(15, 23, 42);
  doc.setFontSize(16);
  doc.setFont("helvetica", "normal");
  doc.text("has successfully completed the course", width / 2, 130, { align: "center" });

  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text(courseTitle, width / 2, 150, { align: "center" });

  doc.setFontSize(14);
  doc.setFont("helvetica", "normal");
  const date = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  doc.text(`Issued on ${date}`, width / 2, 170, { align: "center" });

  // Signature lines
  doc.setDrawColor(15, 23, 42);
  doc.setLineWidth(0.5);
  doc.line(50, 190, 110, 190);
  doc.line(width - 110, 190, width - 50, 190);

  doc.setFontSize(10);
  doc.text("Course Instructor", 80, 195, { align: "center" });
  doc.text("Academy Director", width - 80, 195, { align: "center" });

  // Logo placeholder or text
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(16, 185, 129);
  doc.text("AKSHARAM ACADEMY", width / 2, 30, { align: "center" });

  doc.save(`${studentName.replace(/\s+/g, "_")}_${courseTitle.replace(/\s+/g, "_")}_Certificate.pdf`);
};
