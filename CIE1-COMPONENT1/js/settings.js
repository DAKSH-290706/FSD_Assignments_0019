/* ==========================================================================
   MediCare Hospital Management System - Settings Module
   ========================================================================== */

const SettingsModule = {
  init() {
    this.applyThemeFromStorage();
  },

  applyThemeFromStorage() {
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) || "light";
    if (savedTheme === "dark") {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
  },

  toggleTheme() {
    const isDark = document.body.classList.toggle("dark-theme");
    localStorage.setItem(STORAGE_KEYS.THEME, isDark ? "dark" : "light");
    Utils.showToast(`Switched to ${isDark ? 'Dark' : 'Light'} mode.`, "info");
  }
};
