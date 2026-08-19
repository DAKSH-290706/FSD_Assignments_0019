/* ==========================================================================
   MediCare Hospital Management System - Authentication Module
   ========================================================================== */

const AuthService = {
  /**
   * Return default active user since login page is removed
   */
  getCurrentUser() {
    return {
      id: "USR001",
      name: "Admin User",
      email: "admin@medicare.com",
      role: "Administrator"
    };
  },

  isAuthenticated() {
    return true;
  },

  hasRole() {
    return true;
  }
};
