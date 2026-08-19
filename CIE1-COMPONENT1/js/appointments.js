/* ==========================================================================
   MediCare Hospital Management System - Appointment Management Module
   ========================================================================== */

const AppointmentModule = {
  activeSearchQuery: "",
  activeDeptFilter: "ALL",

  init() {
    this.bindEvents();
  },

  bindEvents() {
    const searchInput = document.getElementById("aptSearchInput");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.activeSearchQuery = e.target.value.toLowerCase().trim();
        this.renderTable();
      });
    }

    const deptFilter = document.getElementById("aptDeptFilter");
    if (deptFilter) {
      deptFilter.addEventListener("change", (e) => {
        this.activeDeptFilter = e.target.value;
        this.renderTable();
      });
    }

    const modalDeptSelect = document.getElementById("aptModalDept");
    if (modalDeptSelect) {
      modalDeptSelect.addEventListener("change", (e) => {
        this.populateDoctorDropdown(e.target.value);
      });
    }
  },

  renderTable() {
    const tbody = document.getElementById("appointmentsTbody");
    if (!tbody) return;

    let appointments = StorageService.getData(STORAGE_KEYS.APPOINTMENTS);

    if (this.activeDeptFilter !== "ALL") {
      appointments = appointments.filter(a => a.department === this.activeDeptFilter);
    }

    if (this.activeSearchQuery) {
      appointments = appointments.filter(a =>
        a.id.toLowerCase().includes(this.activeSearchQuery) ||
        a.patientName.toLowerCase().includes(this.activeSearchQuery) ||
        a.doctorName.toLowerCase().includes(this.activeSearchQuery) ||
        a.reason.toLowerCase().includes(this.activeSearchQuery)
      );
    }

    if (appointments.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6">
            <div class="empty-state">
              <div class="empty-state-title">No Appointments Found</div>
              <div class="empty-state-text">No appointment bookings match criteria.</div>
              <button class="btn btn-primary btn-sm" onclick="AppointmentModule.openBookModal()">+ Book Appointment</button>
            </div>
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = appointments.map(a => `
      <tr>
        <td><strong>${a.id}</strong></td>
        <td><strong>${Utils.escapeHTML(a.patientName)}</strong></td>
        <td>${Utils.escapeHTML(a.doctorName)}</td>
        <td>${Utils.escapeHTML(a.department)}</td>
        <td>${Utils.formatDate(a.date)}</td>
        <td>${Utils.escapeHTML(a.time)}</td>
      </tr>
    `).join("");
  },

  populateDoctorDropdown(selectedDept = "", selectedDoctorId = "") {
    const doctorSelect = document.getElementById("aptModalDoctor");
    if (!doctorSelect) return;

    let doctors = StorageService.getData(STORAGE_KEYS.DOCTORS);
    if (selectedDept && selectedDept !== "ALL") {
      doctors = doctors.filter(d => d.department === selectedDept);
    }

    doctorSelect.innerHTML = doctors.map(d => `
      <option value="${d.id}" ${d.id === selectedDoctorId ? "selected" : ""}>
        ${Utils.escapeHTML(d.name)} (${Utils.escapeHTML(d.specialization)})
      </option>
    `).join("");
  },

  populatePatientDropdown(selectedPatientId = "") {
    const patientSelect = document.getElementById("aptModalPatient");
    if (!patientSelect) return;

    const patients = StorageService.getData(STORAGE_KEYS.PATIENTS);
    patientSelect.innerHTML = patients.map(p => `
      <option value="${p.id}" ${p.id === selectedPatientId ? "selected" : ""}>
        ${Utils.escapeHTML(p.name)} (${p.id} - ${p.phone})
      </option>
    `).join("");
  },

  openBookModal() {
    const form = document.getElementById("appointmentForm");
    if (form) form.reset();

    document.getElementById("aptModalTitle").innerText = "Book Appointment";
    document.getElementById("aptIdField").value = StorageService.generateId("APT", STORAGE_KEYS.APPOINTMENTS);
    document.getElementById("aptModalDate").value = new Date().toISOString().slice(0, 10);

    this.populatePatientDropdown();
    this.populateDoctorDropdown();

    Utils.openModal("appointmentModal");
  },

  saveAppointment(event) {
    event.preventDefault();

    const id = document.getElementById("aptIdField").value.trim();
    const patientId = document.getElementById("aptModalPatient").value;
    const dept = document.getElementById("aptModalDept").value;
    const doctorId = document.getElementById("aptModalDoctor").value;
    const date = document.getElementById("aptModalDate").value;
    const time = document.getElementById("aptModalTime").value;
    const reason = document.getElementById("aptModalReason").value.trim();
    const notes = document.getElementById("aptModalNotes").value.trim();

    if (!date || !time) {
      Utils.showToast("Please select Date and Time.", "error");
      return;
    }

    const patient = StorageService.getItemById(STORAGE_KEYS.PATIENTS, patientId);
    const doctor = StorageService.getItemById(STORAGE_KEYS.DOCTORS, doctorId);

    if (!patient || !doctor) {
      Utils.showToast("Invalid patient or doctor selection.", "error");
      return;
    }

    const allAppointments = StorageService.getData(STORAGE_KEYS.APPOINTMENTS);
    const hasConflict = allAppointments.some(a =>
      a.id !== id &&
      a.doctorId === doctorId &&
      a.date === date &&
      a.time === time
    );

    if (hasConflict) {
      Utils.showToast(`Conflict: ${doctor.name} is already booked at ${time} on ${Utils.formatDate(date)}.`, "error", "Unavailable");
      return;
    }

    const aptData = {
      id,
      patientId,
      patientName: patient.name,
      doctorId,
      doctorName: doctor.name,
      department: dept || doctor.department,
      date,
      time,
      reason,
      status: "Confirmed",
      notes
    };

    const existing = StorageService.getItemById(STORAGE_KEYS.APPOINTMENTS, id);
    if (existing) {
      StorageService.updateItem(STORAGE_KEYS.APPOINTMENTS, id, aptData);
      Utils.showToast(`Appointment ${id} updated.`, "success");
    } else {
      StorageService.addItem(STORAGE_KEYS.APPOINTMENTS, aptData);
      Utils.showToast(`Appointment ${id} booked successfully.`, "success");

      StorageService.addItem(STORAGE_KEYS.NOTIFICATIONS, {
        id: StorageService.generateId("NOT", STORAGE_KEYS.NOTIFICATIONS),
        title: "Appointment Booked",
        message: `${patient.name} scheduled with ${doctor.name} on ${Utils.formatDate(date)} at ${time}.`,
        timestamp: new Date().toISOString(),
        read: false,
        type: "appointment"
      });
      NotificationModule.updateBadge();
    }

    Utils.closeModal("appointmentModal");
    this.renderTable();
    DashboardModule.render();
  }
};
