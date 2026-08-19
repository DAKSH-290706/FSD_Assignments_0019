/* ==========================================================================
   MediCare Hospital Management System - Patient Management Module
   ========================================================================== */

const PatientModule = {
  activeSearchQuery: "",
  activeDeptFilter: "ALL",

  init() {
    this.bindEvents();
  },

  bindEvents() {
    const searchInput = document.getElementById("patientSearchInput");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.activeSearchQuery = e.target.value.toLowerCase().trim();
        this.renderTable();
      });
    }

    const deptSelect = document.getElementById("patientDeptFilter");
    if (deptSelect) {
      deptSelect.addEventListener("change", (e) => {
        this.activeDeptFilter = e.target.value;
        this.renderTable();
      });
    }

    const dobInput = document.getElementById("patientDob");
    const ageInput = document.getElementById("patientAge");
    if (dobInput && ageInput) {
      dobInput.addEventListener("change", (e) => {
        ageInput.value = Utils.calculateAge(e.target.value);
      });
    }
  },

  renderTable() {
    const tbody = document.getElementById("patientsTbody");
    if (!tbody) return;

    let patients = StorageService.getData(STORAGE_KEYS.PATIENTS);

    if (this.activeDeptFilter !== "ALL") {
      patients = patients.filter(p => p.department === this.activeDeptFilter);
    }

    if (this.activeSearchQuery) {
      patients = patients.filter(p =>
        p.id.toLowerCase().includes(this.activeSearchQuery) ||
        p.name.toLowerCase().includes(this.activeSearchQuery) ||
        p.phone.includes(this.activeSearchQuery) ||
        (p.email && p.email.toLowerCase().includes(this.activeSearchQuery)) ||
        p.department.toLowerCase().includes(this.activeSearchQuery) ||
        p.bloodGroup.toLowerCase().includes(this.activeSearchQuery)
      );
    }

    if (patients.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7">
            <div class="empty-state">
              <div class="empty-state-title">No Patients Found</div>
              <div class="empty-state-text">No patient records match search criteria.</div>
              <button class="btn btn-primary btn-sm" onclick="PatientModule.openAddModal()">+ Add New Patient</button>
            </div>
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = patients.map(p => `
      <tr>
        <td><strong>${p.id}</strong></td>
        <td>
          <div style="font-weight: 600;">${Utils.escapeHTML(p.name)}</div>
          <div style="font-size: 11px; color: var(--text-muted);">${Utils.escapeHTML(p.email || "-")}</div>
        </td>
        <td>${p.age} yrs (${Utils.escapeHTML(p.gender)})</td>
        <td><span class="badge badge-secondary">${Utils.escapeHTML(p.bloodGroup)}</span></td>
        <td>${Utils.escapeHTML(p.phone)}</td>
        <td>${Utils.escapeHTML(p.department || "General")}</td>
        <td>${Utils.formatDate(p.registeredDate)}</td>
      </tr>
    `).join("");
  },

  openAddModal() {
    const form = document.getElementById("patientForm");
    if (form) form.reset();

    document.getElementById("patientModalTitle").innerText = "Add New Patient";
    document.getElementById("patientIdField").value = StorageService.generateId("PAT", STORAGE_KEYS.PATIENTS);
    document.getElementById("patientRegDate").value = new Date().toISOString().slice(0, 10);

    Utils.openModal("patientModal");
  },

  savePatient(event) {
    event.preventDefault();

    const id = document.getElementById("patientIdField").value.trim();
    const name = document.getElementById("patientName").value.trim();
    const dob = document.getElementById("patientDob").value;
    const age = parseInt(document.getElementById("patientAge").value, 10) || Utils.calculateAge(dob);
    const gender = document.getElementById("patientGender").value;
    const bloodGroup = document.getElementById("patientBloodGroup").value;
    const phone = document.getElementById("patientPhone").value.trim();
    const email = document.getElementById("patientEmail").value.trim();
    const department = document.getElementById("patientDepartment").value;
    const address = document.getElementById("patientAddress").value.trim();
    const emergencyContact = document.getElementById("patientEmergencyName").value.trim();
    const emergencyPhone = document.getElementById("patientEmergencyPhone").value.trim();
    const medicalHistory = document.getElementById("patientMedicalHistory").value.trim();
    const allergies = document.getElementById("patientAllergies").value.trim();
    const registeredDate = document.getElementById("patientRegDate").value;

    if (!name) {
      Utils.showToast("Full Name is required.", "error");
      return;
    }
    if (!phone) {
      Utils.showToast("Phone number is required.", "error");
      return;
    }

    const patientData = {
      id,
      name,
      dob,
      age,
      gender,
      bloodGroup,
      phone,
      email,
      department,
      address,
      emergencyContact,
      emergencyPhone,
      medicalHistory,
      allergies,
      registeredDate
    };

    StorageService.addItem(STORAGE_KEYS.PATIENTS, patientData);
    Utils.showToast(`Patient ${name} added successfully with ID ${id}.`, "success");

    Utils.closeModal("patientModal");
    this.renderTable();
    DashboardModule.render();
  }
};
