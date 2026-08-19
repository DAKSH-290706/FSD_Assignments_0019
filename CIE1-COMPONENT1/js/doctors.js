/* ==========================================================================
   MediCare Hospital Management System - Doctor Management Module
   ========================================================================== */

const DoctorModule = {
  activeSearchQuery: "",
  activeDeptFilter: "ALL",

  init() {
    this.bindEvents();
  },

  bindEvents() {
    const searchInput = document.getElementById("doctorSearchInput");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.activeSearchQuery = e.target.value.toLowerCase().trim();
        this.renderTable();
      });
    }

    const deptFilter = document.getElementById("doctorDeptFilter");
    if (deptFilter) {
      deptFilter.addEventListener("change", (e) => {
        this.activeDeptFilter = e.target.value;
        this.renderTable();
      });
    }
  },

  renderTable() {
    const tbody = document.getElementById("doctorsTbody");
    if (!tbody) return;

    let doctors = StorageService.getData(STORAGE_KEYS.DOCTORS);

    if (this.activeDeptFilter !== "ALL") {
      doctors = doctors.filter(d => d.department === this.activeDeptFilter);
    }

    if (this.activeSearchQuery) {
      doctors = doctors.filter(d =>
        d.id.toLowerCase().includes(this.activeSearchQuery) ||
        d.name.toLowerCase().includes(this.activeSearchQuery) ||
        d.specialization.toLowerCase().includes(this.activeSearchQuery) ||
        d.department.toLowerCase().includes(this.activeSearchQuery) ||
        d.phone.includes(this.activeSearchQuery)
      );
    }

    if (doctors.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="8">
            <div class="empty-state">
              <div class="empty-state-title">No Doctors Found</div>
              <div class="empty-state-text">No doctor entries match search criteria.</div>
              <button class="btn btn-primary btn-sm" onclick="DoctorModule.openAddModal()">+ Add New Doctor</button>
            </div>
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = doctors.map(d => `
      <tr>
        <td><strong>${d.id}</strong></td>
        <td>
          <div style="font-weight: 600; color: var(--primary);">${Utils.escapeHTML(d.name)}</div>
          <div style="font-size: 11px; color: var(--text-muted);">${Utils.escapeHTML(d.qualification || "-")}</div>
        </td>
        <td>${Utils.escapeHTML(d.specialization)}</td>
        <td><span class="badge badge-info">${Utils.escapeHTML(d.department)}</span></td>
        <td>${Utils.escapeHTML(d.experience)}</td>
        <td><strong>${Utils.formatCurrency(d.fee)}</strong></td>
        <td>
          <div style="font-size: 12px; font-weight: 500;">${Utils.escapeHTML(d.availableDays)}</div>
          <div style="font-size: 11px; color: var(--text-muted);">${Utils.escapeHTML(d.availableTime)}</div>
        </td>
        <td>
          <span class="badge ${d.status === 'Active' ? 'badge-success' : 'badge-danger'}">
            ${Utils.escapeHTML(d.status || 'Active')}
          </span>
        </td>
      </tr>
    `).join("");
  },

  openAddModal() {
    const form = document.getElementById("doctorForm");
    if (form) form.reset();

    document.getElementById("doctorModalTitle").innerText = "Add New Doctor";
    document.getElementById("doctorIdField").value = StorageService.generateId("DOC", STORAGE_KEYS.DOCTORS);

    Utils.openModal("doctorModal");
  },

  saveDoctor(event) {
    event.preventDefault();

    const id = document.getElementById("doctorIdField").value.trim();
    const name = document.getElementById("doctorName").value.trim();
    const specialization = document.getElementById("doctorSpecialization").value.trim();
    const department = document.getElementById("doctorDepartment").value;
    const qualification = document.getElementById("doctorQualification").value.trim();
    const experience = document.getElementById("doctorExperience").value.trim();
    const phone = document.getElementById("doctorPhone").value.trim();
    const email = document.getElementById("doctorEmail").value.trim();
    const fee = parseFloat(document.getElementById("doctorFee").value) || 500;
    const availableDays = document.getElementById("doctorAvailableDays").value.trim();
    const availableTime = document.getElementById("doctorAvailableTime").value.trim();
    const status = document.getElementById("doctorStatus").value;

    if (!name || !specialization || !phone) {
      Utils.showToast("Please fill in Doctor Name, Specialization, and Phone.", "error");
      return;
    }

    const doctorData = {
      id,
      name,
      specialization,
      department,
      qualification,
      experience,
      phone,
      email,
      fee,
      availableDays,
      availableTime,
      status
    };

    StorageService.addItem(STORAGE_KEYS.DOCTORS, doctorData);
    Utils.showToast(`Doctor ${name} added with ID ${id}.`, "success");

    Utils.closeModal("doctorModal");
    this.renderTable();
    DashboardModule.render();
  }
};
