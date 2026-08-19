/* ==========================================================================
   MediCare Hospital Management System - Medical Records Module
   ========================================================================== */

const MedicalRecordModule = {
  activeSearchQuery: "",

  init() {
    this.bindEvents();
  },

  bindEvents() {
    const searchInput = document.getElementById("recordSearchInput");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.activeSearchQuery = e.target.value.toLowerCase().trim();
        this.renderTable();
      });
    }
  },

  renderTable() {
    const tbody = document.getElementById("recordsTbody");
    if (!tbody) return;

    let records = StorageService.getData(STORAGE_KEYS.RECORDS);

    if (this.activeSearchQuery) {
      records = records.filter(r =>
        r.id.toLowerCase().includes(this.activeSearchQuery) ||
        r.patientName.toLowerCase().includes(this.activeSearchQuery) ||
        r.doctorName.toLowerCase().includes(this.activeSearchQuery) ||
        r.diagnosis.toLowerCase().includes(this.activeSearchQuery) ||
        r.symptoms.toLowerCase().includes(this.activeSearchQuery)
      );
    }

    if (records.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6">
            <div class="empty-state">
              <div class="empty-state-title">No Medical Records</div>
              <div class="empty-state-text">No clinical records found matching search query.</div>
              <button class="btn btn-primary btn-sm" onclick="MedicalRecordModule.openAddModal()">+ Add Medical Record</button>
            </div>
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = records.map(r => `
      <tr>
        <td><strong>${r.id}</strong></td>
        <td><strong>${Utils.escapeHTML(r.patientName)}</strong></td>
        <td>${Utils.escapeHTML(r.doctorName)}</td>
        <td>${Utils.formatDate(r.visitDate)}</td>
        <td><span class="badge badge-info">${Utils.escapeHTML(r.diagnosis)}</span></td>
        <td>${Utils.formatDate(r.followUpDate)}</td>
      </tr>
    `).join("");
  },

  openAddModal() {
    const form = document.getElementById("recordForm");
    if (form) form.reset();

    document.getElementById("recordIdField").value = StorageService.generateId("REC", STORAGE_KEYS.RECORDS);
    document.getElementById("recordVisitDate").value = new Date().toISOString().slice(0, 10);

    const patientSelect = document.getElementById("recordPatient");
    if (patientSelect) {
      const patients = StorageService.getData(STORAGE_KEYS.PATIENTS);
      patientSelect.innerHTML = patients.map(p => `
        <option value="${p.id}">${Utils.escapeHTML(p.name)} (${p.id})</option>
      `).join("");
    }

    const doctorSelect = document.getElementById("recordDoctor");
    if (doctorSelect) {
      const doctors = StorageService.getData(STORAGE_KEYS.DOCTORS);
      doctorSelect.innerHTML = doctors.map(d => `
        <option value="${d.id}">${Utils.escapeHTML(d.name)} (${Utils.escapeHTML(d.specialization)})</option>
      `).join("");
    }

    Utils.openModal("recordModal");
  },

  saveRecord(event) {
    event.preventDefault();

    const id = document.getElementById("recordIdField").value.trim();
    const patientId = document.getElementById("recordPatient").value;
    const doctorId = document.getElementById("recordDoctor").value;
    const visitDate = document.getElementById("recordVisitDate").value;
    const symptoms = document.getElementById("recordSymptoms").value.trim();
    const diagnosis = document.getElementById("recordDiagnosis").value.trim();
    const treatment = document.getElementById("recordTreatment").value.trim();
    const doctorNotes = document.getElementById("recordNotes").value.trim();
    const followUpDate = document.getElementById("recordFollowUp").value;

    if (!diagnosis || !symptoms) {
      Utils.showToast("Symptoms and Diagnosis are required.", "error");
      return;
    }

    const patient = StorageService.getItemById(STORAGE_KEYS.PATIENTS, patientId);
    const doctor = StorageService.getItemById(STORAGE_KEYS.DOCTORS, doctorId);

    const recordData = {
      id,
      patientId,
      patientName: patient ? patient.name : "Unknown",
      doctorId,
      doctorName: doctor ? doctor.name : "Unknown",
      visitDate,
      symptoms,
      diagnosis,
      treatment,
      doctorNotes,
      followUpDate
    };

    StorageService.addItem(STORAGE_KEYS.RECORDS, recordData);
    Utils.showToast(`Medical record ${id} saved.`, "success");

    Utils.closeModal("recordModal");
    this.renderTable();
  }
};
