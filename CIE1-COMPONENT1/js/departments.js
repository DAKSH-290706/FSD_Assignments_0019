/* ==========================================================================
   MediCare Hospital Management System - Departments Module
   ========================================================================== */

const DepartmentModule = {
  render() {
    const container = document.getElementById("departmentsGrid");
    if (!container) return;

    const departments = StorageService.getData(STORAGE_KEYS.DEPARTMENTS);

    if (departments.length === 0) {
      container.innerHTML = `<p class="text-muted">No departments configured.</p>`;
      return;
    }

    container.innerHTML = departments.map(dept => `
      <div class="card" style="margin-bottom: 0;">
        <div class="card-header">
          <h3 class="card-title" style="color: var(--primary);">${Utils.escapeHTML(dept.name)}</h3>
          <span class="badge ${dept.status === 'Active' ? 'badge-success' : 'badge-secondary'}">${dept.status}</span>
        </div>
        <div style="font-size: 13px; display: flex; flex-direction: column; gap: 8px;">
          <div><strong>Head of Dept:</strong> ${Utils.escapeHTML(dept.headDoctor)}</div>
          <div><strong>Contact:</strong> ${Utils.escapeHTML(dept.contact)}</div>
          <div style="display: flex; gap: 16px; margin-top: 8px; padding-top: 8px; border-top: 1px dashed var(--border-color);">
            <div><strong style="font-size: 16px; color: var(--primary);">${dept.doctorCount}</strong> Doctors</div>
            <div><strong style="font-size: 16px; color: var(--secondary);">${dept.patientCount}</strong> Patients</div>
          </div>
        </div>
      </div>
    `).join("");
  }
};
