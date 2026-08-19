/* ==========================================================================
   MediCare Hospital Management System - Utilities & Helpers
   ========================================================================== */

const Utils = {
  /**
   * Format Indian Rupee Currency ₹
   */
  formatCurrency(amount) {
    const num = parseFloat(amount) || 0;
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(num);
  },

  /**
   * Format YYYY-MM-DD date into readable string (e.g., "18 Aug 2026")
   */
  formatDate(dateStr) {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  },

  /**
   * Format ISO date-time into readable format
   */
  formatDateTime(dateTimeStr) {
    if (!dateTimeStr) return "-";
    const date = new Date(dateTimeStr);
    if (isNaN(date.getTime())) return dateTimeStr;
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit"
    });
  },

  /**
   * Calculate exact Age from Date of Birth (YYYY-MM-DD)
   */
  calculateAge(dobStr) {
    if (!dobStr) return 0;
    const dob = new Date(dobStr);
    if (isNaN(dob.getTime())) return 0;
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age >= 0 ? age : 0;
  },

  /**
   * Display Toast Notification (Clean text without emojis)
   */
  showToast(message, type = "success", title = "") {
    const container = document.getElementById("toastContainer");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;

    let defaultTitle = "Success";

    if (type === "error") {
      defaultTitle = "Error";
    } else if (type === "warning") {
      defaultTitle = "Warning";
    } else if (type === "info") {
      defaultTitle = "Notice";
    }

    toast.innerHTML = `
      <div class="toast-content">
        <h4>${title || defaultTitle}</h4>
        <p>${this.escapeHTML(message)}</p>
      </div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(100%)";
      toast.style.transition = "all 0.3s ease";
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  },

  /**
   * Open Modal Container by ID
   */
  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  },

  /**
   * Close Modal Container by ID
   */
  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove("active");
      document.body.style.overflow = "";
    }
  },

  /**
   * Escape HTML string to prevent XSS
   */
  escapeHTML(str) {
    if (typeof str !== "string") return str;
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  },

  /**
   * Export Array of Objects to downloadable CSV file
   */
  exportToCSV(filename, headers, dataRows) {
    if (!dataRows || !dataRows.length) {
      this.showToast("No data available to export.", "warning");
      return;
    }

    const csvLines = [];
    csvLines.push(headers.join(","));

    dataRows.forEach(row => {
      const line = row.map(val => {
        const escaped = ("" + (val ?? "")).replace(/"/g, '""');
        return `"${escaped}"`;
      }).join(",");
      csvLines.push(line);
    });

    const csvContent = "data:text/csv;charset=utf-8," + csvLines.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${filename}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    this.showToast(`Exported ${dataRows.length} records to ${filename}.csv`, "success");
  }
};
