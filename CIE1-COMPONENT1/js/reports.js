/* ==========================================================================
   MediCare Hospital Management System - Reports & Analytics Module
   ========================================================================== */

const ReportsModule = {
  render() {
    this.renderMetricsSummary();
    this.renderReportCharts();
  },

  renderMetricsSummary() {
    const patients = StorageService.getData(STORAGE_KEYS.PATIENTS);
    const appointments = StorageService.getData(STORAGE_KEYS.APPOINTMENTS);
    const bills = StorageService.getData(STORAGE_KEYS.BILLS);
    const doctors = StorageService.getData(STORAGE_KEYS.DOCTORS);

    const totalRev = bills.filter(b => b.paymentStatus === "Paid").reduce((sum, b) => sum + (b.total || 0), 0);
    const completedApts = appointments.filter(a => a.status === "Completed").length;

    const summaryContainer = document.getElementById("reportsSummaryGrid");
    if (!summaryContainer) return;

    summaryContainer.innerHTML = `
      <div class="stat-card">
        <div class="stat-content">
          <p>Total Registered Patients</p>
          <div class="stat-number">${patients.length}</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-content">
          <p>Total Appointments</p>
          <div class="stat-number">${appointments.length}</div>
          <div class="stat-change up">${completedApts} Completed</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-content">
          <p>Total Revenue</p>
          <div class="stat-number">${Utils.formatCurrency(totalRev)}</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-content">
          <p>Medical Staff Count</p>
          <div class="stat-number">${doctors.length}</div>
        </div>
      </div>
    `;
  },

  renderReportCharts() {
    const container = document.getElementById("reportsVisualContainer");
    if (!container) return;

    const patients = StorageService.getData(STORAGE_KEYS.PATIENTS);
    const maleCount = patients.filter(p => p.gender === "Male").length;
    const femaleCount = patients.filter(p => p.gender === "Female").length;

    container.innerHTML = `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div class="card">
          <h3 class="card-title">Patient Demographics (Gender)</h3>
          <div style="padding: 20px; font-size: 14px;">
            <div style="margin-bottom: 12px;"><strong>Male Patients:</strong> ${maleCount} (${Math.round((maleCount/patients.length)*100 || 0)}%)</div>
            <div style="background: #e2e8f0; height: 10px; border-radius: 5px; margin-bottom: 16px;">
              <div style="background: var(--primary); height: 100%; width: ${(maleCount/patients.length)*100 || 0}%; border-radius: 5px;"></div>
            </div>

            <div style="margin-bottom: 12px;"><strong>Female Patients:</strong> ${femaleCount} (${Math.round((femaleCount/patients.length)*100 || 0)}%)</div>
            <div style="background: #e2e8f0; height: 10px; border-radius: 5px;">
              <div style="background: var(--secondary); height: 100%; width: ${(femaleCount/patients.length)*100 || 0}%; border-radius: 5px;"></div>
            </div>
          </div>
        </div>

        <div class="card">
          <h3 class="card-title">Billing Breakdown</h3>
          <div style="padding: 20px;">
            <p><strong>Paid Invoices:</strong> ${StorageService.getData(STORAGE_KEYS.BILLS).filter(b => b.paymentStatus === 'Paid').length}</p>
            <p><strong>Pending Invoices:</strong> ${StorageService.getData(STORAGE_KEYS.BILLS).filter(b => b.paymentStatus === 'Pending').length}</p>
            <p><strong>Partially Paid Invoices:</strong> ${StorageService.getData(STORAGE_KEYS.BILLS).filter(b => b.paymentStatus === 'Partially Paid').length}</p>
          </div>
        </div>
      </div>
    `;
  },

  exportPatientsCSV() {
    const patients = StorageService.getData(STORAGE_KEYS.PATIENTS);
    const headers = ["ID", "Name", "DOB", "Age", "Gender", "BloodGroup", "Phone", "Email", "Department", "RegisteredDate"];
    const rows = patients.map(p => [p.id, p.name, p.dob, p.age, p.gender, p.bloodGroup, p.phone, p.email, p.department, p.registeredDate]);
    Utils.exportToCSV("Patients_Report", headers, rows);
  },

  exportAppointmentsCSV() {
    const appointments = StorageService.getData(STORAGE_KEYS.APPOINTMENTS);
    const headers = ["ID", "Patient", "Doctor", "Department", "Date", "Time", "Status", "Reason"];
    const rows = appointments.map(a => [a.id, a.patientName, a.doctorName, a.department, a.date, a.time, a.status, a.reason]);
    Utils.exportToCSV("Appointments_Report", headers, rows);
  },

  exportBillingCSV() {
    const bills = StorageService.getData(STORAGE_KEYS.BILLS);
    const headers = ["BillID", "Patient", "Date", "Consultation", "Lab", "Medicine", "Room", "Tax", "Discount", "Total", "PaymentStatus", "PaymentMethod"];
    const rows = bills.map(b => [b.id, b.patientName, b.date, b.consultationFee, b.labCharges, b.medicineCharges, b.roomCharges, b.tax, b.discount, b.total, b.paymentStatus, b.paymentMethod]);
    Utils.exportToCSV("Billing_Report", headers, rows);
  },

  printReport() {
    window.print();
  }
};
