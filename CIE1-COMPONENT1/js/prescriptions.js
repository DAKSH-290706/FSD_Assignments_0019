/* ==========================================================================
   MediCare Hospital Management System - Prescriptions Module
   ========================================================================== */

const PrescriptionModule = {
  activeSearchQuery: "",

  init() {
    this.bindEvents();
  },

  bindEvents() {
    const searchInput = document.getElementById("prescriptionSearchInput");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.activeSearchQuery = e.target.value.toLowerCase().trim();
        this.renderTable();
      });
    }
  },

  renderTable() {
    const tbody = document.getElementById("prescriptionsTbody");
    if (!tbody) return;

    let prescriptions = StorageService.getData(STORAGE_KEYS.PRESCRIPTIONS);

    if (this.activeSearchQuery) {
      prescriptions = prescriptions.filter(p =>
        p.id.toLowerCase().includes(this.activeSearchQuery) ||
        p.patientName.toLowerCase().includes(this.activeSearchQuery) ||
        p.doctorName.toLowerCase().includes(this.activeSearchQuery)
      );
    }

    if (prescriptions.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="5">
            <div class="empty-state">
              <div class="empty-state-title">No Prescriptions</div>
              <div class="empty-state-text">No prescription entries match search.</div>
              <button class="btn btn-primary btn-sm" onclick="PrescriptionModule.openAddModal()">+ Create Prescription</button>
            </div>
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = prescriptions.map(pr => `
      <tr>
        <td><strong>${pr.id}</strong></td>
        <td><strong>${Utils.escapeHTML(pr.patientName)}</strong></td>
        <td>${Utils.escapeHTML(pr.doctorName)}</td>
        <td>${Utils.formatDate(pr.date)}</td>
        <td><span class="badge badge-info">${pr.medicines ? pr.medicines.length : 0} Medicines</span></td>
      </tr>
    `).join("");
  },

  openAddModal() {
    const form = document.getElementById("prescriptionForm");
    if (form) form.reset();

    document.getElementById("prescriptionIdField").value = StorageService.generateId("PRE", STORAGE_KEYS.PRESCRIPTIONS);
    document.getElementById("prescriptionDate").value = new Date().toISOString().slice(0, 10);

    const patientSelect = document.getElementById("prescriptionPatient");
    if (patientSelect) {
      patientSelect.innerHTML = StorageService.getData(STORAGE_KEYS.PATIENTS).map(p => `
        <option value="${p.id}">${Utils.escapeHTML(p.name)} (${p.id})</option>
      `).join("");
    }

    const doctorSelect = document.getElementById("prescriptionDoctor");
    if (doctorSelect) {
      doctorSelect.innerHTML = StorageService.getData(STORAGE_KEYS.DOCTORS).map(d => `
        <option value="${d.id}">${Utils.escapeHTML(d.name)} (${Utils.escapeHTML(d.department)})</option>
      `).join("");
    }

    const medContainer = document.getElementById("medicineRowsContainer");
    if (medContainer) {
      medContainer.innerHTML = "";
      this.addMedicineRow();
    }

    Utils.openModal("prescriptionModal");
  },

  addMedicineRow() {
    const medContainer = document.getElementById("medicineRowsContainer");
    if (!medContainer) return;

    const rowDiv = document.createElement("div");
    rowDiv.className = "form-row medicine-row";
    rowDiv.style.marginBottom = "10px";

    rowDiv.innerHTML = `
      <div style="flex: 2;">
        <input type="text" class="form-control med-name" placeholder="Medicine Name" required>
      </div>
      <div style="flex: 1;">
        <input type="text" class="form-control med-dosage" placeholder="Dosage">
      </div>
      <div style="flex: 1;">
        <input type="text" class="form-control med-frequency" placeholder="Frequency">
      </div>
      <div style="flex: 1;">
        <input type="text" class="form-control med-duration" placeholder="Duration">
      </div>
      <div style="width: 40px; display: flex; align-items: center;">
        <button type="button" class="btn btn-danger btn-sm" onclick="this.closest('.medicine-row').remove()">X</button>
      </div>
    `;

    medContainer.appendChild(rowDiv);
  },

  savePrescription(event) {
    event.preventDefault();

    const id = document.getElementById("prescriptionIdField").value.trim();
    const patientId = document.getElementById("prescriptionPatient").value;
    const doctorId = document.getElementById("prescriptionDoctor").value;
    const date = document.getElementById("prescriptionDate").value;

    const patient = StorageService.getItemById(STORAGE_KEYS.PATIENTS, patientId);
    const doctor = StorageService.getItemById(STORAGE_KEYS.DOCTORS, doctorId);

    const medRows = document.querySelectorAll(".medicine-row");
    const medicines = [];

    medRows.forEach(row => {
      const name = row.querySelector(".med-name").value.trim();
      const dosage = row.querySelector(".med-dosage").value.trim();
      const frequency = row.querySelector(".med-frequency").value.trim();
      const duration = row.querySelector(".med-duration").value.trim();

      if (name) {
        medicines.push({ name, dosage, frequency, duration, instructions: "After meals" });
      }
    });

    if (medicines.length === 0) {
      Utils.showToast("Please add at least one medicine item.", "error");
      return;
    }

    const prescriptionData = {
      id,
      patientId,
      patientName: patient ? patient.name : "Unknown",
      doctorId,
      doctorName: doctor ? doctor.name : "Unknown",
      date,
      medicines
    };

    StorageService.addItem(STORAGE_KEYS.PRESCRIPTIONS, prescriptionData);
    Utils.showToast(`Prescription ${id} created.`, "success");

    Utils.closeModal("prescriptionModal");
    this.renderTable();
  }
};
