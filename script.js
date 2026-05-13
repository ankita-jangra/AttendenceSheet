const STORAGE_KEY = "attendance_salary_app_v1";
const DB_NAME = "attendance_salary_db";
const DB_VERSION = 2;
const STAFF_STORE = "staff";
const ATTENDANCE_STORE = "attendance";
const ADVANCE_STORE = "advances";
const USERS_STORE = "users";
const SETTINGS_STORE = "settings";
const AUTH_USER_KEY = "attendance_auth_user";
const WORKING_HOURS_PER_DAY = 8;
const DEFAULT_DEPARTMENT = "General";
const CUSTOM_DEPTS_STORAGE_KEY = "attendance_custom_departments_v1";
const THEME_STORAGE_KEY = "attendance_theme";

const staffForm = document.getElementById("staff-form");
const staffNameInput = document.getElementById("staff-name");
const staffNameHindiInput = document.getElementById("staff-name-hindi");
const staffDepartmentInput = document.getElementById("staff-department");
const salaryPerDayInput = document.getElementById("salary-per-day");
const staffTableBody = document.getElementById("staff-table-body");

const salaryForm = document.getElementById("salary-form");
const salaryStartDateInput = document.getElementById("salary-start-date");
const salaryEndDateInput = document.getElementById("salary-end-date");
const salaryResult = document.getElementById("salary-result");
const salaryResultMount = document.getElementById("salary-result-mount");
const salaryResultBlock = document.getElementById("salary-result-block");
const salaryFullscreenBar = document.getElementById("salary-fullscreen-bar");
const salaryFullscreenOpenBtn = document.getElementById("salary-fullscreen-open");
const salaryFullscreenOverlay = document.getElementById("salary-fullscreen-overlay");
const salaryFullscreenHost = document.getElementById("salary-fullscreen-host");
const salaryFullscreenCloseBtn = document.getElementById("salary-fullscreen-close");
const applySalaryDeductionsBtn = document.getElementById("apply-salary-deductions");
const downloadWeeklyPdfBtn = document.getElementById("download-weekly-pdf");
const downloadWeeklyCsvBtn = document.getElementById("download-weekly-csv");
const salaryAttendanceEditor = document.getElementById("salary-attendance-editor");
const salaryAttendanceEditorTitle = document.getElementById("salary-attendance-editor-title");
const salaryAttendanceEditorHint = document.getElementById("salary-attendance-editor-hint");
const salaryAttendanceEditorForm = document.getElementById("salary-attendance-editor-form");
const salaryAttendanceEditorBody = document.getElementById("salary-attendance-editor-body");
const salaryAttendanceEditorCancelBtn = document.getElementById("salary-attendance-editor-cancel");

const attendanceTableBody = document.getElementById("attendance-table-body");
const bulkAttendanceForm = document.getElementById("bulk-attendance-form");
const bulkAttendanceDate = document.getElementById("bulk-attendance-date");
const bulkAttendanceBody = document.getElementById("bulk-attendance-body");
const bulkSaveAllBtn = document.getElementById("bulk-save-all-btn");
const bulkAttendanceRefreshBtn = document.getElementById("bulk-attendance-refresh");
const disabledStaffBody = document.getElementById("disabled-staff-body");
const advanceForm = document.getElementById("advance-form");
const advanceStaffSelect = document.getElementById("advance-staff");
const advanceDateInput = document.getElementById("advance-date");
const advanceTypeSelect = document.getElementById("advance-type");
const advanceAmountInput = document.getElementById("advance-amount");
const advanceNoteInput = document.getElementById("advance-note");
const advanceBalanceBody = document.getElementById("advance-balance-body");
const advanceHistoryBody = document.getElementById("advance-history-body");
const weeklyPaidForm = document.getElementById("weekly-paid-form");
const weeklyPaidStartDateInput = document.getElementById("weekly-paid-start-date");
const weeklyPaidEndDateInput = document.getElementById("weekly-paid-end-date");
const weeklyPaidHead = document.getElementById("weekly-paid-head");
const weeklyPaidBody = document.getElementById("weekly-paid-body");
const weeklyPaidEditor = document.getElementById("weekly-paid-editor");
const weeklyPaidEditorTitle = document.getElementById("weekly-paid-editor-title");
const weeklyPaidEditorForm = document.getElementById("weekly-paid-editor-form");
const weeklyPaidEditorBody = document.getElementById("weekly-paid-editor-body");
const weeklyPaidEditorCancelBtn = document.getElementById("weekly-paid-editor-cancel");
const attendanceFilterForm = document.getElementById("attendance-filter-form");
const attendanceViewMode = document.getElementById("attendance-view-mode");
const attendanceRefDate = document.getElementById("attendance-ref-date");
const attendanceTableHead = document.getElementById("attendance-table-head");
const openAttendanceUpdateBtn = document.getElementById("open-attendance-update");
const attendanceUpdateCard = document.getElementById("attendance-update-card");
const attendanceUpdateForm = document.getElementById("attendance-update-form");
const attendanceUpdateDate = document.getElementById("attendance-update-date");
const attendanceUpdateStaff = document.getElementById("attendance-update-staff");
const attendanceUpdateStatus = document.getElementById("attendance-update-status");
const attendanceUpdatePartialHours = document.getElementById("attendance-update-partial-hours");
const attendanceUpdateExtraHours = document.getElementById("attendance-update-extra-hours");
const attendanceUpdateCancelBtn = document.getElementById("attendance-update-cancel");
const loginPage = document.getElementById("login-page");
const loginForm = document.getElementById("login-form");
const loginUsernameInput = document.getElementById("login-username");
const loginPasswordInput = document.getElementById("login-password");
const loginMessage = document.getElementById("login-message");
const logoutBtn = document.getElementById("logout-btn");
const userManagementPage = document.getElementById("user-management-page");
const openUserManagementPageBtn = document.getElementById("open-user-management-page");
const createUserForm = document.getElementById("create-user-form");
const newUserUsernameInput = document.getElementById("new-user-username");
const newUserPasswordInput = document.getElementById("new-user-password");
const newUserRoleSelect = document.getElementById("new-user-role");
const usersTableBody = document.getElementById("users-table-body");

const dbStatus = document.getElementById("db-status");
const goDashboardBtn = document.getElementById("go-dashboard");
const goMarkAttendanceBtn = document.getElementById("go-mark-attendance");
const openInfoPageBtn = document.getElementById("open-info-page");
const openInfoFromHomeBtn = document.getElementById("open-info-from-home");
const themeToggleButtons = document.querySelectorAll("[data-theme-toggle]");
const homePage = document.getElementById("home-page");
const addStaffPage = document.getElementById("add-staff-page");
const weeklySalaryPage = document.getElementById("weekly-salary-page");
const weeklyPaidPage = document.getElementById("weekly-paid-page");
const staffSalaryPage = document.getElementById("staff-salary-page");
const advancePage = document.getElementById("advance-page");
const attendanceRecordsPage = document.getElementById("attendance-records-page");
const attendancePage = document.getElementById("attendance-page");
const infoPage = document.getElementById("info-page");
const openAddStaffPageBtn = document.getElementById("open-add-staff-page");
const openMarkAttendancePageBtn = document.getElementById("open-mark-attendance-page");
const openWeeklySalaryPageBtn = document.getElementById("open-weekly-salary-page");
const openWeeklyPaidPageBtn = document.getElementById("open-weekly-paid-page");
const openStaffSalaryPageBtn = document.getElementById("open-staff-salary-page");
const openAdvancePageBtn = document.getElementById("open-advance-page");
const openAttendanceRecordsPageBtn = document.getElementById("open-attendance-records-page");
const filterDeptSalary = document.getElementById("filter-dept-salary");
const filterDeptWeeklyPaid = document.getElementById("filter-dept-weekly-paid");
const filterDeptRecords = document.getElementById("filter-dept-records");
const filterDeptMark = document.getElementById("filter-dept-mark");
const filterDeptStaff = document.getElementById("filter-dept-staff");
const filterDeptAdvance = document.getElementById("filter-dept-advance");
const newDepartmentNameInput = document.getElementById("new-department-name");
const customDepartmentsList = document.getElementById("custom-departments-list");

let state = { staff: [], attendance: [], advances: [], users: [] };
let customDepartments = [];
let currentSalaryRows = [];
let currentWeeklySummaryRange = null;
let currentWeeklyEditStaffId = null;
let salaryPageAttendanceEditStaffId = null;
let useCloudDb = false;
let dbRef = null;
let currentUser = null;
/** User edited the bulk form after load; re-enables Save when the day was already complete. */
let bulkMarkFormDirty = false;
/** Live clock on dashboard while logged in. */
let dashboardClockTimer = null;
const hindiNameCache = {};
/** Cached TTF as base64; each new jsPDF() needs its own addFileToVFS + addFont. */
let hindiFontTtfBase64 = null;

function arrayBufferToBase64(buffer) {
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  let binary = "";
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

/**
 * Register Noto Sans Devanagari on this doc so Devanagari shows in PDF (Helvetica cannot).
 * Font bytes are fetched once and reused; registration runs per document instance.
 */
async function ensureHindiFont(doc) {
  try {
    const fileName = "NotoSansDevanagari-Regular.ttf";
    if (!hindiFontTtfBase64) {
      const fontUrls = [
        "https://cdn.jsdelivr.net/gh/notofonts/noto-fonts@main/hinted/ttf/NotoSansDevanagari/NotoSansDevanagari-Regular.ttf",
        "https://cdn.jsdelivr.net/gh/googlefonts/noto-fonts@main/hinted/ttf/NotoSansDevanagari/NotoSansDevanagari-Regular.ttf",
      ];
      let buf = null;
      for (const fontUrl of fontUrls) {
        const response = await fetch(fontUrl);
        if (response.ok) {
          buf = await response.arrayBuffer();
          break;
        }
      }
      if (!buf) return false;
      hindiFontTtfBase64 = arrayBufferToBase64(buf);
    }
    doc.addFileToVFS(fileName, hindiFontTtfBase64);
    doc.addFont(fileName, "NotoSansDevanagari", "normal");
    return true;
  } catch (_err) {
    return false;
  }
}

function renderDbStatus() {
  if (!dbStatus) return;
  if (useCloudDb) {
    dbStatus.textContent = "DB Connected (Supabase)";
    dbStatus.classList.remove("fallback");
    dbStatus.classList.add("connected");
  } else {
    dbStatus.textContent = "Fallback Mode (IndexedDB)";
    dbStatus.classList.remove("connected");
    dbStatus.classList.add("fallback");
  }
}

function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STAFF_STORE)) db.createObjectStore(STAFF_STORE, { keyPath: "id" });
      if (!db.objectStoreNames.contains(ATTENDANCE_STORE)) {
        const s = db.createObjectStore(ATTENDANCE_STORE, { keyPath: "id" });
        s.createIndex("staffId", "staffId", { unique: false });
        s.createIndex("date", "date", { unique: false });
      }
      if (!db.objectStoreNames.contains(ADVANCE_STORE)) {
        const a = db.createObjectStore(ADVANCE_STORE, { keyPath: "id" });
        a.createIndex("staffId", "staffId", { unique: false });
        a.createIndex("date", "date", { unique: false });
      }
      if (!db.objectStoreNames.contains(USERS_STORE)) {
        const u = db.createObjectStore(USERS_STORE, { keyPath: "id" });
        u.createIndex("username", "username", { unique: true });
      }
      if (!db.objectStoreNames.contains(SETTINGS_STORE)) {
        db.createObjectStore(SETTINGS_STORE, { keyPath: "key" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function readAll(db, storeName) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readonly");
    const req = tx.objectStore(storeName).getAll();
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function putOne(db, storeName, value) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readwrite");
    const req = tx.objectStore(storeName).put(value);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

function getSetting(db, key) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(SETTINGS_STORE, "readonly");
    const req = tx.objectStore(SETTINGS_STORE).get(key);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function loadState(db) {
  const [staff, attendance, advances, users] = await Promise.all([readAll(db, STAFF_STORE), readAll(db, ATTENDANCE_STORE), readAll(db, ADVANCE_STORE), readAll(db, USERS_STORE)]);
  state.staff = Array.isArray(staff) ? staff : [];
  state.attendance = Array.isArray(attendance) ? attendance : [];
  state.advances = Array.isArray(advances) ? advances : [];
  state.users = Array.isArray(users) ? users : [];
}

async function migrateFromLocalStorage(db) {
  if (state.staff.length > 0 || state.attendance.length > 0) return;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;
  try {
    const parsed = JSON.parse(raw);
    const oldStaff = Array.isArray(parsed.staff) ? parsed.staff : [];
    const oldAttendance = Array.isArray(parsed.attendance) ? parsed.attendance : [];
    for (const person of oldStaff) await putOne(db, STAFF_STORE, person);
    for (const rec of oldAttendance) {
      await putOne(db, ATTENDANCE_STORE, {
        id: rec.id || `${rec.staffId}_${rec.date}`,
        staffId: rec.staffId,
        date: rec.date,
        status: rec.status,
        hours: rec.hours,
      });
    }
    await loadState(db);
  } catch (_err) {
    // Ignore invalid old payload.
  }
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }).format(value);
}

function toLocalIsoDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function todayString() {
  return toLocalIsoDate(new Date());
}

function escapeHtml(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function normalizeDepartment(personOrString) {
  if (typeof personOrString === "string") {
    const t = personOrString.trim();
    return t || DEFAULT_DEPARTMENT;
  }
  const t = (personOrString?.department || "").trim();
  return t || DEFAULT_DEPARTMENT;
}

/** @returns {{ name: string, attendanceOnly: boolean } | null} */
function coerceDepartmentCatalogItem(raw) {
  if (raw == null) return null;
  if (typeof raw === "string") {
    const name = raw.trim();
    return name ? { name, attendanceOnly: false } : null;
  }
  if (typeof raw === "object" && raw.name != null) {
    const name = String(raw.name).trim();
    return name ? { name, attendanceOnly: !!raw.attendanceOnly } : null;
  }
  return null;
}

/** @param {unknown[]} arr */
function normalizeDepartmentCatalog(arr) {
  if (!Array.isArray(arr)) return [];
  const byLower = new Map();
  for (const raw of arr) {
    const entry = coerceDepartmentCatalogItem(raw);
    if (!entry) continue;
    const low = entry.name.toLowerCase();
    const prev = byLower.get(low);
    if (!prev) {
      byLower.set(low, { name: entry.name, attendanceOnly: !!entry.attendanceOnly });
    } else {
      byLower.set(low, {
        name: prev.name,
        attendanceOnly: prev.attendanceOnly || !!entry.attendanceOnly,
      });
    }
  }
  return [...byLower.values()].sort((a, b) => a.name.localeCompare(b.name));
}

/** Merge local + remote department catalog; attendanceOnly is true if either side has it. */
function mergeDepartmentCatalogs(localList, remoteList) {
  return normalizeDepartmentCatalog([...(localList || []), ...(remoteList || [])]);
}

/** True when this department is marked "attendance only" in Your departments (no salary / advances). */
function isAttendanceOnlyDepartment(personOrString) {
  const dept = normalizeDepartment(personOrString);
  const entry = customDepartments.find((d) => d.name.toLowerCase() === dept.toLowerCase());
  return entry ? !!entry.attendanceOnly : false;
}

function updateAddStaffSalaryFieldVisibility() {
  if (!staffDepartmentInput || !salaryPerDayInput) return;
  const dept = (staffDepartmentInput.value || "").trim() || DEFAULT_DEPARTMENT;
  const attendanceOnly = isAttendanceOnlyDepartment(dept);
  const label = salaryPerDayInput.closest("label");
  if (label) label.classList.toggle("hidden", attendanceOnly);
  salaryPerDayInput.required = !attendanceOnly;
  if (attendanceOnly) salaryPerDayInput.value = "0";
}

function loadCustomDepartments() {
  try {
    let raw = localStorage.getItem(CUSTOM_DEPTS_STORAGE_KEY);
    if (!raw) raw = sessionStorage.getItem(CUSTOM_DEPTS_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    customDepartments = normalizeDepartmentCatalog(Array.isArray(parsed) ? parsed : []);
  } catch (_err) {
    customDepartments = [];
  }
}

async function mergeCustomDepartmentsFromIndexedDB() {
  if (useCloudDb || !dbRef) return;
  try {
    const row = await getSetting(dbRef, "custom_departments");
    const fromDb = Array.isArray(row?.value) ? row.value : [];
    if (!fromDb.length) return;
    const seen = new Set(customDepartments.map((d) => d.name.toLowerCase()));
    let changed = false;
    for (const d of fromDb) {
      const entry = coerceDepartmentCatalogItem(d);
      if (!entry) continue;
      const lower = entry.name.toLowerCase();
      if (seen.has(lower)) continue;
      seen.add(lower);
      customDepartments.push(entry);
      changed = true;
    }
    if (changed) {
      customDepartments.sort((a, b) => a.name.localeCompare(b.name));
      persistCustomDepartmentsToLocal();
      if (dbRef) {
        putOne(dbRef, SETTINGS_STORE, { key: "custom_departments", value: [...customDepartments] }).catch(() => {});
      }
    }
  } catch (_err) {
    /* ignore */
  }
}

/** Local/session only — safe to call on startup after merging with cloud (does not overwrite Supabase). */
function persistCustomDepartmentsToLocal() {
  const payload = JSON.stringify(customDepartments);
  try {
    localStorage.setItem(CUSTOM_DEPTS_STORAGE_KEY, payload);
  } catch (_e) {
    try {
      sessionStorage.setItem(CUSTOM_DEPTS_STORAGE_KEY, payload);
    } catch (_e2) {
      /* memory-only fallback */
    }
  }
}

function saveCustomDepartments() {
  persistCustomDepartmentsToLocal();
  if (useCloudDb && typeof window.AttendanceCloud?.saveCustomDepartments === "function") {
    window.AttendanceCloud.saveCustomDepartments([...customDepartments]).catch((err) => {
      console.warn("Could not sync custom departments to Supabase (run app_settings SQL in supabase-schema.sql):", err);
    });
  } else if (!useCloudDb && dbRef) {
    putOne(dbRef, SETTINGS_STORE, { key: "custom_departments", value: [...customDepartments] }).catch(() => {});
  }
}

/** @returns {"added"|"duplicate"|"empty"|"default_name"} */
function addCustomDepartment(raw) {
  const name = (raw || "").trim();
  if (!name) return "empty";
  if (name.toLowerCase() === DEFAULT_DEPARTMENT.toLowerCase()) return "default_name";
  if (customDepartments.some((d) => d.name.toLowerCase() === name.toLowerCase())) return "duplicate";
  customDepartments.push({ name, attendanceOnly: false });
  customDepartments.sort((a, b) => a.name.localeCompare(b.name));
  saveCustomDepartments();
  return "added";
}

function removeCustomDepartment(name) {
  customDepartments = customDepartments.filter((d) => d.name !== name);
  saveCustomDepartments();
}

function setDepartmentAttendanceOnly(deptName, attendanceOnly) {
  if (!hasFullStaffAccess()) return;
  const i = customDepartments.findIndex((d) => d.name.toLowerCase() === deptName.toLowerCase());
  if (i < 0) return;
  customDepartments[i] = { ...customDepartments[i], attendanceOnly: !!attendanceOnly };
  customDepartments.sort((a, b) => a.name.localeCompare(b.name));
  saveCustomDepartments();
  if (attendanceOnly) {
    for (const p of state.staff) {
      if (normalizeDepartment(p).toLowerCase() !== deptName.toLowerCase()) continue;
      if (Number(p.salaryPerDay) === 0) continue;
      p.salaryPerDay = 0;
      saveStaffRecord(p).catch(() => {});
    }
  }
  refreshDepartmentDatalistAndFilters();
  renderCustomDepartmentsList();
  renderStaff();
  renderBulkAttendanceRows();
  renderAdvanceStaffOptions();
  renderAdvanceBalance();
  renderSalaryOverview();
  renderWeeklyPaidSummary();
  updateAddStaffSalaryFieldVisibility();
}

function collectAllDepartmentNames() {
  const set = new Set([DEFAULT_DEPARTMENT, ...customDepartments.map((d) => d.name)]);
  state.staff.forEach((s) => set.add(normalizeDepartment(s)));
  return [...set].sort((a, b) => a.localeCompare(b));
}

function renderCustomDepartmentsList() {
  if (!customDepartmentsList) return;
  const entries = [...customDepartments].sort((a, b) => a.name.localeCompare(b.name));
  if (!entries.length) {
    customDepartmentsList.innerHTML = "<li class=\"hint\">No saved department names yet. Add one above, or assign a department when adding or editing staff.</li>";
    return;
  }
  customDepartmentsList.innerHTML = entries.map((e) => {
    const n = e.name;
    const inUse = state.staff.some((s) => normalizeDepartment(s) === n);
    const enc = encodeURIComponent(n);
    const checked = e.attendanceOnly ? " checked" : "";
    return `
      <li class="dept-manage-item">
        <span class="dept-manage-name">${escapeHtml(n)}</span>
        <label class="dept-attendance-only-label">
          <input type="checkbox" class="js-dept-attendance-only" data-dept="${enc}"${checked}>
          Attendance only (no salary)
        </label>
        ${inUse ? "<span class=\"hint\">(assigned to staff)</span>" : `<button type="button" class="js-remove-custom-dept" data-dept="${enc}">Remove</button>`}
      </li>
    `;
  }).join("");
}

function clearDomNode(el) {
  if (!el) return;
  if (typeof el.replaceChildren === "function") {
    el.replaceChildren();
  } else {
    while (el.firstChild) el.removeChild(el.firstChild);
  }
}

function fillDepartmentFilterSelect(selectEl) {
  if (!selectEl) return;
  const prev = selectEl.value;
  const names = collectAllDepartmentNames();
  clearDomNode(selectEl);
  const optAll = document.createElement("option");
  optAll.value = "";
  optAll.textContent = "All departments";
  selectEl.appendChild(optAll);
  names.forEach((n) => {
    const opt = document.createElement("option");
    opt.value = n;
    opt.textContent = n;
    selectEl.appendChild(opt);
  });
  if (prev && [...selectEl.options].some((o) => o.value === prev)) selectEl.value = prev;
}

/** Mark Attendance: no "All departments" — user must pick one before editing. */
function fillMarkAttendanceDepartmentSelect() {
  if (!filterDeptMark) return;
  const prev = filterDeptMark.value;
  const names = collectAllDepartmentNames();
  clearDomNode(filterDeptMark);
  const optPlaceholder = document.createElement("option");
  optPlaceholder.value = "";
  optPlaceholder.textContent = "— Select department —";
  filterDeptMark.appendChild(optPlaceholder);
  names.forEach((n) => {
    const opt = document.createElement("option");
    opt.value = n;
    opt.textContent = n;
    filterDeptMark.appendChild(opt);
  });
  if (prev && [...filterDeptMark.options].some((o) => o.value === prev)) filterDeptMark.value = prev;
}

function isMarkAttendanceDepartmentSelected() {
  return !!(filterDeptMark?.value && String(filterDeptMark.value).trim());
}

/** Weekly Salary: require a department before dates, refresh, or exports. */
function fillWeeklySalaryDepartmentSelect() {
  if (!filterDeptSalary) return;
  const prev = filterDeptSalary.value;
  const names = collectAllDepartmentNames();
  clearDomNode(filterDeptSalary);
  const optPlaceholder = document.createElement("option");
  optPlaceholder.value = "";
  optPlaceholder.textContent = "— Select department —";
  filterDeptSalary.appendChild(optPlaceholder);
  names.forEach((n) => {
    const opt = document.createElement("option");
    opt.value = n;
    opt.textContent = n;
    filterDeptSalary.appendChild(opt);
  });
  if (prev && [...filterDeptSalary.options].some((o) => o.value === prev)) filterDeptSalary.value = prev;
}

function isWeeklySalaryDepartmentSelected() {
  return !!(filterDeptSalary?.value && String(filterDeptSalary.value).trim());
}

function updateWeeklySalaryDeptGate() {
  const ok = isWeeklySalaryDepartmentSelected();
  if (salaryStartDateInput) salaryStartDateInput.disabled = !ok;
  if (salaryEndDateInput) salaryEndDateInput.disabled = !ok;
  const salarySubmitBtn = salaryForm?.querySelector('button[type="submit"]');
  if (salarySubmitBtn) salarySubmitBtn.disabled = !ok;
  if (downloadWeeklyPdfBtn) downloadWeeklyPdfBtn.disabled = !ok;
  if (downloadWeeklyCsvBtn) downloadWeeklyCsvBtn.disabled = !ok;
  if (applySalaryDeductionsBtn) applySalaryDeductionsBtn.disabled = !ok;
}

function updateMarkAttendanceDeptGate() {
  const ok = isMarkAttendanceDepartmentSelected();
  if (bulkAttendanceDate) bulkAttendanceDate.disabled = !ok;
  if (bulkAttendanceRefreshBtn) bulkAttendanceRefreshBtn.disabled = !ok;
}

/** Options for per-staff department &lt;select&gt; (full list, not datalist). */
function buildDepartmentSelectOptionsHtml(currentDept) {
  const names = collectAllDepartmentNames();
  const curNorm = normalizeDepartment({ department: currentDept });
  return names
    .map((n) => {
      const selected = n.toLowerCase() === curNorm.toLowerCase() ? " selected" : "";
      return `<option value="${escapeHtml(n)}"${selected}>${escapeHtml(n)}</option>`;
    })
    .join("");
}

const DEPARTMENT_FILTER_IDS = [
  "filter-dept-salary",
  "filter-dept-weekly-paid",
  "filter-dept-records",
  "filter-dept-mark",
  "filter-dept-staff",
  "filter-dept-advance",
];

function refreshDepartmentDatalistAndFilters() {
  try {
    const dl = document.getElementById("dept-datalist");
    if (dl) {
      clearDomNode(dl);
      collectAllDepartmentNames().forEach((n) => {
        const opt = document.createElement("option");
        opt.value = n;
        dl.appendChild(opt);
      });
    }
    DEPARTMENT_FILTER_IDS.forEach((id) => {
      if (id === "filter-dept-mark") {
        fillMarkAttendanceDepartmentSelect();
      } else if (id === "filter-dept-salary") {
        fillWeeklySalaryDepartmentSelect();
      } else {
        fillDepartmentFilterSelect(document.getElementById(id));
      }
    });
  } catch (_err) {
    /* ignore */
  }
}

function getDepartmentFilter(selectEl) {
  const v = selectEl?.value;
  if (!v || v === "") return null;
  return v;
}

function filterStaffByDepartment(list, deptFilter) {
  if (!deptFilter) return list;
  return list.filter((p) => normalizeDepartment(p) === deptFilter);
}

async function ensureStaffDepartments() {
  const needSave = [];
  for (const p of state.staff) {
    if (!p.department || !String(p.department).trim()) {
      p.department = DEFAULT_DEPARTMENT;
      needSave.push(p);
    }
  }
  await Promise.all(needSave.map((p) => saveStaffRecord(p)));
}

function getStaffById(staffId) {
  return state.staff.find((item) => item.id === staffId);
}

function getActiveStaff() {
  return state.staff.filter((item) => item.isActive !== false);
}

function getDisabledStaff() {
  return state.staff.filter((item) => item.isActive === false);
}

function getAdvanceSummary(staffId, startDate, endDate) {
  const list = state.advances.filter((a) => a.staffId === staffId);
  const previous = list.reduce((sum, entry) => {
    if (entry.date >= startDate) return sum;
    return entry.type === "taken" ? sum + entry.amount : sum - entry.amount;
  }, 0);
  const takenInRange = list.reduce((sum, entry) => {
    if (entry.date < startDate || entry.date > endDate || entry.type !== "taken") return sum;
    return sum + entry.amount;
  }, 0);
  const settledInRange = list.reduce((sum, entry) => {
    if (entry.date < startDate || entry.date > endDate || entry.type !== "settle") return sum;
    return sum + entry.amount;
  }, 0);
  const outstanding = Math.max(0, previous + takenInRange - settledInRange);
  return { previous, takenInRange, settledInRange, outstanding };
}

function getLatestAttendanceDate() {
  if (!state.attendance.length) return todayString();
  return state.attendance.reduce((max, row) => (row.date > max ? row.date : max), state.attendance[0].date);
}

function getDateRangeFromLatest(latestDate, period) {
  const base = new Date(`${latestDate}T00:00:00`);
  if (period === "monthly") {
    const start = new Date(base.getFullYear(), base.getMonth(), 1);
    const end = new Date(base.getFullYear(), base.getMonth() + 1, 0);
    return [toLocalIsoDate(start), toLocalIsoDate(end)];
  }
  const day = base.getDay(); // Sunday=0 ... Saturday=6
  const diffToSunday = -day;
  const start = new Date(base);
  start.setDate(base.getDate() + diffToSunday);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  return [toLocalIsoDate(start), toLocalIsoDate(end)];
}

function formatDateLabel(dateStr) {
  const date = new Date(`${dateStr}T00:00:00`);
  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit" });
}

async function transliterateToHindi(name) {
  const key = (name || "").trim().toLowerCase();
  if (!key) return "";
  if (hindiNameCache[key]) return hindiNameCache[key];
  const hasDevanagari = (s) => typeof s === "string" && /[\u0900-\u097F]/.test(s);

  try {
    const url = `https://inputtools.google.com/request?text=${encodeURIComponent(name)}&itc=hi-t-i0-und&num=1`;
    const res = await fetch(url);
    const data = await res.json();
    if (Array.isArray(data) && data[0] === "SUCCESS" && data[1]?.[0]?.[1]?.[0]) {
      const value = data[1][0][1][0];
      if (value) {
        hindiNameCache[key] = value;
        return value;
      }
    }
  } catch (_err) {
    /* Google Input Tools often blocked by CORS or network — try fallback */
  }

  try {
    const res = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(name)}&langpair=en|hi`,
    );
    const data = await res.json();
    const t = data?.responseData?.translatedText;
    if (typeof t === "string" && hasDevanagari(t)) {
      hindiNameCache[key] = t;
      return t;
    }
  } catch (_err) {
    /* ignore */
  }
  return "";
}

function getWeekDays(startDate, endDate) {
  const days = [];
  const start = new Date(`${startDate}T00:00:00`);
  const end = new Date(`${endDate}T00:00:00`);
  const cursor = new Date(start);
  while (cursor <= end) {
    const iso = toLocalIsoDate(cursor);
    days.push({
      iso,
      name: cursor.toLocaleDateString("en-US", { weekday: "short" }),
      label: formatDateLabel(iso),
    });
    cursor.setDate(cursor.getDate() + 1);
  }
  return days;
}

function calculateSalaryForStaff(staff, startDate, endDate) {
  const hourlySalary = isAttendanceOnlyDepartment(staff) ? 0 : Number(staff.salaryPerDay) / WORKING_HOURS_PER_DAY;
  const records = state.attendance.filter((entry) => entry.staffId === staff.id && entry.date >= startDate && entry.date <= endDate);
  let presentDays = 0;
  let absentDays = 0;
  let partialDays = 0;
  let partialHours = 0;
  let extraHours = 0;
  let totalHours = 0;
  for (const row of records) {
    extraHours += Number(row.extraHours) || 0;
    if (row.status === "Present") {
      presentDays += 1;
      totalHours += Number(row.hours) || WORKING_HOURS_PER_DAY;
    } else if (row.status === "Partial") {
      partialDays += 1;
      const currentPartialHours = Number(row.hours) || 0;
      partialHours += currentPartialHours;
      totalHours += currentPartialHours;
    } else {
      absentDays += 1;
    }
  }
  return { presentDays, partialDays, partialHours, extraHours, absentDays, totalHours, payable: totalHours * hourlySalary };
}

function resolveSalaryRange() {
  const customStart = salaryStartDateInput.value;
  const customEnd = salaryEndDateInput.value;

  if (customStart && customEnd && customStart <= customEnd) {
    const startMs = new Date(`${customStart}T12:00:00`).getTime();
    const endMs = new Date(`${customEnd}T12:00:00`).getTime();
    const dayCount = Math.round((endMs - startMs) / 86400000) + 1;
    const periodLabel =
      dayCount >= 28 && dayCount <= 31 ? "Selected period (full month)" : "Selected date range";
    return {
      periodLabel,
      startDate: customStart,
      endDate: customEnd,
    };
  }

  const latestDate = getLatestAttendanceDate();
  const [startDate, endDate] = getDateRangeFromLatest(latestDate, "weekly");
  return {
    periodLabel: "Latest Week (Sunday to Saturday)",
    startDate,
    endDate,
  };
}

function getDateRangeList(startDate, endDate) {
  const out = [];
  const start = new Date(`${startDate}T00:00:00`);
  const end = new Date(`${endDate}T00:00:00`);
  const cursor = new Date(start);
  while (cursor <= end) {
    out.push(toLocalIsoDate(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }
  return out;
}

function getDailySalaryValue(staff, dateIso) {
  if (isAttendanceOnlyDepartment(staff)) return 0;
  const row = state.attendance.find((entry) => entry.staffId === staff.id && entry.date === dateIso);
  if (!row) return 0;
  const hourly = Number(staff.salaryPerDay) / WORKING_HOURS_PER_DAY;
  if (row.status === "Present") return Number(staff.salaryPerDay);
  if (row.status === "Partial") return (Number(row.hours) || 0) * hourly;
  return 0;
}

function closeSalaryPageAttendanceEditor() {
  salaryPageAttendanceEditStaffId = null;
  if (salaryAttendanceEditor) salaryAttendanceEditor.classList.add("hidden");
}

function openSalaryPageAttendanceEditor(staffId) {
  if (!salaryAttendanceEditor || !salaryAttendanceEditorBody) return;
  if (!isWeeklySalaryDepartmentSelected()) {
    window.alert("Select a department first.");
    return;
  }
  const { startDate, endDate } = resolveSalaryRange();
  if (!startDate || !endDate || startDate > endDate) {
    window.alert("Set a valid start and end date first, then Refresh Salary.");
    return;
  }
  const staff = getStaffById(staffId);
  if (!staff) return;
  salaryPageAttendanceEditStaffId = staffId;
  salaryAttendanceEditor.classList.remove("hidden");
  salaryAttendanceEditorTitle.textContent = `Edit attendance — ${staff.name}`;
  salaryAttendanceEditorHint.textContent = `Adjust each day in this range (${startDate} to ${endDate}). Save updates the summary above.`;
  const days = getDateRangeList(startDate, endDate);
  salaryAttendanceEditorBody.innerHTML = days.map((date) => {
    const existing = state.attendance.find((a) => a.staffId === staffId && a.date === date);
    const status = existing?.status || "Absent";
    const partialHours =
      status === "Partial"
        ? Math.min(WORKING_HOURS_PER_DAY, Number(existing?.hours || 0) - Number(existing?.extraHours || 0))
        : 4;
    const extraHours = Number(existing?.extraHours || 0);
    return `
      <tr data-salary-edit-date="${date}">
        <td>${date}</td>
        <td>
          <select class="compact-input js-salary-page-status" aria-label="Status ${date}">
            <option value="Present" ${status === "Present" ? "selected" : ""}>Present</option>
            <option value="Absent" ${status === "Absent" ? "selected" : ""}>Absent</option>
            <option value="Partial" ${status === "Partial" ? "selected" : ""}>Partial</option>
          </select>
        </td>
        <td><input type="number" class="compact-input js-salary-page-partial" min="0" max="8" step="0.5" value="${partialHours}" ${status === "Partial" ? "" : "disabled"} aria-label="Partial hours ${date}"></td>
        <td><input type="number" class="compact-input js-salary-page-extra" min="0" max="16" step="0.5" value="${extraHours}" aria-label="Extra hours ${date}"></td>
      </tr>
    `;
  }).join("");
  salaryAttendanceEditor.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function closeSalaryTableFullscreen() {
  if (!salaryResultMount || !salaryResultBlock || !salaryFullscreenOverlay) return;
  if (salaryFullscreenHost && salaryResultBlock.parentElement === salaryFullscreenHost) {
    salaryResultMount.appendChild(salaryResultBlock);
  }
  salaryFullscreenOverlay.classList.add("hidden");
  document.body.classList.remove("salary-fullscreen-active");
}

function openSalaryTableFullscreen() {
  if (!salaryFullscreenHost || !salaryResultBlock || !salaryFullscreenOverlay) return;
  if (salaryResult.classList.contains("hidden")) return;
  salaryFullscreenHost.appendChild(salaryResultBlock);
  salaryFullscreenOverlay.classList.remove("hidden");
  document.body.classList.add("salary-fullscreen-active");
}

function renderSalaryOverview() {
  updateWeeklySalaryDeptGate();
  if (!isWeeklySalaryDepartmentSelected()) {
    closeSalaryTableFullscreen();
    closeSalaryPageAttendanceEditor();
    currentSalaryRows = [];
    if (salaryResult) {
      salaryResult.classList.remove("hidden");
      if (salaryFullscreenBar) salaryFullscreenBar.classList.add("hidden");
      salaryResult.innerHTML = `<p class="empty">Select a department above to load the salary report.</p>`;
    }
    return;
  }
  const { periodLabel, startDate, endDate } = resolveSalaryRange();
  const deptFilter = getDepartmentFilter(filterDeptSalary);
  let activeStaff = getActiveStaff();
  activeStaff = filterStaffByDepartment(activeStaff, deptFilter);
  if (!activeStaff.length) {
    closeSalaryTableFullscreen();
    salaryResult.classList.add("hidden");
    if (salaryFullscreenBar) salaryFullscreenBar.classList.add("hidden");
    currentSalaryRows = [];
    closeSalaryPageAttendanceEditor();
    return;
  }

  currentSalaryRows = activeStaff.map((person) => {
    const s = calculateSalaryForStaff(person, startDate, endDate);
    const adv = getAdvanceSummary(person.id, startDate, endDate);
    const suggestedDeduction = Math.min(adv.outstanding, s.payable);
    const payment = s.payable - suggestedDeduction;
    const nextAdvance = adv.outstanding - suggestedDeduction;
    return { person, s, adv, suggestedDeduction, payment, nextAdvance };
  });

  const totalPaymentAll = currentSalaryRows.reduce((sum, row) => sum + row.payment, 0);
  const totalHoursAll = currentSalaryRows.reduce((sum, row) => sum + row.s.totalHours, 0);

  const deductionReadOnly = isManagerUser();
  const rows = currentSalaryRows.map((row) => {
    const { person, s, adv, suggestedDeduction, payment, nextAdvance } = row;
    const attOnly = isAttendanceOnlyDepartment(person);
    const money = (v) => (attOnly ? "—" : formatCurrency(v));
    const deductCell = attOnly
      ? "<td>—</td>"
      : deductionReadOnly
        ? `<td>${formatCurrency(suggestedDeduction)}</td>`
        : `<td><input type="number" class="compact-input js-deduct-input" data-staff-id="${person.id}" min="0" step="0.01" value="${suggestedDeduction.toFixed(2)}"></td>`;
    return `
      <tr>
        <td>${escapeHtml(person.name)}</td>
        <td>${escapeHtml(normalizeDepartment(person))}</td>
        <td>${money(person.salaryPerDay)}</td>
        <td>${s.presentDays}</td>
        <td>${s.partialDays}</td>
        <td>${s.partialHours}</td>
        <td>${s.extraHours}</td>
        <td>${s.absentDays}</td>
        <td>${s.totalHours}</td>
        <td>${money(adv.previous)}</td>
        <td>${money(adv.takenInRange)}</td>
        ${deductCell}
        <td>${money(payment)}</td>
        <td>${money(nextAdvance)}</td>
        <td><button type="button" class="js-salary-edit-attendance" data-staff-id="${person.id}">Update attendance</button></td>
      </tr>
    `;
  }).join("");

  const footerRow = `
    <tr class="salary-table-footer">
      <td colspan="8"><strong>Total (all staff)</strong></td>
      <td><strong>${totalHoursAll.toFixed(1)}</strong></td>
      <td colspan="3"></td>
      <td><strong>${formatCurrency(totalPaymentAll)}</strong></td>
      <td colspan="2"></td>
    </tr>
  `;

  const dateList = getDateRangeList(startDate, endDate);
  const dateHead = dateList.map((d) => `<th>${d}</th>`).join("");
  const dateRows = currentSalaryRows.map((row) => {
    const { person } = row;
    const attOnly = isAttendanceOnlyDepartment(person);
    const perDayValues = dateList.map((d) => getDailySalaryValue(person, d));
    const total = perDayValues.reduce((sum, val) => sum + val, 0);
    const cellMoney = (v) => (attOnly ? "—" : formatCurrency(v));
    return `
      <tr>
        <td>${escapeHtml(person.name)}</td>
        <td>${escapeHtml(normalizeDepartment(person))}</td>
        ${perDayValues.map((v) => `<td>${cellMoney(v)}</td>`).join("")}
        <td><strong>${attOnly ? "—" : formatCurrency(total)}</strong></td>
      </tr>
    `;
  }).join("");
  const dateWiseTotalRow = `
    <tr class="salary-table-footer">
      <td colspan="2"><strong>Total (all staff)</strong></td>
      ${dateList
        .map((d) => {
          const daySum = currentSalaryRows.reduce((sum, row) => sum + getDailySalaryValue(row.person, d), 0);
          return `<td><strong>${formatCurrency(daySum)}</strong></td>`;
        })
        .join("")}
      <td><strong>${formatCurrency(
        currentSalaryRows.reduce((sum, row) => {
          const person = row.person;
          return sum + dateList.reduce((s, d) => s + getDailySalaryValue(person, d), 0);
        }, 0),
      )}</strong></td>
    </tr>
  `;

  salaryResult.classList.remove("hidden");
  if (salaryFullscreenBar) salaryFullscreenBar.classList.remove("hidden");
  salaryResult.innerHTML = `
    <p><strong>${periodLabel}:</strong> ${startDate} to ${endDate}</p>
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Staff</th>
            <th>Department</th>
            <th>Daily Wage</th>
            <th>Present</th>
            <th>Partial</th>
            <th>Part Time Hours</th>
            <th>Extra Hours</th>
            <th>Absent</th>
            <th>Total Hours</th>
            <th>Prev Advance</th>
            <th>Advance Taken</th>
            <th>Deduct</th>
            <th>Payment</th>
            <th>Advance Next Week</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
        <tfoot>${footerRow}</tfoot>
      </table>
    </div>
    <h3>Date-wise Salary Table</h3>
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Staff</th>
            <th>Department</th>
            ${dateHead}
            <th>Total</th>
          </tr>
        </thead>
        <tbody>${dateRows}</tbody>
        <tfoot>${dateWiseTotalRow}</tfoot>
      </table>
    </div>
  `;
}

function getDailyMarker(staffId, dateIso) {
  const row = state.attendance.find((entry) => entry.staffId === staffId && entry.date === dateIso);
  if (!row) return "A";
  if (row.status === "Present") return "P";
  if (row.status === "Partial") {
    const hours = Number(row.hours) || 0;
    return `P/${hours}`;
  }
  return "A";
}

function escapeCsvField(val) {
  const s = String(val ?? "");
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

/** Shared rows for PDF (real text, selectable) and CSV (Excel paste). */
async function buildWeeklySheetExportPayload() {
  if (!currentUser || (!hasFullStaffAccess() && !isManagerUser())) return null;
  if (!isWeeklySalaryDepartmentSelected()) return null;
  const deptFilter = getDepartmentFilter(filterDeptSalary);
  let activeStaff = getActiveStaff();
  activeStaff = filterStaffByDepartment(activeStaff, deptFilter);
  if (!activeStaff.length) return null;

  const { startDate, endDate } = resolveSalaryRange();
  const weekDays = getWeekDays(startDate, endDate);
  const deptNote = deptFilter ? ` — ${deptFilter}` : "";
  const sheetLabel = weekDays.length > 10 ? "Salary sheet" : "Week sheet";
  const title = `${sheetLabel} (${formatDateLabel(startDate)} to ${formatDateLabel(endDate)})${deptNote}`;
  let grandTotal = 0;
  const bodyPromises = activeStaff.map(async (person, idx) => {
    const salary = calculateSalaryForStaff(person, startDate, endDate);
    const totalDays = (salary.totalHours / WORKING_HOURS_PER_DAY).toFixed(2).replace(/\.00$/, "");
    const amount = Math.round(salary.payable);
    grandTotal += amount;
    const hindiName = person.hindiName || (await transliterateToHindi(person.name)) || person.name;
    return {
      sr: String(idx + 1),
      nameEn: person.name,
      nameHi: hindiName,
      dept: normalizeDepartment(person),
      wage: String(person.salaryPerDay),
      dayMarkers: weekDays.map((d) => getDailyMarker(person.id, d.iso)),
      totalDays,
      extraHours: String(salary.extraHours),
      amount: String(amount),
      payment: String(amount),
      notes: "",
      sign: "",
    };
  });
  const body = await Promise.all(bodyPromises);

  const headRow = [
    "Sr",
    "Name (En)",
    "Name (Hi)",
    "Dept",
    "Wage",
    ...weekDays.map((d) => `${d.name} ${d.label}`),
    "Days",
    "Ex",
    "Amt",
    "Pay",
    "Notes",
    "Sign",
  ];
  const bodyRows = body.map((r) => [
    r.sr,
    r.nameEn,
    r.nameHi,
    r.dept,
    r.wage,
    ...r.dayMarkers,
    r.totalDays,
    r.extraHours,
    r.amount,
    r.payment,
    r.notes,
    r.sign,
  ]);

  return {
    title,
    startDate,
    endDate,
    weekDays,
    headRow,
    bodyRows,
    grandTotal,
  };
}

async function exportWeeklySheetCsv() {
  const data = await buildWeeklySheetExportPayload();
  if (!data) return;
  const lines = [];
  lines.push(data.headRow.map(escapeCsvField).join(","));
  data.bodyRows.forEach((row) => {
    lines.push(row.map(escapeCsvField).join(","));
  });
  const payCol = 5 + data.weekDays.length + 3;
  const totalLine = Array(data.headRow.length).fill("");
  totalLine[0] = "Total payment (all staff)";
  totalLine[payCol] = String(data.grandTotal);
  lines.push(totalLine.map(escapeCsvField).join(","));
  const blob = new Blob(["\uFEFF" + lines.join("\r\n")], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `attendance-week-${data.startDate}-to-${data.endDate}.csv`;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

async function exportWeeklyPdf() {
  if (!window.jspdf?.jsPDF || typeof window.jspdf.jsPDF !== "function") return;
  const data = await buildWeeklySheetExportPayload();
  if (!data) return;
  const doc = new window.jspdf.jsPDF({ orientation: "landscape", unit: "pt", format: "a4" });
  if (typeof doc.autoTable !== "function") {
    window.alert("PDF table could not load. Use “Download CSV (Excel)” to copy data into Excel.");
    return;
  }
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  const titleLines = doc.splitTextToSize(data.title, doc.internal.pageSize.getWidth() - 40);
  doc.text(titleLines, 24, 28);
  const startY = 28 + titleLines.length * 12 + 4;
  const hiOk = await ensureHindiFont(doc);
  /** Noto Sans Devanagari has no Latin glyphs — using it for the whole table hid headers (English) and day markers (P/A). Helvetica for table; Noto only on column index 2 (Name Hi). */
  const columnStyles = hiOk ? { 2: { font: "NotoSansDevanagari", fontStyle: "normal" } } : {};
  doc.autoTable({
    head: [data.headRow],
    body: data.bodyRows,
    startY,
    styles: {
      font: "helvetica",
      fontStyle: "normal",
      fontSize: 9,
      cellPadding: 2,
      valign: "middle",
      overflow: "linebreak",
    },
    headStyles: {
      font: "helvetica",
      fontStyle: "bold",
      fillColor: [15, 118, 110],
      textColor: 255,
      fontSize: 9,
    },
    bodyStyles: { font: "helvetica", fontStyle: "normal", fontSize: 9 },
    columnStyles,
    theme: "grid",
    margin: { left: 20, right: 20 },
    tableWidth: "auto",
    showHead: "everyPage",
  });
  const fy = doc.lastAutoTable?.finalY ?? startY;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(`Total payment (all staff): ${data.grandTotal}`, 24, fy + 14);
  doc.save(`attendance-week-${data.startDate}-to-${data.endDate}.pdf`);
}

function renderStaff() {
  const deptFilter = getDepartmentFilter(filterDeptStaff);
  let list = getActiveStaff();
  list = filterStaffByDepartment(list, deptFilter);
  const staffTheadRow = document.querySelector("#staff-salary-page table thead tr");
  if (staffTheadRow) {
    staffTheadRow.innerHTML = hasFullStaffAccess()
      ? "<th>Name</th><th>Department</th><th>Salary / Day</th><th>Salary / Hour (8h/day)</th><th>Action</th>"
      : "<th>Name</th><th>Department</th><th>Salary / Day</th><th>Salary / Hour (8h/day)</th>";
  }
  const emptyCols = hasFullStaffAccess() ? 5 : 4;
  if (!list.length) {
    staffTableBody.innerHTML = `<tr><td colspan="${emptyCols}" class="empty">No staff added yet.</td></tr>`;
    return;
  }
  const readonly = !hasFullStaffAccess();
  staffTableBody.innerHTML = list.map((person) => {
    const dept = normalizeDepartment(person);
    const attOnly = isAttendanceOnlyDepartment(person);
    const hourly = attOnly ? 0 : person.salaryPerDay / WORKING_HOURS_PER_DAY;
    if (readonly) {
      return `
      <tr>
        <td>${escapeHtml(person.name)}</td>
        <td>${escapeHtml(dept)}</td>
        <td>${attOnly ? "—" : formatCurrency(person.salaryPerDay)}</td>
        <td>${attOnly ? "—" : formatCurrency(hourly)}</td>
      </tr>`;
    }
    if (attOnly) {
      return `
      <tr>
        <td>${escapeHtml(person.name)}</td>
        <td>
          <select class="compact-input dept-input-wide js-staff-dept-input" data-staff-id="${person.id}" data-prev-dept="${encodeURIComponent(dept)}" title="Choose department" aria-label="Department for ${escapeHtml(person.name)}">
            ${buildDepartmentSelectOptionsHtml(dept)}
          </select>
        </td>
        <td>—</td>
        <td>—</td>
        <td><span class="hint">Attendance only (no salary)</span></td>
      </tr>
    `;
    }
    return `
      <tr>
        <td>${escapeHtml(person.name)}</td>
        <td>
          <select class="compact-input dept-input-wide js-staff-dept-input" data-staff-id="${person.id}" data-prev-dept="${encodeURIComponent(dept)}" title="Choose department" aria-label="Department for ${escapeHtml(person.name)}">
            ${buildDepartmentSelectOptionsHtml(dept)}
          </select>
        </td>
        <td>${formatCurrency(person.salaryPerDay)}</td>
        <td>${formatCurrency(hourly)}</td>
        <td>
          <input type="number" class="compact-input js-salary-input" data-staff-id="${person.id}" min="0" step="0.01" value="${person.salaryPerDay}">
          <button type="button" class="js-update-salary" data-staff-id="${person.id}">Update</button>
          <span class="update-msg hidden" data-msg-for="${person.id}">Updated</span>
        </td>
      </tr>
    `;
  }).join("");
}

function readStoredPrevDepartment(input, person) {
  const raw = input.getAttribute("data-prev-dept");
  if (!raw) return normalizeDepartment(person);
  try {
    return decodeURIComponent(raw);
  } catch (_e) {
    return normalizeDepartment(person);
  }
}

async function persistStaffDepartmentChange(input) {
  if (!hasFullStaffAccess()) return;
  const staffId = input.dataset.staffId;
  const person = getStaffById(staffId);
  if (!person) return;
  const next = (input.value || "").trim() || DEFAULT_DEPARTMENT;
  const prev = readStoredPrevDepartment(input, person).trim();
  if (next.toLowerCase() === prev.toLowerCase()) return;
  const rollbackDept = person.department;
  person.department = next;
  if (isAttendanceOnlyDepartment(person)) {
    person.salaryPerDay = 0;
  }
  try {
    await saveStaffRecord(person);
  } catch (err) {
    person.department = rollbackDept;
    console.error(err);
    window.alert(`Could not save department to the database: ${err?.message || String(err)}`);
    renderStaff();
    return;
  }
  addCustomDepartment(next);
  renderCustomDepartmentsList();
  refreshDepartmentDatalistAndFilters();
  renderStaff();
  renderBulkAttendanceRows();
  renderDisabledStaffRows();
  renderAdvanceStaffOptions();
  renderAttendanceUpdateStaffOptions();
  renderAttendanceHistory();
  renderSalaryOverview();
  renderWeeklyPaidSummary();
  renderAdvanceBalance();
}

function getWeeklyRangeByDate(dateStr) {
  const base = new Date(`${dateStr}T00:00:00`);
  const day = base.getDay();
  const start = new Date(base);
  start.setDate(base.getDate() - day);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  return [toLocalIsoDate(start), toLocalIsoDate(end)];
}

function getMonthlyRangeByDate(dateStr) {
  const base = new Date(`${dateStr}T00:00:00`);
  const start = new Date(base.getFullYear(), base.getMonth(), 1);
  const end = new Date(base.getFullYear(), base.getMonth() + 1, 0);
  return [toLocalIsoDate(start), toLocalIsoDate(end)];
}

function renderAttendanceHistory() {
  const ref = attendanceRefDate.value || todayString();
  const mode = attendanceViewMode.value || "weekly";
  const deptFilter = getDepartmentFilter(filterDeptRecords);
  const [startDate, endDate] = mode === "monthly" ? getMonthlyRangeByDate(ref) : getWeeklyRangeByDate(ref);
  const days = getDateRangeList(startDate, endDate);
  let staffForRange = state.staff.filter((person) => {
    if (person.isActive !== false) return true;
    return state.attendance.some((entry) => entry.staffId === person.id && entry.date >= startDate && entry.date <= endDate);
  });
  staffForRange = filterStaffByDepartment(staffForRange, deptFilter);

  attendanceTableHead.innerHTML = `
    <tr>
      <th>Staff</th>
      <th>Dept</th>
      ${days.map((d) => `<th>${formatDateLabel(d)}</th>`).join("")}
    </tr>
  `;

  if (!staffForRange.length) {
    attendanceTableBody.innerHTML = `<tr><td colspan="${2 + days.length}" class="empty">No attendance records yet.</td></tr>`;
    return;
  }

  attendanceTableBody.innerHTML = staffForRange.map((person) => {
    const cells = days.map((date) => {
      const row = state.attendance.find((entry) => entry.staffId === person.id && entry.date === date);
      if (!row || row.status === "Absent") return "<td>X</td>";
      if (row.status === "Present") return "<td>P</td>";
      const extra = Number(row.extraHours || 0);
      const partialHours = Math.max(0, (Number(row.hours) || 0) - extra);
      const marker = partialHours === 4 ? "P/2" : `P/${partialHours}`;
      return `<td>${marker}</td>`;
    }).join("");
    return `
      <tr>
        <td>${escapeHtml(person.name)}</td>
        <td>${escapeHtml(normalizeDepartment(person))}</td>
        ${cells}
      </tr>
    `;
  }).join("");
}

function getBulkRowAttendanceState(person, dateStr) {
  const ex = state.attendance.find((a) => a.staffId === person.id && a.date === dateStr);
  if (!ex) {
    return { status: "Present", partialHours: 4, extraHours: 0 };
  }
  const extraH = Math.max(0, Math.min(16, Number(ex.extraHours) || 0));
  const st = ex.status === "Absent" ? "Absent" : ex.status === "Partial" ? "Partial" : "Present";
  let partialH = 4;
  if (st === "Partial") {
    partialH = Math.max(0, Math.min(WORKING_HOURS_PER_DAY, Number(ex.hours || 0) - extraH));
  }
  return { status: st, partialHours: partialH, extraHours: extraH };
}

/** Every visible staff row has a saved attendance row for this date (same filter as Save). */
function isBulkDateFullyRecordedForCurrentList(dateStr) {
  if (!dateStr) return false;
  const list = getBulkAttendanceStaffList();
  if (!list.length) return false;
  return list.every((person) => state.attendance.some((a) => a.staffId === person.id && a.date === dateStr));
}

function updateBulkSaveButtonState() {
  if (!bulkSaveAllBtn || !bulkAttendanceDate?.value) return;
  if (!isMarkAttendanceDepartmentSelected()) {
    bulkSaveAllBtn.disabled = true;
    bulkSaveAllBtn.title = "Select a department first.";
    return;
  }
  const list = getBulkAttendanceStaffList();
  if (!list.length) {
    bulkSaveAllBtn.disabled = true;
    bulkSaveAllBtn.title = "";
    return;
  }
  const dateStr = bulkAttendanceDate.value;
  const complete = isBulkDateFullyRecordedForCurrentList(dateStr);
  bulkSaveAllBtn.disabled = complete && !bulkMarkFormDirty;
  bulkSaveAllBtn.title = complete && !bulkMarkFormDirty
    ? "Everyone listed already has attendance for this date. Change a value to save again, or pick another date."
    : "";
}

async function refreshBulkAttendanceData() {
  if (!isMarkAttendanceDepartmentSelected()) return;
  try {
    if (useCloudDb && typeof window.AttendanceCloud?.loadAll === "function") {
      const data = await window.AttendanceCloud.loadAll();
      if (data?.attendance) state.attendance = data.attendance;
    } else if (dbRef) {
      const rows = await readAll(dbRef, ATTENDANCE_STORE);
      state.attendance = Array.isArray(rows) ? rows : [];
    }
  } catch (err) {
    console.error(err);
    window.alert(`Could not refresh attendance: ${err?.message || String(err)}`);
    return;
  }
  bulkMarkFormDirty = false;
  renderBulkAttendanceRows();
}

function bulkAttendanceRowHtml(person, dateStr) {
  const attOnly = isAttendanceOnlyDepartment(person);
  const { status, partialHours, extraHours } = getBulkRowAttendanceState(person, dateStr);
  const presentChk = status === "Present" ? " checked" : "";
  const absentChk = status === "Absent" ? " checked" : "";
  const partialChk = status === "Partial" ? " checked" : "";
  const partialDisabled = status === "Partial" ? "" : " disabled";
  const salaryCell = attOnly ? "<td>—</td>" : `<td>${formatCurrency(person.salaryPerDay)}</td>`;
  const statusCells = `
      <td>
        <div class="status-group">
          <label class="status-option present-option"><input type="radio" name="status-${person.id}" value="Present"${presentChk}>Present</label>
          <label class="status-option absent-option"><input type="radio" name="status-${person.id}" value="Absent"${absentChk}>Absent</label>
          <label class="status-option partial-option"><input type="radio" name="status-${person.id}" value="Partial"${partialChk}>Partial</label>
        </div>
      </td>
      <td>
        <input type="number" class="compact-input js-partial-hours" data-staff-id="${person.id}" min="0" max="24" step="0.5" value="${partialHours}"${partialDisabled}>
      </td>
      <td>
        <input type="number" class="compact-input js-extra-hours" data-staff-id="${person.id}" min="0" max="16" step="0.5" value="${extraHours}">
      </td>`;
  const rowCore = `
    <tr data-staff-row="${person.id}">
      <td>${escapeHtml(person.name)}</td>
      <td>${escapeHtml(normalizeDepartment(person))}</td>
      ${salaryCell}
      ${statusCells}`;
  if (!canToggleStaffActive()) {
    return `${rowCore}
    </tr>`;
  }
  return `${rowCore}
      <td>
        <button type="button" class="js-disable-staff" data-staff-id="${person.id}">Disable</button>
      </td>
    </tr>
  `;
}

function getBulkAttendanceStaffList() {
  if (!isMarkAttendanceDepartmentSelected()) return [];
  const deptFilter = getDepartmentFilter(filterDeptMark);
  return filterStaffByDepartment(getActiveStaff(), deptFilter);
}

function setBulkAttendanceTableHeader() {
  const row = bulkAttendanceForm?.querySelector("thead tr");
  if (!row) return;
  row.innerHTML = canToggleStaffActive()
    ? "<th>Staff</th><th>Dept</th><th>Salary / Day</th><th>Status</th><th>Hours (if Partial)</th><th>Extra Hours</th><th>Action</th>"
    : "<th>Staff</th><th>Dept</th><th>Salary / Day</th><th>Status</th><th>Hours (if Partial)</th><th>Extra Hours</th>";
}

function renderBulkAttendanceRows() {
  setBulkAttendanceTableHeader();
  const bulkCols = canToggleStaffActive() ? 7 : 6;
  updateMarkAttendanceDeptGate();
  if (!isMarkAttendanceDepartmentSelected()) {
    bulkAttendanceBody.innerHTML = `<tr><td colspan="${bulkCols}" class="empty">Select a department above to load staff and mark attendance.</td></tr>`;
    updateBulkSaveButtonState();
    return;
  }
  const list = getBulkAttendanceStaffList();
  const dateStr = (bulkAttendanceDate?.value || todayString()).trim();
  if (!list.length) {
    bulkAttendanceBody.innerHTML = `<tr><td colspan="${bulkCols}" class="empty">No active staff in this department. Add or enable staff.</td></tr>`;
    updateBulkSaveButtonState();
    return;
  }
  const deptFilter = getDepartmentFilter(filterDeptMark);
  let html = "";
  if (!deptFilter) {
    const byDept = {};
    list.forEach((p) => {
      const d = normalizeDepartment(p);
      if (!byDept[d]) byDept[d] = [];
      byDept[d].push(p);
    });
    Object.keys(byDept).sort((a, b) => a.localeCompare(b)).forEach((d) => {
      html += `<tr class="dept-section-heading"><td colspan="${bulkCols}"><strong>${escapeHtml(d)}</strong></td></tr>`;
      byDept[d].forEach((person) => {
        html += bulkAttendanceRowHtml(person, dateStr);
      });
    });
  } else {
    list.forEach((person) => {
      html += bulkAttendanceRowHtml(person, dateStr);
    });
  }
  bulkAttendanceBody.innerHTML = html;
  bulkAttendanceBody.querySelectorAll("tr[data-staff-row]").forEach((row) => updateStatusOptionStyles(row));
  updateBulkSaveButtonState();
}

function renderDisabledStaffRows() {
  if (!isMarkAttendanceDepartmentSelected()) {
    disabledStaffBody.innerHTML = '<tr><td colspan="4" class="empty">Select a department to see disabled staff.</td></tr>';
    return;
  }
  const deptFilter = getDepartmentFilter(filterDeptMark);
  let disabled = getDisabledStaff();
  disabled = filterStaffByDepartment(disabled, deptFilter);
  if (!disabled.length) {
    disabledStaffBody.innerHTML = '<tr><td colspan="4" class="empty">No disabled staff.</td></tr>';
    return;
  }
  disabledStaffBody.innerHTML = disabled.map((person) => {
    const attOnly = isAttendanceOnlyDepartment(person);
    return `
    <tr>
      <td>${escapeHtml(person.name)}</td>
      <td>${escapeHtml(normalizeDepartment(person))}</td>
      <td>${attOnly ? "—" : formatCurrency(person.salaryPerDay)}</td>
      <td><button type="button" class="js-enable-staff" data-staff-id="${person.id}">Enable</button></td>
    </tr>
  `;
  }).join("");
}

function renderAdvanceStaffOptions() {
  if (!advanceStaffSelect) return;
  const deptFilter = getDepartmentFilter(filterDeptAdvance);
  let staffList = [...state.staff].filter((p) => !isAttendanceOnlyDepartment(p));
  staffList = filterStaffByDepartment(staffList, deptFilter);
  const options = staffList.map((person) => `<option value="${person.id}">${escapeHtml(person.name)} (${escapeHtml(normalizeDepartment(person))})</option>`).join("");
  advanceStaffSelect.innerHTML = options || "";
}

function renderAttendanceUpdateStaffOptions() {
  if (!attendanceUpdateStaff) return;
  const deptFilter = getDepartmentFilter(filterDeptRecords);
  let staffList = [...state.staff];
  staffList = filterStaffByDepartment(staffList, deptFilter);
  const options = staffList.map((person) => `<option value="${person.id}">${escapeHtml(person.name)} (${escapeHtml(normalizeDepartment(person))})</option>`).join("");
  attendanceUpdateStaff.innerHTML = options || "";
}

function loadAttendanceUpdateFormFromExisting() {
  const staffId = attendanceUpdateStaff.value;
  const date = attendanceUpdateDate.value;
  if (!staffId || !date) return;
  const existing = state.attendance.find((entry) => entry.staffId === staffId && entry.date === date);
  const status = existing?.status || "Present";
  const extraHours = Number(existing?.extraHours || 0);
  const partialHours = status === "Partial"
    ? Math.max(0, Math.min(WORKING_HOURS_PER_DAY, Number(existing?.hours || 0) - extraHours))
    : 4;
  attendanceUpdateStatus.value = status;
  attendanceUpdatePartialHours.disabled = status !== "Partial";
  attendanceUpdatePartialHours.value = partialHours;
  attendanceUpdateExtraHours.value = extraHours;
}

function renderAdvanceBalance() {
  if (!advanceBalanceBody) return;
  const deptFilter = getDepartmentFilter(filterDeptAdvance);
  let activeStaff = getActiveStaff().filter((p) => !isAttendanceOnlyDepartment(p));
  activeStaff = filterStaffByDepartment(activeStaff, deptFilter);
  if (!activeStaff.length) {
    advanceBalanceBody.innerHTML = '<tr><td colspan="2" class="empty">No records.</td></tr>';
    return;
  }
  advanceBalanceBody.innerHTML = activeStaff.map((person) => {
    const bal = getAdvanceSummary(person.id, "0001-01-01", "9999-12-31").outstanding;
    return `<tr><td>${escapeHtml(person.name)} <span class="hint">(${escapeHtml(normalizeDepartment(person))})</span></td><td>${formatCurrency(bal)}</td></tr>`;
  }).join("");
}

function renderAdvanceHistory() {
  if (!advanceHistoryBody) return;
  if (!state.advances.length) {
    advanceHistoryBody.innerHTML = '<tr><td colspan="5" class="empty">No advance transactions yet.</td></tr>';
    return;
  }
  const sorted = [...state.advances].sort((a, b) => b.date.localeCompare(a.date));
  advanceHistoryBody.innerHTML = sorted.slice(0, 100).map((entry) => {
    const staff = getStaffById(entry.staffId);
    return `
      <tr>
        <td>${entry.date}</td>
        <td>${staff ? staff.name : "Unknown"}</td>
        <td>${entry.type === "taken" ? "Advance Taken" : "Settle / Deduct"}</td>
        <td>${formatCurrency(entry.amount)}</td>
        <td>${entry.note || ""}</td>
      </tr>
    `;
  }).join("");
}

function renderWeeklyPaidSummary() {
  const startDate = weeklyPaidStartDateInput.value;
  const endDate = weeklyPaidEndDateInput.value;
  currentWeeklySummaryRange = { startDate, endDate };
  if (!startDate || !endDate || startDate > endDate) {
    weeklyPaidHead.innerHTML = "";
    weeklyPaidBody.innerHTML = '<tr><td colspan="6" class="empty">Please select valid dates.</td></tr>';
    return;
  }
  const dateList = getDateRangeList(startDate, endDate);
  const deptFilter = getDepartmentFilter(filterDeptWeeklyPaid);
  let staffForRange = state.staff.filter((person) => {
    if (person.isActive !== false) return true;
    return state.attendance.some((a) => a.staffId === person.id && a.date >= startDate && a.date <= endDate);
  });
  staffForRange = filterStaffByDepartment(staffForRange, deptFilter);
  if (!staffForRange.length) {
    weeklyPaidHead.innerHTML = "";
    weeklyPaidBody.innerHTML = '<tr><td colspan="6" class="empty">No data for selected range.</td></tr>';
    return;
  }

  weeklyPaidHead.innerHTML = `
    <tr>
      <th>Sr</th>
      <th>Name</th>
      <th>Dept</th>
      <th>Daily Wage</th>
      ${dateList.map((d) => `<th>${formatDateLabel(d)}</th>`).join("")}
      <th>Total Days</th>
      <th>Amount</th>
      <th>Save</th>
    </tr>
  `;

  let totalPaid = 0;
  const rows = staffForRange.map((person, idx) => {
    const s = calculateSalaryForStaff(person, startDate, endDate);
    const attOnly = isAttendanceOnlyDepartment(person);
    if (!attOnly) totalPaid += s.payable;
    const totalDays = (s.totalHours / WORKING_HOURS_PER_DAY).toFixed(2).replace(/\.00$/, "");
    const dayCells = dateList.map((date) => {
      const entry = state.attendance.find((a) => a.staffId === person.id && a.date === date);
      const status = entry?.status || "Absent";
      const extraHours = Number(entry?.extraHours || 0);
      const partialHours = status === "Partial"
        ? Math.max(0, Math.min(WORKING_HOURS_PER_DAY, Number(entry?.hours || 0) - extraHours))
        : 4;
      return `
        <td data-date="${date}">
          <select class="js-weekly-cell-status compact-input">
            <option value="Present" ${status === "Present" ? "selected" : ""}>P</option>
            <option value="Partial" ${status === "Partial" ? "selected" : ""}>P/2</option>
            <option value="Absent" ${status === "Absent" ? "selected" : ""}>X</option>
          </select>
          <input type="number" class="compact-input js-weekly-cell-partial" min="0" max="8" step="0.5" value="${partialHours}" ${status === "Partial" ? "" : "disabled"} title="Partial hours">
          <input type="number" class="compact-input js-weekly-cell-extra" min="0" max="16" step="0.5" value="${extraHours}" title="Extra hours">
        </td>
      `;
    }).join("");
    return `
      <tr data-weekly-staff-row="${person.id}">
        <td>${idx + 1}</td>
        <td>${escapeHtml(person.name)}</td>
        <td>${escapeHtml(normalizeDepartment(person))}</td>
        <td>${attOnly ? "—" : formatCurrency(person.salaryPerDay)}</td>
        ${dayCells}
        <td>${totalDays}</td>
        <td>${attOnly ? "—" : formatCurrency(s.payable)}</td>
        <td><button type="button" class="js-save-weekly-row" data-staff-id="${person.id}">Save</button></td>
      </tr>
    `;
  }).join("");

  weeklyPaidBody.innerHTML = `
    ${rows}
    <tr>
      <td colspan="${4 + dateList.length + 1}"><strong>Total</strong></td>
      <td><strong>${formatCurrency(totalPaid)}</strong></td>
      <td></td>
    </tr>
  `;
}

function renderWeeklyEditTable(staffId) {
  if (!hasFullStaffAccess()) return;
  if (!currentWeeklySummaryRange?.startDate || !currentWeeklySummaryRange?.endDate) return;
  const staff = getStaffById(staffId);
  if (!staff) return;
  currentWeeklyEditStaffId = staffId;
  weeklyPaidEditor.classList.remove("hidden");
  weeklyPaidEditorTitle.textContent = `Edit Attendance - ${staff.name}`;
  const days = getDateRangeList(currentWeeklySummaryRange.startDate, currentWeeklySummaryRange.endDate);
  weeklyPaidEditorBody.innerHTML = days.map((date) => {
    const existing = state.attendance.find((a) => a.staffId === staffId && a.date === date);
    const status = existing?.status || "Absent";
    const partialHours = status === "Partial" ? Math.min(WORKING_HOURS_PER_DAY, Number(existing?.hours || 0) - Number(existing?.extraHours || 0)) : 4;
    const extraHours = Number(existing?.extraHours || 0);
    return `
      <tr data-edit-date="${date}">
        <td>${date}</td>
        <td>
          <select class="js-edit-status">
            <option value="Present" ${status === "Present" ? "selected" : ""}>Present</option>
            <option value="Absent" ${status === "Absent" ? "selected" : ""}>Absent</option>
            <option value="Partial" ${status === "Partial" ? "selected" : ""}>Partial</option>
          </select>
        </td>
        <td><input type="number" class="compact-input js-edit-partial" min="0" max="8" step="0.5" value="${partialHours}" ${status === "Partial" ? "" : "disabled"}></td>
        <td><input type="number" class="compact-input js-edit-extra" min="0" max="16" step="0.5" value="${extraHours}"></td>
      </tr>
    `;
  }).join("");
}

function updateStatusOptionStyles(row) {
  if (!row) return;
  row.querySelectorAll(".status-option").forEach((opt) => opt.classList.remove("is-selected"));
  const selectedRadio = row.querySelector("input[type='radio']:checked");
  if (selectedRadio) {
    const selectedLabel = selectedRadio.closest(".status-option");
    if (selectedLabel) selectedLabel.classList.add("is-selected");
  }
}

function setPage(pageName) {
  if (!currentUser) {
    setAuthUI();
    return;
  }
  if (isManagerUser() && !["home", "add-staff", "mark-attendance", "weekly-salary", "attendance-records", "info"].includes(pageName)) {
    pageName = "home";
  }
  if (pageName !== "weekly-salary") {
    closeSalaryPageAttendanceEditor();
    closeSalaryTableFullscreen();
  }
  const pages = [homePage, addStaffPage, weeklySalaryPage, weeklyPaidPage, staffSalaryPage, advancePage, attendanceRecordsPage, attendancePage, infoPage];
  if (isAdminUser()) pages.push(userManagementPage);
  pages.forEach((p) => p.classList.add("hidden"));
  if (pageName === "home") homePage.classList.remove("hidden");
  if (pageName === "add-staff") addStaffPage.classList.remove("hidden");
  if (pageName === "weekly-salary") weeklySalaryPage.classList.remove("hidden");
  if (pageName === "weekly-paid") weeklyPaidPage.classList.remove("hidden");
  if (pageName === "staff-salary") staffSalaryPage.classList.remove("hidden");
  if (pageName === "advance") advancePage.classList.remove("hidden");
  if (pageName === "attendance-records") attendanceRecordsPage.classList.remove("hidden");
  if (pageName === "mark-attendance") {
    attendancePage.classList.remove("hidden");
    bulkMarkFormDirty = false;
  }
  if (pageName === "info") infoPage.classList.remove("hidden");
  if (pageName === "user-management" && isAdminUser()) userManagementPage.classList.remove("hidden");
  refreshDepartmentDatalistAndFilters();
  if (pageName === "mark-attendance") {
    renderBulkAttendanceRows();
    renderDisabledStaffRows();
  }
  if (pageName === "weekly-salary") {
    renderSalaryOverview();
  }
}

function flashUpdatedMessage(selector) {
  const msg = document.querySelector(selector);
  if (!msg) return;
  msg.classList.remove("hidden");
  window.setTimeout(() => msg.classList.add("hidden"), 1500);
}

async function saveStaffRecord(person) {
  if (useCloudDb) await window.AttendanceCloud.saveStaff(person);
  else await putOne(dbRef, STAFF_STORE, person);
}

async function saveAttendanceRecord(record) {
  if (useCloudDb) await window.AttendanceCloud.upsertAttendance(record);
  else await putOne(dbRef, ATTENDANCE_STORE, record);
}

function upsertAttendanceInState(record) {
  const idx = state.attendance.findIndex((entry) =>
    entry.staffId === record.staffId && entry.date === record.date
  );
  if (idx >= 0) {
    state.attendance[idx] = { ...state.attendance[idx], ...record };
  } else {
    state.attendance.push(record);
  }
}

async function saveAdvanceRecord(entry) {
  if (useCloudDb) await window.AttendanceCloud.upsertAdvance(entry);
  else await putOne(dbRef, ADVANCE_STORE, entry);
}

async function saveUserRecord(user) {
  if (useCloudDb) await window.AttendanceCloud.upsertUser(user);
  else await putOne(dbRef, USERS_STORE, user);
}

function isAdminUser() {
  return currentUser?.role === "admin";
}

/** Managers may add staff, mark attendance, weekly salary view, attendance records, and disable/enable staff — no salary edits, department list, advances, or user management. */
function isManagerUser() {
  return currentUser?.role === "manager";
}

/** Admin and User roles: can edit staff, departments, salary tools, advances, etc. */
function hasFullStaffAccess() {
  if (!currentUser) return false;
  return !isManagerUser();
}

/** Disable/enable staff (active flag) on Mark Attendance — managers and full-access roles. */
function canToggleStaffActive() {
  if (!currentUser) return false;
  return hasFullStaffAccess() || isManagerUser();
}

function updateRoleBasedUI() {
  if (!currentUser) return;
  const mgr = isManagerUser();
  document.querySelectorAll("[data-requires-full-access]").forEach((el) => {
    el.classList.toggle("hidden", mgr);
  });
  const deptCard = document.getElementById("department-management-card");
  if (deptCard) deptCard.classList.toggle("hidden", mgr);
  if (applySalaryDeductionsBtn) applySalaryDeductionsBtn.classList.toggle("hidden", mgr);
  renderBulkAttendanceRows();
  renderStaff();
}

function renderDashboardWelcome() {
  const wrap = document.getElementById("dashboard-welcome");
  const userLine = document.getElementById("dashboard-user-line");
  const dtLine = document.getElementById("dashboard-datetime");
  if (!wrap || !userLine || !dtLine) return;
  if (!currentUser) {
    wrap.hidden = true;
    userLine.textContent = "";
    dtLine.textContent = "";
    return;
  }
  wrap.hidden = false;
  const role = currentUser.role || "user";
  userLine.textContent = `Signed in as ${currentUser.username} (${role})`;
}

function updateDashboardDateTime() {
  const dtLine = document.getElementById("dashboard-datetime");
  if (!dtLine || !currentUser) return;
  const now = new Date();
  dtLine.textContent = now.toLocaleString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  });
}

function startDashboardClock() {
  stopDashboardClock();
  updateDashboardDateTime();
  dashboardClockTimer = window.setInterval(updateDashboardDateTime, 1000);
}

function stopDashboardClock() {
  if (dashboardClockTimer != null) {
    window.clearInterval(dashboardClockTimer);
    dashboardClockTimer = null;
  }
}

function setAuthUI() {
  const loggedIn = !!currentUser;
  loginPage.classList.toggle("hidden", loggedIn);
  if (!loggedIn) {
    stopDashboardClock();
    renderDashboardWelcome();
    closeSalaryTableFullscreen();
    const pages = [
      homePage,
      addStaffPage,
      weeklySalaryPage,
      weeklyPaidPage,
      staffSalaryPage,
      advancePage,
      attendanceRecordsPage,
      attendancePage,
      infoPage,
      userManagementPage,
    ];
    pages.forEach((p) => p.classList.add("hidden"));
  }
  if (openUserManagementPageBtn) {
    openUserManagementPageBtn.classList.toggle("hidden", !isAdminUser());
  }
  if (loggedIn) {
    renderDashboardWelcome();
    startDashboardClock();
    updateRoleBasedUI();
  }
}

function renderUserManagementActionCell(u) {
  const idAttr = escapeHtml(u.id);
  const statusBtn =
    u.username === "admin"
      ? "<span>—</span>"
      : `<button type="button" class="js-toggle-user" data-user-id="${idAttr}">${u.isActive !== false ? "Disable" : "Enable"}</button>`;
  const resetBtn = `<button type="button" class="js-reset-user-password" data-user-id="${idAttr}">Reset password</button>`;
  return `<div class="user-mgmt-actions">${statusBtn}${resetBtn}</div>`;
}

function renderUsersTable() {
  if (!usersTableBody) return;
  if (!state.users.length) {
    usersTableBody.innerHTML = '<tr><td colspan="4" class="empty">No users.</td></tr>';
    return;
  }
  usersTableBody.innerHTML = state.users.map((u) => `
    <tr>
      <td>${escapeHtml(u.username)}</td>
      <td>${escapeHtml(u.role)}</td>
      <td>${u.isActive !== false ? "Active" : "Disabled"}</td>
      <td>${renderUserManagementActionCell(u)}</td>
    </tr>
  `).join("");
}

staffForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const name = staffNameInput.value.trim();
  let hindiName = staffNameHindiInput.value.trim();
  const department = (staffDepartmentInput?.value || "").trim() || DEFAULT_DEPARTMENT;
  const attOnlyDept = isAttendanceOnlyDepartment(department);
  const salaryPerDay = attOnlyDept ? 0 : Number(salaryPerDayInput.value);
  if (!name) return;
  if (!attOnlyDept && (Number.isNaN(salaryPerDay) || salaryPerDay < 0)) return;
  if (!hindiName) {
    hindiName = await transliterateToHindi(name);
  }
  const person = { id: crypto.randomUUID(), name, hindiName, salaryPerDay, department };
  await saveStaffRecord(person);
  state.staff.push(person);
  if (hasFullStaffAccess()) addCustomDepartment(department);
  refreshDepartmentDatalistAndFilters();
  renderCustomDepartmentsList();
  renderStaff();
  renderBulkAttendanceRows();
  renderDisabledStaffRows();
  renderAdvanceStaffOptions();
  renderAttendanceUpdateStaffOptions();
  renderAdvanceBalance();
  renderSalaryOverview();
  renderWeeklyPaidSummary();
  staffForm.reset();
  updateAddStaffSalaryFieldVisibility();
});

// Per-staff department is a &lt;select&gt; — use change (datalist inputs were unreliable for showing full lists).
staffTableBody.addEventListener("change", (event) => {
  if (!hasFullStaffAccess()) return;
  const sel = event.target.closest(".js-staff-dept-input");
  if (!sel || sel.tagName !== "SELECT") return;
  void persistStaffDepartmentChange(sel);
});

staffTableBody.addEventListener("click", async (event) => {
  if (!hasFullStaffAccess()) return;
  const btn = event.target.closest(".js-update-salary");
  if (!btn) return;
  const staffId = btn.dataset.staffId;
  const salaryInput = staffTableBody.querySelector(`.js-salary-input[data-staff-id="${staffId}"]`);
  const deptInput = staffTableBody.querySelector(`.js-staff-dept-input[data-staff-id="${staffId}"]`);
  if (!salaryInput) return;
  const salaryPerDay = Number(salaryInput.value);
  if (Number.isNaN(salaryPerDay) || salaryPerDay < 0) return;
  const person = getStaffById(staffId);
  if (!person) return;
  if (deptInput) {
    const dept = (deptInput.value || "").trim() || DEFAULT_DEPARTMENT;
    person.department = dept;
    addCustomDepartment(dept);
  }
  person.salaryPerDay = salaryPerDay;
  try {
    await saveStaffRecord(person);
  } catch (err) {
    console.error(err);
    window.alert(`Could not save staff: ${err?.message || String(err)}`);
    return;
  }
  renderStaff();
  renderBulkAttendanceRows();
  renderAdvanceBalance();
  renderSalaryOverview();
  refreshDepartmentDatalistAndFilters();
  renderCustomDepartmentsList();
  flashUpdatedMessage(`.update-msg[data-msg-for="${staffId}"]`);
});

bulkAttendanceBody.addEventListener("change", (event) => {
  const radio = event.target;
  if (radio.matches("input[type='radio']")) {
    const row = radio.closest("tr");
    updateStatusOptionStyles(row);
    const partialInput = row.querySelector(".js-partial-hours");
    partialInput.disabled = radio.value !== "Partial";
  }
  bulkMarkFormDirty = true;
  updateBulkSaveButtonState();
});

bulkAttendanceBody.addEventListener("input", () => {
  bulkMarkFormDirty = true;
  updateBulkSaveButtonState();
});

bulkAttendanceBody.addEventListener("click", async (event) => {
  const disableBtn = event.target.closest(".js-disable-staff");
  if (!disableBtn) return;
  if (!canToggleStaffActive()) return;
  const staffId = disableBtn.dataset.staffId;
  const person = getStaffById(staffId);
  if (!person) return;
  person.isActive = false;
  await saveStaffRecord(person);
  renderStaff();
  renderBulkAttendanceRows();
  renderDisabledStaffRows();
  renderAdvanceStaffOptions();
  renderAdvanceBalance();
  renderSalaryOverview();
});

disabledStaffBody.addEventListener("click", async (event) => {
  if (!canToggleStaffActive()) return;
  const btn = event.target.closest(".js-enable-staff");
  if (!btn) return;
  const staffId = btn.dataset.staffId;
  const person = getStaffById(staffId);
  if (!person) return;
  person.isActive = true;
  await saveStaffRecord(person);
  renderStaff();
  renderBulkAttendanceRows();
  renderDisabledStaffRows();
  renderAdvanceStaffOptions();
  renderAdvanceBalance();
  renderSalaryOverview();
});

bulkAttendanceForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!isMarkAttendanceDepartmentSelected()) {
    window.alert("Please select a department first.");
    return;
  }
  const date = bulkAttendanceDate.value;
  if (!date) return;
  if (bulkSaveAllBtn?.disabled) return;
  const confirmMsg = `Save attendance for all ${getBulkAttendanceStaffList().length} staff shown for ${date}?\n\nPress OK to save, or Cancel to go back without saving.`;
  if (!window.confirm(confirmMsg)) return;
  const tasks = [];
  for (const person of getBulkAttendanceStaffList()) {
    const selected = bulkAttendanceBody.querySelector(`input[name="status-${person.id}"]:checked`);
    const status = selected ? selected.value : "Present";
    const hoursInput = bulkAttendanceBody.querySelector(`.js-partial-hours[data-staff-id="${person.id}"]`);
    const extraInput = bulkAttendanceBody.querySelector(`.js-extra-hours[data-staff-id="${person.id}"]`);
    let partialHours = Number(hoursInput?.value || 0);
    let extraHours = Number(extraInput?.value || 0);
    if (status === "Partial") {
      // Part-time is bounded to one workday shift for salary/day calculation.
      partialHours = Math.max(0, Math.min(WORKING_HOURS_PER_DAY, partialHours));
    }
    extraHours = Math.max(0, Math.min(16, extraHours));
    const baseHours = status === "Present" ? WORKING_HOURS_PER_DAY : status === "Absent" ? 0 : partialHours;
    const hours = baseHours + extraHours;
    const record = { id: `${person.id}_${date}`, staffId: person.id, date, status, hours, extraHours };
    tasks.push(saveAttendanceRecord(record));
    upsertAttendanceInState(record);
  }
  await Promise.all(tasks);
  bulkMarkFormDirty = false;
  renderBulkAttendanceRows();
  renderAttendanceHistory();
  renderSalaryOverview();
});

salaryForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!isWeeklySalaryDepartmentSelected()) {
    window.alert("Please select a department first.");
    return;
  }
  if (salaryStartDateInput.value && salaryEndDateInput.value && salaryStartDateInput.value > salaryEndDateInput.value) {
    return;
  }
  renderSalaryOverview();
});

if (salaryResult) {
  salaryResult.addEventListener("click", (e) => {
    const btn = e.target.closest(".js-salary-edit-attendance");
    if (!btn?.dataset?.staffId) return;
    openSalaryPageAttendanceEditor(btn.dataset.staffId);
  });
}

if (salaryAttendanceEditorForm && salaryAttendanceEditorBody) {
  salaryAttendanceEditorForm.addEventListener("change", (e) => {
    const sel = e.target.closest(".js-salary-page-status");
    if (!sel) return;
    const tr = sel.closest("tr");
    const partial = tr?.querySelector(".js-salary-page-partial");
    if (partial) partial.disabled = sel.value !== "Partial";
  });
  salaryAttendanceEditorForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!salaryPageAttendanceEditStaffId) return;
    const staffId = salaryPageAttendanceEditStaffId;
    const rows = salaryAttendanceEditorBody.querySelectorAll("tr[data-salary-edit-date]");
    const tasks = [];
    rows.forEach((row) => {
      const date = row.getAttribute("data-salary-edit-date");
      if (!date) return;
      const status = row.querySelector(".js-salary-page-status")?.value || "Absent";
      let partial = Number(row.querySelector(".js-salary-page-partial")?.value || 0);
      let extra = Number(row.querySelector(".js-salary-page-extra")?.value || 0);
      partial = Math.max(0, Math.min(WORKING_HOURS_PER_DAY, partial));
      extra = Math.max(0, Math.min(16, extra));
      const base = status === "Present" ? WORKING_HOURS_PER_DAY : status === "Absent" ? 0 : partial;
      const record = {
        id: `${staffId}_${date}`,
        staffId,
        date,
        status,
        hours: base + extra,
        extraHours: extra,
      };
      tasks.push(saveAttendanceRecord(record));
      upsertAttendanceInState(record);
    });
    await Promise.all(tasks);
    closeSalaryPageAttendanceEditor();
    renderAttendanceHistory();
    renderSalaryOverview();
    renderWeeklyPaidSummary();
  });
}

if (salaryAttendanceEditorCancelBtn) {
  salaryAttendanceEditorCancelBtn.addEventListener("click", () => closeSalaryPageAttendanceEditor());
}

applySalaryDeductionsBtn.addEventListener("click", async () => {
  if (!hasFullStaffAccess()) return;
  const { endDate } = resolveSalaryRange();
  const inputs = salaryResult.querySelectorAll(".js-deduct-input");
  const tasks = [];
  for (const input of inputs) {
    const staffId = input.dataset.staffId;
    const row = currentSalaryRows.find((r) => r.person.id === staffId);
    if (!row) continue;
    let deduction = Number(input.value) || 0;
    deduction = Math.max(0, Math.min(deduction, row.adv.outstanding, row.s.payable));
    if (deduction <= 0) continue;
    const entry = {
      id: `${staffId}_${endDate}_settle_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      staffId,
      date: endDate,
      type: "settle",
      amount: deduction,
      note: "Deducted from salary",
    };
    tasks.push(saveAdvanceRecord(entry));
    state.advances.push(entry);
  }
  if (tasks.length) {
    await Promise.all(tasks);
    renderSalaryOverview();
    renderAdvanceBalance();
    renderAdvanceHistory();
  }
});

bulkAttendanceDate?.addEventListener("change", () => {
  bulkMarkFormDirty = false;
  renderBulkAttendanceRows();
});

bulkAttendanceRefreshBtn?.addEventListener("click", () => {
  void refreshBulkAttendanceData();
});

downloadWeeklyPdfBtn.addEventListener("click", async () => {
  if (!currentUser || (!hasFullStaffAccess() && !isManagerUser())) return;
  await exportWeeklyPdf();
});

if (downloadWeeklyCsvBtn) {
  downloadWeeklyCsvBtn.addEventListener("click", async () => {
    if (!currentUser || (!hasFullStaffAccess() && !isManagerUser())) return;
    await exportWeeklySheetCsv();
  });
}

if (salaryFullscreenOpenBtn) {
  salaryFullscreenOpenBtn.addEventListener("click", () => openSalaryTableFullscreen());
}
if (salaryFullscreenCloseBtn) {
  salaryFullscreenCloseBtn.addEventListener("click", () => closeSalaryTableFullscreen());
}
document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  if (salaryFullscreenOverlay && !salaryFullscreenOverlay.classList.contains("hidden")) {
    closeSalaryTableFullscreen();
  }
});

goMarkAttendanceBtn.addEventListener("click", () => setPage("mark-attendance"));
goDashboardBtn.addEventListener("click", () => setPage("home"));
if (openInfoPageBtn) openInfoPageBtn.addEventListener("click", () => setPage("info"));
if (openInfoFromHomeBtn) openInfoFromHomeBtn.addEventListener("click", () => setPage("info"));
openAddStaffPageBtn.addEventListener("click", () => setPage("add-staff"));
openMarkAttendancePageBtn.addEventListener("click", () => setPage("mark-attendance"));
openWeeklySalaryPageBtn.addEventListener("click", () => setPage("weekly-salary"));
openWeeklyPaidPageBtn.addEventListener("click", () => setPage("weekly-paid"));
openStaffSalaryPageBtn.addEventListener("click", () => setPage("staff-salary"));
openAdvancePageBtn.addEventListener("click", () => setPage("advance"));
openUserManagementPageBtn.addEventListener("click", () => setPage("user-management"));
openAttendanceRecordsPageBtn.addEventListener("click", () => setPage("attendance-records"));
attendanceFilterForm.addEventListener("submit", (event) => {
  event.preventDefault();
  renderAttendanceHistory();
});
openAttendanceUpdateBtn.addEventListener("click", () => {
  attendanceUpdateCard.classList.remove("hidden");
  attendanceUpdateDate.value = todayString();
  renderAttendanceUpdateStaffOptions();
  loadAttendanceUpdateFormFromExisting();
  requestAnimationFrame(() => {
    attendanceUpdateCard.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
attendanceUpdateCancelBtn.addEventListener("click", () => {
  attendanceUpdateCard.classList.add("hidden");
});
attendanceUpdateStatus.addEventListener("change", () => {
  attendanceUpdatePartialHours.disabled = attendanceUpdateStatus.value !== "Partial";
});
attendanceUpdateDate.addEventListener("change", loadAttendanceUpdateFormFromExisting);
attendanceUpdateStaff.addEventListener("change", loadAttendanceUpdateFormFromExisting);
attendanceUpdateForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!currentUser || (!hasFullStaffAccess() && !isManagerUser())) return;
  const staffId = attendanceUpdateStaff.value;
  const date = attendanceUpdateDate.value;
  if (!staffId || !date) return;
  let partial = Number(attendanceUpdatePartialHours.value || 0);
  let extra = Number(attendanceUpdateExtraHours.value || 0);
  partial = Math.max(0, Math.min(WORKING_HOURS_PER_DAY, partial));
  extra = Math.max(0, Math.min(16, extra));
  const status = attendanceUpdateStatus.value;
  const base = status === "Present" ? WORKING_HOURS_PER_DAY : status === "Absent" ? 0 : partial;
  const record = {
    id: `${staffId}_${date}`,
    staffId,
    date,
    status,
    hours: base + extra,
    extraHours: extra,
  };
  await saveAttendanceRecord(record);
  upsertAttendanceInState(record);
  attendanceRefDate.value = date;
  renderAttendanceHistory();
  renderSalaryOverview();
  renderWeeklyPaidSummary();
});
weeklyPaidForm.addEventListener("submit", (event) => {
  event.preventDefault();
  renderWeeklyPaidSummary();
});
weeklyPaidBody.addEventListener("click", (event) => {
  if (!hasFullStaffAccess()) return;
  const saveBtn = event.target.closest(".js-save-weekly-row");
  if (!saveBtn || !currentWeeklySummaryRange?.startDate || !currentWeeklySummaryRange?.endDate) return;
  const row = saveBtn.closest("tr[data-weekly-staff-row]");
  if (!row) return;
  const staffId = saveBtn.dataset.staffId;
  const cells = row.querySelectorAll("td[data-date]");
  const tasks = [];
  cells.forEach((cell) => {
    const date = cell.dataset.date;
    const status = cell.querySelector(".js-weekly-cell-status").value;
    let partial = Number(cell.querySelector(".js-weekly-cell-partial").value || 0);
    let extra = Number(cell.querySelector(".js-weekly-cell-extra").value || 0);
    partial = Math.max(0, Math.min(WORKING_HOURS_PER_DAY, partial));
    extra = Math.max(0, Math.min(16, extra));
    const base = status === "Present" ? WORKING_HOURS_PER_DAY : status === "Absent" ? 0 : partial;
    const record = {
      id: `${staffId}_${date}`,
      staffId,
      date,
      status,
      hours: base + extra,
      extraHours: extra,
    };
    tasks.push(saveAttendanceRecord(record));
    upsertAttendanceInState(record);
  });
  Promise.all(tasks).then(() => {
    renderAttendanceHistory();
    renderSalaryOverview();
    renderWeeklyPaidSummary();
  });
});
weeklyPaidBody.addEventListener("change", (event) => {
  const select = event.target.closest(".js-weekly-cell-status");
  if (!select) return;
  const cell = select.closest("td[data-date]");
  if (!cell) return;
  const partialInput = cell.querySelector(".js-weekly-cell-partial");
  partialInput.disabled = select.value !== "Partial";
});
weeklyPaidEditorCancelBtn.addEventListener("click", () => {
  currentWeeklyEditStaffId = null;
  weeklyPaidEditor.classList.add("hidden");
});
weeklyPaidEditorForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!hasFullStaffAccess()) return;
  if (!currentWeeklyEditStaffId) return;
  const rows = weeklyPaidEditorBody.querySelectorAll("tr[data-edit-date]");
  const tasks = [];
  rows.forEach((row) => {
    const date = row.dataset.editDate;
    const status = row.querySelector(".js-edit-status").value;
    let partial = Number(row.querySelector(".js-edit-partial").value || 0);
    let extra = Number(row.querySelector(".js-edit-extra").value || 0);
    partial = Math.max(0, Math.min(WORKING_HOURS_PER_DAY, partial));
    extra = Math.max(0, Math.min(16, extra));
    const base = status === "Present" ? WORKING_HOURS_PER_DAY : status === "Absent" ? 0 : partial;
    const record = {
      id: `${currentWeeklyEditStaffId}_${date}`,
      staffId: currentWeeklyEditStaffId,
      date,
      status,
      hours: base + extra,
      extraHours: extra,
    };
    tasks.push(saveAttendanceRecord(record));
    upsertAttendanceInState(record);
  });
  await Promise.all(tasks);
  renderAttendanceHistory();
  renderSalaryOverview();
  renderWeeklyPaidSummary();
  weeklyPaidEditor.classList.add("hidden");
  currentWeeklyEditStaffId = null;
});

advanceForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!hasFullStaffAccess()) return;
  const staffId = advanceStaffSelect.value;
  const date = advanceDateInput.value;
  const type = advanceTypeSelect.value;
  const amount = Number(advanceAmountInput.value);
  const note = advanceNoteInput.value.trim();
  if (!staffId || !date || !type || Number.isNaN(amount) || amount <= 0) return;
  const entry = {
    id: `${staffId}_${date}_${type}_${Date.now()}`,
    staffId,
    date,
    type,
    amount,
    note,
  };
  await saveAdvanceRecord(entry);
  state.advances.push(entry);
  renderAdvanceBalance();
  renderAdvanceHistory();
  renderSalaryOverview();
  advanceForm.reset();
  advanceDateInput.value = todayString();
});

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const username = loginUsernameInput.value.trim();
  const password = loginPasswordInput.value;
  const user = state.users.find((u) => u.username === username && u.password === password && u.isActive !== false);
  if (!user) {
    loginMessage.textContent = "Invalid username or password.";
    return;
  }
  currentUser = { ...user };
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify({ id: user.id }));
  loginMessage.textContent = "";
  setAuthUI();
  setPage("home");
});

logoutBtn.addEventListener("click", () => {
  currentUser = null;
  localStorage.removeItem(AUTH_USER_KEY);
  setAuthUI();
});

createUserForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!isAdminUser()) return;
  const username = newUserUsernameInput.value.trim();
  const password = newUserPasswordInput.value;
  const role = newUserRoleSelect.value;
  if (!username || !password) return;
  if (state.users.some((u) => u.username.toLowerCase() === username.toLowerCase())) return;
  const user = { id: `u_${Date.now()}`, username, password, role, isActive: true };
  await saveUserRecord(user);
  state.users.push(user);
  renderUsersTable();
  createUserForm.reset();
});

usersTableBody.addEventListener("click", async (event) => {
  if (!isAdminUser()) return;
  const resetBtn = event.target.closest(".js-reset-user-password");
  if (resetBtn) {
    const user = state.users.find((u) => u.id === resetBtn.dataset.userId);
    if (!user) return;
    const entered = window.prompt(`New password for "${user.username}":`, "");
    if (entered === null) return;
    const newPassword = entered.trim();
    if (!newPassword) {
      window.alert("Password cannot be empty.");
      return;
    }
    if (!window.confirm(`Save new password for "${user.username}"?`)) return;
    user.password = newPassword;
    await saveUserRecord(user);
    renderUsersTable();
    return;
  }
  const btn = event.target.closest(".js-toggle-user");
  if (!btn) return;
  const user = state.users.find((u) => u.id === btn.dataset.userId);
  if (!user) return;
  user.isActive = !(user.isActive !== false);
  await saveUserRecord(user);
  renderUsersTable();
});

[
  [filterDeptSalary, () => { renderSalaryOverview(); }],
  [filterDeptWeeklyPaid, () => { renderWeeklyPaidSummary(); }],
  [filterDeptRecords, () => { renderAttendanceHistory(); renderAttendanceUpdateStaffOptions(); }],
  [filterDeptMark, () => {
    bulkMarkFormDirty = false;
    renderBulkAttendanceRows();
    renderDisabledStaffRows();
  }],
  [filterDeptStaff, () => { renderStaff(); }],
  [filterDeptAdvance, () => { renderAdvanceStaffOptions(); renderAdvanceBalance(); }],
].forEach(([el, fn]) => {
  if (el) el.addEventListener("change", fn);
});

function showDepartmentAddFeedback(result) {
  const el = document.getElementById("department-add-feedback");
  if (!el) return;
  const messages = {
    added: "Saved. The new department appears in all department filters and suggestions.",
    duplicate: "That name is already in your list.",
    empty: "Enter a department name first.",
    default_name: `"${DEFAULT_DEPARTMENT}" is already the default — you can use it without adding it here.`,
  };
  if (result === "added" || result === "duplicate" || result === "empty" || result === "default_name") {
    el.hidden = false;
    el.textContent = messages[result];
    window.clearTimeout(showDepartmentAddFeedback._t);
    showDepartmentAddFeedback._t = window.setTimeout(() => {
      el.hidden = true;
      el.textContent = "";
    }, 4000);
  }
}

function commitNewDepartment() {
  if (!hasFullStaffAccess()) return;
  const input = document.getElementById("new-department-name");
  const result = addCustomDepartment(input?.value || "");
  if (input) input.value = "";
  renderCustomDepartmentsList();
  refreshDepartmentDatalistAndFilters();
  window.requestAnimationFrame(() => refreshDepartmentDatalistAndFilters());
  showDepartmentAddFeedback(result);
}

document.addEventListener("click", (event) => {
  if (!event.target.closest("#add-department-btn")) return;
  event.preventDefault();
  commitNewDepartment();
});

newDepartmentNameInput?.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") return;
  event.preventDefault();
  commitNewDepartment();
});

customDepartmentsList?.addEventListener("click", (event) => {
  const btn = event.target.closest(".js-remove-custom-dept");
  if (!btn) return;
  const name = decodeURIComponent(btn.dataset.dept || "");
  removeCustomDepartment(name);
  renderCustomDepartmentsList();
  refreshDepartmentDatalistAndFilters();
});

customDepartmentsList?.addEventListener("change", (event) => {
  const cb = event.target.closest(".js-dept-attendance-only");
  if (!cb || !hasFullStaffAccess()) return;
  const name = decodeURIComponent(cb.dataset.dept || "");
  if (!name) return;
  setDepartmentAttendanceOnly(name, cb.checked);
});

staffDepartmentInput?.addEventListener("input", updateAddStaffSalaryFieldVisibility);
staffDepartmentInput?.addEventListener("change", updateAddStaffSalaryFieldVisibility);

function getColorTheme() {
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

function applyColorTheme(theme) {
  if (theme === "light") {
    document.documentElement.setAttribute("data-theme", "light");
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (_e) {}
  themeToggleButtons.forEach((btn) => {
    btn.textContent = theme === "light" ? "Dark theme" : "Light theme";
    btn.setAttribute(
      "aria-label",
      theme === "light" ? "Switch to dark theme" : "Switch to light theme",
    );
  });
}

function initThemeToggle() {
  if (!themeToggleButtons.length) return;
  applyColorTheme(getColorTheme());
  themeToggleButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      applyColorTheme(getColorTheme() === "light" ? "dark" : "light");
    });
  });
}

async function init() {
  useCloudDb = !!window.AttendanceCloud?.isConfigured?.();
  renderDbStatus();
  let cloudCustomDepartments = [];
  if (useCloudDb) {
    const cloudData = await window.AttendanceCloud.loadAll();
    state.staff = Array.isArray(cloudData?.staff) ? cloudData.staff : [];
    state.attendance = Array.isArray(cloudData?.attendance) ? cloudData.attendance : [];
    state.advances = Array.isArray(cloudData?.advances) ? cloudData.advances : [];
    state.users = Array.isArray(cloudData?.users) ? cloudData.users : [];
    cloudCustomDepartments = Array.isArray(cloudData?.customDepartments) ? cloudData.customDepartments : [];
  } else {
    dbRef = await openDatabase();
    await loadState(dbRef);
    await migrateFromLocalStorage(dbRef);
  }
  loadCustomDepartments();
  if (useCloudDb) {
    customDepartments = mergeDepartmentCatalogs(customDepartments, cloudCustomDepartments);
    persistCustomDepartmentsToLocal();
  } else {
    await mergeCustomDepartmentsFromIndexedDB();
  }
  await ensureStaffDepartments();
  refreshDepartmentDatalistAndFilters();
  renderCustomDepartmentsList();
  if (!state.users.some((u) => u.username === "admin")) {
    const adminUser = { id: "admin", username: "admin", password: "ankita00", role: "admin", isActive: true };
    await saveUserRecord(adminUser);
    state.users.push(adminUser);
  }
  const authRaw = localStorage.getItem(AUTH_USER_KEY);
  if (authRaw) {
    try {
      const parsed = JSON.parse(authRaw);
      currentUser = state.users.find((u) => u.id === parsed.id && u.isActive !== false) || null;
    } catch (_err) {
      currentUser = null;
    }
  }
  bulkAttendanceDate.value = todayString();
  attendanceRefDate.value = todayString();
  attendanceViewMode.value = "weekly";
  const [weekStart, weekEnd] = getDateRangeFromLatest(getLatestAttendanceDate(), "weekly");
  salaryStartDateInput.value = weekStart;
  salaryEndDateInput.value = weekEnd;
  weeklyPaidStartDateInput.value = weekStart;
  weeklyPaidEndDateInput.value = weekEnd;
  advanceDateInput.value = todayString();
  renderStaff();
  renderBulkAttendanceRows();
  renderDisabledStaffRows();
  renderAdvanceStaffOptions();
  renderAttendanceUpdateStaffOptions();
  renderAdvanceBalance();
  renderAdvanceHistory();
  renderUsersTable();
  renderAttendanceHistory();
  renderSalaryOverview();
  renderWeeklyPaidSummary();
  updateAddStaffSalaryFieldVisibility();
  setAuthUI();
  if (currentUser) setPage("home");
}

initThemeToggle();
init();
