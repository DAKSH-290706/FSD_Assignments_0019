/* ==========================================================================
   MediCare Hospital Management System - Main App Router & Orchestrator
   ========================================================================== */

const App = {
  activeView: "dashboard",

  init() {
    console.log("MediCare HMS Initializing...");

    // Directly show main application without login page
    document.getElementById("appContainer")?.classList.remove("hidden");

    const user = AuthService.getCurrentUser();
    if (user) {
      this.updateUserDisplay(user);
    }

    this.bindGlobalEvents();

    SettingsModule.init();

    // Default view
    this.navigateTo("dashboard");
  },

  updateUserDisplay(user) {
    const avatarEl = document.getElementById("userHeaderAvatar");
    const nameEl = document.getElementById("userHeaderName");
    const roleEl = document.getElementById("userHeaderRole");

    if (avatarEl) avatarEl.innerText = user.name.charAt(0).toUpperCase();
    if (nameEl) nameEl.innerText = user.name;
    if (roleEl) roleEl.innerText = user.role;
  },

  navigateTo(viewId) {
    this.activeView = viewId;

    // Hide all views
    document.querySelectorAll(".view-container").forEach(el => el.classList.add("hidden"));

    // Deactivate sidebar nav items
    document.querySelectorAll(".nav-item").forEach(el => el.classList.remove("active"));

    // Activate current view & nav item
    const targetView = document.getElementById(`view-${viewId}`);
    const targetNav = document.getElementById(`nav-${viewId}`);

    if (targetView) targetView.classList.remove("hidden");
    if (targetNav) targetNav.classList.add("active");

    // Close mobile sidebar drawer if open
    document.getElementById("appSidebar")?.classList.remove("show");

    // Module specific rendering dispatch
    switch (viewId) {
      case "dashboard":
        DashboardModule.render();
        break;
      case "patients":
        PatientModule.init();
        PatientModule.renderTable();
        break;
      case "doctors":
        DoctorModule.init();
        DoctorModule.renderTable();
        break;
      case "appointments":
        AppointmentModule.init();
        AppointmentModule.renderTable();
        break;
      case "records":
        MedicalRecordModule.init();
        MedicalRecordModule.renderTable();
        break;
      case "prescriptions":
        PrescriptionModule.init();
        PrescriptionModule.renderTable();
        break;
      case "billing":
        BillingModule.init();
        BillingModule.renderTable();
        break;
      case "departments":
        DepartmentModule.render();
        break;
      case "staff":
        StaffModule.init();
        StaffModule.renderTable();
        break;
    }
  },

  bindGlobalEvents() {
    // Mobile Sidebar Drawer Toggle
    const sidebarToggle = document.getElementById("sidebarToggleBtn");
    if (sidebarToggle) {
      sidebarToggle.addEventListener("click", () => {
        document.getElementById("appSidebar")?.classList.toggle("show");
      });
    }

    // Profile Dropdown Toggle
    const profileMenu = document.getElementById("userProfileMenu");
    const profileDropdown = document.getElementById("profileDropdown");
    if (profileMenu && profileDropdown) {
      profileMenu.addEventListener("click", (e) => {
        e.stopPropagation();
        profileDropdown.classList.toggle("show");
      });

      document.addEventListener("click", () => {
        profileDropdown.classList.remove("show");
      });
    }

    // ESC key closes all active modals
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        document.querySelectorAll(".modal-overlay.active").forEach(m => {
          m.classList.remove("active");
        });
        document.body.style.overflow = "";
      }
    });
  }
};

// Start application when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  App.init();
});
