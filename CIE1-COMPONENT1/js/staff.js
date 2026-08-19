/* ==========================================================================
   MediCare Hospital Management System - Staff Management Module
   ========================================================================== */

const StaffModule = {
  activeSearchQuery: "",

  init() {
    this.bindEvents();
  },

  bindEvents() {
    const searchInput = document.getElementById("staffSearchInput");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.activeSearchQuery = e.target.value.toLowerCase().trim();
        this.renderTable();
      });
    }
  },

  renderTable() {
    const tbody = document.getElementById("staffTbody");
    if (!tbody) return;

    let staffMembers = StorageService.getData(STORAGE_KEYS.STAFF);

    if (this.activeSearchQuery) {
      staffMembers = staffMembers.filter(s =>
        s.id.toLowerCase().includes(this.activeSearchQuery) ||
        s.name.toLowerCase().includes(this.activeSearchQuery) ||
        s.role.toLowerCase().includes(this.activeSearchQuery) ||
        s.department.toLowerCase().includes(this.activeSearchQuery)
      );
    }

    if (staffMembers.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7">
            <div class="empty-state">
              <div class="empty-state-title">No Staff Found</div>
              <div class="empty-state-text">No hospital staff entries found.</div>
              <button class="btn btn-primary btn-sm" onclick="StaffModule.openAddModal()">+ Add New Staff</button>
            </div>
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = staffMembers.map(s => `
      <tr>
        <td><strong>${s.id}</strong></td>
        <td><strong>${Utils.escapeHTML(s.name)}</strong></td>
        <td><span class="badge badge-info">${Utils.escapeHTML(s.role)}</span></td>
        <td>${Utils.escapeHTML(s.department)}</td>
        <td>${Utils.escapeHTML(s.phone)}</td>
        <td>${Utils.escapeHTML(s.shift || "General")}</td>
        <td><span class="badge badge-success">${s.status || "Active"}</span></td>
      </tr>
    `).join("");
  },

  openAddModal() {
    const form = document.getElementById("staffForm");
    if (form) form.reset();

    document.getElementById("staffIdField").value = StorageService.generateId("STF", STORAGE_KEYS.STAFF);
    document.getElementById("staffJoiningDate").value = new Date().toISOString().slice(0, 10);

    Utils.openModal("staffModal");
  },

  saveStaff(event) {
    event.preventDefault();

    const id = document.getElementById("staffIdField").value.trim();
    const name = document.getElementById("staffName").value.trim();
    const role = document.getElementById("staffRole").value;
    const department = document.getElementById("staffDepartment").value;
    const phone = document.getElementById("staffPhone").value.trim();
    const email = document.getElementById("staffEmail").value.trim();
    const joiningDate = document.getElementById("staffJoiningDate").value;
    const shift = document.getElementById("staffShift").value;

    if (!name || !phone) {
      Utils.showToast("Name and Phone are required.", "error");
      return;
    }

    const staffData = { id, name, role, department, phone, email, joiningDate, shift, status: "Active" };

    StorageService.addItem(STORAGE_KEYS.STAFF, staffData);
    Utils.showToast(`Staff member ${name} added with ID ${id}.`, "success");

    Utils.closeModal("staffModal");
    this.renderTable();
  }
};
