/* ==========================================================================
   MediCare Hospital Management System - LocalStorage & Data Layer
   ========================================================================== */

const STORAGE_KEYS = {
  VERSION: "hms_version_v2",
  USERS: "hms_users",
  PATIENTS: "hms_patients",
  DOCTORS: "hms_doctors",
  APPOINTMENTS: "hms_appointments",
  DEPARTMENTS: "hms_departments",
  RECORDS: "hms_records",
  PRESCRIPTIONS: "hms_prescriptions",
  BILLS: "hms_bills",
  STAFF: "hms_staff",
  NOTIFICATIONS: "hms_notifications",
  SESSION: "hms_session",
  THEME: "hms_theme"
};

const StorageService = {
  /**
   * Initialize LocalStorage with minimal seed data.
   */
  initStorage() {
    // If version missing or key not initialized, set minimal data
    if (!localStorage.getItem(STORAGE_KEYS.VERSION) || !localStorage.getItem(STORAGE_KEYS.PATIENTS)) {
      this.resetDemoData();
    }
  },

  /**
   * Get array of items by key
   */
  getData(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  },

  /**
   * Overwrite data array by key
   */
  saveData(key, dataArray) {
    localStorage.setItem(key, JSON.stringify(dataArray));
  },

  /**
   * Get single item by ID
   */
  getItemById(key, id) {
    const items = this.getData(key);
    return items.find(item => item.id === id) || null;
  },

  /**
   * Add new item to collection
   */
  addItem(key, newItem) {
    const items = this.getData(key);
    items.unshift(newItem);
    this.saveData(key, items);
    return newItem;
  },

  /**
   * Update existing item by ID
   */
  updateItem(key, id, updatedFields) {
    const items = this.getData(key);
    const index = items.findIndex(item => item.id === id);
    if (index !== -1) {
      items[index] = { ...items[index], ...updatedFields };
      this.saveData(key, items);
      return items[index];
    }
    return null;
  },

  /**
   * Delete item by ID
   */
  deleteItem(key, id) {
    let items = this.getData(key);
    const initialLen = items.length;
    items = items.filter(item => item.id !== id);
    this.saveData(key, items);
    return items.length < initialLen;
  },

  /**
   * Generate Next Unique ID (e.g., PAT004, DOC004)
   */
  generateId(prefix, key) {
    const items = this.getData(key);
    if (!items || items.length === 0) {
      return `${prefix}001`;
    }

    let maxNum = 0;
    items.forEach(item => {
      if (item.id && item.id.startsWith(prefix)) {
        const numPart = parseInt(item.id.replace(prefix, ""), 10);
        if (!isNaN(numPart) && numPart > maxNum) {
          maxNum = numPart;
        }
      }
    });

    const nextNum = maxNum + 1;
    return `${prefix}${nextNum.toString().padStart(3, "0")}`;
  },

  /**
   * Reset all data to minimal SEED_DATA
   */
  resetDemoData() {
    const activeSession = localStorage.getItem(STORAGE_KEYS.SESSION);
    const activeTheme = localStorage.getItem(STORAGE_KEYS.THEME);

    localStorage.clear();

    if (activeSession) localStorage.setItem(STORAGE_KEYS.SESSION, activeSession);
    if (activeTheme) localStorage.setItem(STORAGE_KEYS.THEME, activeTheme);

    localStorage.setItem(STORAGE_KEYS.VERSION, "2.0_minimal");
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(SEED_DATA.users));
    localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(SEED_DATA.patients));
    localStorage.setItem(STORAGE_KEYS.DOCTORS, JSON.stringify(SEED_DATA.doctors));
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(SEED_DATA.appointments));
    localStorage.setItem(STORAGE_KEYS.DEPARTMENTS, JSON.stringify(SEED_DATA.departments));
    localStorage.setItem(STORAGE_KEYS.RECORDS, JSON.stringify(SEED_DATA.medicalRecords));
    localStorage.setItem(STORAGE_KEYS.PRESCRIPTIONS, JSON.stringify(SEED_DATA.prescriptions));
    localStorage.setItem(STORAGE_KEYS.BILLS, JSON.stringify(SEED_DATA.bills));
    localStorage.setItem(STORAGE_KEYS.STAFF, JSON.stringify(SEED_DATA.staff));
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(SEED_DATA.notifications));
    console.log("MediCare HMS: Reset to minimal clean dataset.");
  }
};

// Initialize immediately upon script evaluation
StorageService.initStorage();
