/* ==========================================================================
   MediCare Hospital Management System - Billing & Financials Module
   ========================================================================== */

const BillingModule = {
  activeSearchQuery: "",
  activeStatusFilter: "ALL",

  init() {
    this.bindEvents();
  },

  bindEvents() {
    const searchInput = document.getElementById("billingSearchInput");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.activeSearchQuery = e.target.value.toLowerCase().trim();
        this.renderTable();
      });
    }

    const statusFilter = document.getElementById("billingStatusFilter");
    if (statusFilter) {
      statusFilter.addEventListener("change", (e) => {
        this.activeStatusFilter = e.target.value;
        this.renderTable();
      });
    }

    const calcInputs = ["billConsultation", "billLab", "billMedicine", "billRoom", "billOther", "billTax", "billDiscount"];
    calcInputs.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener("input", () => this.calculateTotals());
      }
    });
  },

  renderTable() {
    const tbody = document.getElementById("billingTbody");
    if (!tbody) return;

    let bills = StorageService.getData(STORAGE_KEYS.BILLS);

    if (this.activeStatusFilter !== "ALL") {
      bills = bills.filter(b => b.paymentStatus === this.activeStatusFilter);
    }

    if (this.activeSearchQuery) {
      bills = bills.filter(b =>
        b.id.toLowerCase().includes(this.activeSearchQuery) ||
        b.patientName.toLowerCase().includes(this.activeSearchQuery) ||
        b.paymentMethod.toLowerCase().includes(this.activeSearchQuery)
      );
    }

    if (bills.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6">
            <div class="empty-state">
              <div class="empty-state-title">No Invoices Found</div>
              <div class="empty-state-text">No billing records match criteria.</div>
              <button class="btn btn-primary btn-sm" onclick="BillingModule.openAddModal()">+ Generate New Bill</button>
            </div>
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = bills.map(b => {
      let badgeClass = "badge-secondary";
      if (b.paymentStatus === "Paid") badgeClass = "badge-success";
      else if (b.paymentStatus === "Pending") badgeClass = "badge-warning";
      else if (b.paymentStatus === "Partially Paid") badgeClass = "badge-info";
      else if (b.paymentStatus === "Cancelled") badgeClass = "badge-danger";

      return `
        <tr>
          <td><strong>${b.id}</strong></td>
          <td><strong>${Utils.escapeHTML(b.patientName)}</strong></td>
          <td>${Utils.formatDate(b.date)}</td>
          <td><strong>${Utils.formatCurrency(b.total)}</strong></td>
          <td>${Utils.escapeHTML(b.paymentMethod || "Cash")}</td>
          <td>
            <span class="badge ${badgeClass}">${b.paymentStatus}</span>
          </td>
        </tr>
      `;
    }).join("");
  },

  openAddModal() {
    const form = document.getElementById("billingForm");
    if (form) form.reset();

    document.getElementById("billIdField").value = StorageService.generateId("BILL", STORAGE_KEYS.BILLS);
    document.getElementById("billDate").value = new Date().toISOString().slice(0, 10);

    const patientSelect = document.getElementById("billPatient");
    if (patientSelect) {
      patientSelect.innerHTML = StorageService.getData(STORAGE_KEYS.PATIENTS).map(p => `
        <option value="${p.id}">${Utils.escapeHTML(p.name)} (${p.id})</option>
      `).join("");
    }

    this.calculateTotals();
    Utils.openModal("billingModal");
  },

  calculateTotals() {
    const consultation = parseFloat(document.getElementById("billConsultation")?.value) || 0;
    const lab = parseFloat(document.getElementById("billLab")?.value) || 0;
    const medicine = parseFloat(document.getElementById("billMedicine")?.value) || 0;
    const room = parseFloat(document.getElementById("billRoom")?.value) || 0;
    const other = parseFloat(document.getElementById("billOther")?.value) || 0;

    const subtotal = consultation + lab + medicine + room + other;

    const taxPct = parseFloat(document.getElementById("billTax")?.value) || 0;
    const discount = parseFloat(document.getElementById("billDiscount")?.value) || 0;

    const taxAmount = (subtotal * taxPct) / 100;
    const total = Math.max(0, subtotal + taxAmount - discount);

    const subtotalEl = document.getElementById("billSubtotalDisplay");
    const totalEl = document.getElementById("billTotalDisplay");

    if (subtotalEl) subtotalEl.innerText = Utils.formatCurrency(subtotal);
    if (totalEl) totalEl.innerText = Utils.formatCurrency(total);
  },

  saveBill(event) {
    event.preventDefault();

    const id = document.getElementById("billIdField").value.trim();
    const patientId = document.getElementById("billPatient").value;
    const date = document.getElementById("billDate").value;

    const consultationFee = parseFloat(document.getElementById("billConsultation").value) || 0;
    const labCharges = parseFloat(document.getElementById("billLab").value) || 0;
    const medicineCharges = parseFloat(document.getElementById("billMedicine").value) || 0;
    const roomCharges = parseFloat(document.getElementById("billRoom").value) || 0;
    const otherCharges = parseFloat(document.getElementById("billOther").value) || 0;

    const taxPct = parseFloat(document.getElementById("billTax").value) || 0;
    const discount = parseFloat(document.getElementById("billDiscount").value) || 0;

    const subtotal = consultationFee + labCharges + medicineCharges + roomCharges + otherCharges;
    const taxAmount = (subtotal * taxPct) / 100;
    const total = Math.max(0, subtotal + taxAmount - discount);

    const paymentMethod = document.getElementById("billPaymentMethod").value;
    const paymentStatus = document.getElementById("billPaymentStatus").value;

    const patient = StorageService.getItemById(STORAGE_KEYS.PATIENTS, patientId);

    const billData = {
      id,
      patientId,
      patientName: patient ? patient.name : "Unknown",
      date,
      consultationFee,
      labCharges,
      medicineCharges,
      roomCharges,
      otherCharges,
      tax: taxAmount,
      discount,
      total,
      paymentMethod,
      paymentStatus
    };

    StorageService.addItem(STORAGE_KEYS.BILLS, billData);
    Utils.showToast(`Bill ${id} generated.`, "success");

    Utils.closeModal("billingModal");
    this.renderTable();
    DashboardModule.render();
  },

  printInvoice() {
    window.print();
  }
};
