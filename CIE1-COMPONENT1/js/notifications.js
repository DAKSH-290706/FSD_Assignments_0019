/* ==========================================================================
   MediCare Hospital Management System - Notifications Module
   ========================================================================== */

const NotificationModule = {
  init() {
    this.updateBadge();
    this.bindEvents();
  },

  bindEvents() {
    const bellBtn = document.getElementById("headerNotificationBtn");
    if (bellBtn) {
      bellBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.toggleDrawer();
      });
    }
  },

  updateBadge() {
    const notifications = StorageService.getData(STORAGE_KEYS.NOTIFICATIONS);
    const unreadCount = notifications.filter(n => !n.read).length;

    const badge = document.getElementById("notificationBadge");
    if (badge) {
      badge.innerText = unreadCount;
      badge.style.display = unreadCount > 0 ? "inline-block" : "none";
    }
  },

  toggleDrawer() {
    const drawer = document.getElementById("notificationDrawer");
    if (!drawer) return;

    drawer.classList.toggle("show");
    if (drawer.classList.contains("show")) {
      this.renderDrawerContent();
    }
  },

  renderDrawerContent() {
    const container = document.getElementById("notificationListContainer");
    if (!container) return;

    const notifications = StorageService.getData(STORAGE_KEYS.NOTIFICATIONS);

    if (notifications.length === 0) {
      container.innerHTML = `<p class="text-muted" style="padding: 16px; text-align: center;">No notifications.</p>`;
      return;
    }

    container.innerHTML = notifications.map(n => `
      <div style="padding: 10px; border-bottom: 1px solid var(--border-color); background: ${n.read ? 'transparent' : 'var(--primary-subtle)'}; display: flex; justify-content: space-between; align-items: flex-start;">
        <div>
          <div style="font-weight: 600; font-size: 13px; color: var(--text-main);">${Utils.escapeHTML(n.title)}</div>
          <div style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">${Utils.escapeHTML(n.message)}</div>
          <div style="font-size: 10px; color: var(--text-light); margin-top: 4px;">${Utils.formatDateTime(n.timestamp)}</div>
        </div>
        <div>
          ${!n.read ? `<button class="btn btn-outline btn-sm" style="padding: 2px 6px; font-size: 10px;" onclick="NotificationModule.markRead('${n.id}')">Read</button>` : ''}
        </div>
      </div>
    `).join("");
  },

  markRead(id) {
    StorageService.updateItem(STORAGE_KEYS.NOTIFICATIONS, id, { read: true });
    this.updateBadge();
    this.renderDrawerContent();
  },

  markAllRead() {
    const notifications = StorageService.getData(STORAGE_KEYS.NOTIFICATIONS);
    notifications.forEach(n => n.read = true);
    StorageService.saveData(STORAGE_KEYS.NOTIFICATIONS, notifications);
    this.updateBadge();
    this.renderDrawerContent();
    Utils.showToast("All notifications marked as read.", "info");
  }
};
