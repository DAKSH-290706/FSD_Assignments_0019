/* ==========================================================================
   MediCare Hospital Management System - Dashboard Module
   ========================================================================== */

const DashboardModule = {
  /**
   * Render Dashboard view with metrics and recent appointments
   */
  render() {
    this.renderStatsCards();
    this.renderRecentAppointmentsTable();
  },

  /**
   * Calculate and render KPI Stats Cards
   */
  renderStatsCards() {
    const patients = StorageService.getData(STORAGE_KEYS.PATIENTS);
    const doctors = StorageService.getData(STORAGE_KEYS.DOCTORS);
    const appointments = StorageService.getData(STORAGE_KEYS.APPOINTMENTS);
    const bills = StorageService.getData(STORAGE_KEYS.BILLS);

    const todayStr = new Date().toISOString().slice(0, 10);

    const totalPatients = patients.length;
    const totalDoctors = doctors.length;
    const todayAppointments = appointments.filter(a => a.date === todayStr).length;

    const totalRevenue = bills
      .filter(b => b.paymentStatus === "Paid")
      .reduce((sum, b) => sum + (parseFloat(b.total) || 0), 0);

    const kpiPatients = document.getElementById("kpiTotalPatients");
    const kpiDoctors = document.getElementById("kpiTotalDoctors");
    const kpiTodayApts = document.getElementById("kpiTodayAppointments");
    const kpiRevenue = document.getElementById("kpiTotalRevenue");

    if (kpiPatients) kpiPatients.innerText = totalPatients.toLocaleString("en-IN");
    if (kpiDoctors) kpiDoctors.innerText = totalDoctors.toLocaleString("en-IN");
    if (kpiTodayApts) kpiTodayApts.innerText = todayAppointments;
    if (kpiRevenue) kpiRevenue.innerText = Utils.formatCurrency(totalRevenue);
  },

  /**
   * Render Recent Appointments Table
   */
  renderRecentAppointmentsTable() {
    const tbody = document.getElementById("recentAppointmentsTbody");
    if (!tbody) return;

    const appointments = StorageService.getData(STORAGE_KEYS.APPOINTMENTS);
    const recentList = appointments.slice(0, 5);

    if (recentList.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" class="text-center" style="padding: 24px; color: var(--text-muted);">
            No recent appointments.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = recentList.map(apt => {
      let badgeClass = "badge-secondary";
      if (apt.status === "Confirmed") badgeClass = "badge-info";
      else if (apt.status === "Completed") badgeClass = "badge-success";
      else if (apt.status === "Pending" || apt.status === "Scheduled") badgeClass = "badge-warning";
      else if (apt.status === "Cancelled") badgeClass = "badge-danger";

      return `
        <tr>
          <td><strong>${Utils.escapeHTML(apt.patientName)}</strong></td>
          <td>${Utils.escapeHTML(apt.doctorName)}</td>
          <td>${Utils.escapeHTML(apt.department)}</td>
          <td>${Utils.formatDate(apt.date)}</td>
          <td>${Utils.escapeHTML(apt.time)}</td>
          <td>
            <span class="badge ${badgeClass}">
              ${Utils.escapeHTML(apt.status)}
            </span>
          </td>
        </tr>
      `;
    }).join("");
  }
};
