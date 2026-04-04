const STORAGE_KEY = "attendance_salary_app_v1";
const DB_NAME = "attendance_salary_db";
const DB_VERSION = 1;
const STAFF_STORE = "staff";
const ATTENDANCE_STORE = "attendance";
const ADVANCE_STORE = "advances";
const WORKING_HOURS_PER_DAY = 8;

const staffForm = document.getElementById("staff-form");
const staffNameInput = document.getElementById("staff-name");
const staffNameHindiInput = document.getElementById("staff-name-hindi");
const salaryPerDayInput = document.getElementById("salary-per-day");
const staffTableBody = document.getElementById("staff-table-body");

const salaryForm = document.getElementById("salary-form");
const salaryStartDateInput = document.getElementById("salary-start-date");
const salaryEndDateInput = document.getElementById("salary-end-date");
const salaryResult = document.getElementById("salary-result");
const applySalaryDeductionsBtn = document.getElementById("apply-salary-deductions");
const downloadWeeklyPdfBtn = document.getElementById("download-weekly-pdf");

const attendanceTableBody = document.getElementById("attendance-table-body");
const bulkAttendanceForm = document.getElementById("bulk-attendance-form");
const bulkAttendanceDate = document.getElementById("bulk-attendance-date");
const bulkAttendanceBody = document.getElementById("bulk-attendance-body");
const disabledStaffBody = document.getElementById("disabled-staff-body");
const advanceForm = document.getElementById("advance-form");
const advanceStaffSelect = document.getElementById("advance-staff");
const advanceDateInput = document.getElementById("advance-date");
const advanceTypeSelect = document.getElementById("advance-type");
const advanceAmountInput = document.getElementById("advance-amount");
const advanceNoteInput = document.getElementById("advance-note");
const advanceBalanceBody = document.getElementById("advance-balance-body");
const advanceHistoryBody = document.getElementById("advance-history-body");
const attendanceFilterForm = document.getElementById("attendance-filter-form");
const attendanceViewMode = document.getElementById("attendance-view-mode");
const attendanceRefDate = document.getElementById("attendance-ref-date");

const dbStatus = document.getElementById("db-status");
const goDashboardBtn = document.getElementById("go-dashboard");
const goMarkAttendanceBtn = document.getElementById("go-mark-attendance");
const homePage = document.getElementById("home-page");
const addStaffPage = document.getElementById("add-staff-page");
const weeklySalaryPage = document.getElementById("weekly-salary-page");
const staffSalaryPage = document.getElementById("staff-salary-page");
const advancePage = document.getElementById("advance-page");
const attendanceRecordsPage = document.getElementById("attendance-records-page");
const attendancePage = document.getElementById("attendance-page");
const openAddStaffPageBtn = document.getElementById("open-add-staff-page");
const openMarkAttendancePageBtn = document.getElementById("open-mark-attendance-page");
const openWeeklySalaryPageBtn = document.getElementById("open-weekly-salary-page");
const openStaffSalaryPageBtn = document.getElementById("open-staff-salary-page");
const openAdvancePageBtn = document.getElementById("open-advance-page");
const openAttendanceRecordsPageBtn = document.getElementById("open-attendance-records-page");

let state = { staff: [], attendance: [], advances: [] };
let currentSalaryRows = [];
let useCloudDb = false;
let dbRef = null;
const hindiNameCache = {};
let hindiFontLoaded = false;

async function ensureHindiFont(doc) {
  if (hindiFontLoaded) return true;
  try {
    const fontUrl = "https://cdn.jsdelivr.net/gh/googlefonts/noto-fonts@main/hinted/ttf/NotoSansDevanagari/NotoSansDevanagari-Regular.ttf";
    const response = await fetch(fontUrl);
    if (!response.ok) return false;
    const bytes = await response.arrayBuffer();
    let binary = "";
    const chunk = 0x8000;
    const view = new Uint8Array(bytes);
    for (let i = 0; i < view.length; i += chunk) {
      binary += String.fromCharCode(...view.subarray(i, i + chunk));
    }
    const base64 = btoa(binary);
    doc.addFileToVFS("NotoSansDevanagari-Regular.ttf", base64);
    doc.addFont("NotoSansDevanagari-Regular.ttf", "NotoSansDevanagari", "normal");
    hindiFontLoaded = true;
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

async function loadState(db) {
  const [staff, attendance, advances] = await Promise.all([readAll(db, STAFF_STORE), readAll(db, ATTENDANCE_STORE), readAll(db, ADVANCE_STORE)]);
  state.staff = Array.isArray(staff) ? staff : [];
  state.attendance = Array.isArray(attendance) ? attendance : [];
  state.advances = Array.isArray(advances) ? advances : [];
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

function todayString() {
  return new Date().toISOString().split("T")[0];
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
    return [start.toISOString().split("T")[0], end.toISOString().split("T")[0]];
  }
  const day = base.getDay(); // Sunday=0 ... Saturday=6
  const diffToSunday = -day;
  const start = new Date(base);
  start.setDate(base.getDate() + diffToSunday);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  return [start.toISOString().split("T")[0], end.toISOString().split("T")[0]];
}

function formatDateLabel(dateStr) {
  const date = new Date(`${dateStr}T00:00:00`);
  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit" });
}

async function transliterateToHindi(name) {
  const key = (name || "").trim().toLowerCase();
  if (!key) return "";
  if (hindiNameCache[key]) return hindiNameCache[key];
  try {
    const url = `https://inputtools.google.com/request?text=${encodeURIComponent(name)}&itc=hi-t-i0-und&num=1`;
    const res = await fetch(url);
    const data = await res.json();
    if (Array.isArray(data) && data[0] === "SUCCESS" && data[1]?.[0]?.[1]?.[0]) {
      const value = data[1][0][1][0];
      hindiNameCache[key] = value;
      return value;
    }
  } catch (_err) {
    // Ignore transliteration failures and fallback.
  }
  return "";
}

function getWeekDays(startDate, endDate) {
  const days = [];
  const start = new Date(`${startDate}T00:00:00`);
  const end = new Date(`${endDate}T00:00:00`);
  const cursor = new Date(start);
  while (cursor <= end) {
    const iso = cursor.toISOString().split("T")[0];
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
  const hourlySalary = staff.salaryPerDay / WORKING_HOURS_PER_DAY;
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
    return {
      periodLabel: "Weekly Date Range",
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

function renderSalaryOverview() {
  const { periodLabel, startDate, endDate } = resolveSalaryRange();
  const activeStaff = getActiveStaff();
  if (!activeStaff.length) {
    salaryResult.classList.add("hidden");
    currentSalaryRows = [];
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

  const rows = currentSalaryRows.map((row) => {
    const { person, s, adv, suggestedDeduction, payment, nextAdvance } = row;
    return `
      <tr>
        <td>${person.name}</td>
        <td>${formatCurrency(person.salaryPerDay)}</td>
        <td>${s.presentDays}</td>
        <td>${s.partialDays}</td>
        <td>${s.partialHours}</td>
        <td>${s.extraHours}</td>
        <td>${s.absentDays}</td>
        <td>${s.totalHours}</td>
        <td>${formatCurrency(adv.previous)}</td>
        <td>${formatCurrency(adv.takenInRange)}</td>
        <td><input type="number" class="compact-input js-deduct-input" data-staff-id="${person.id}" min="0" step="0.01" value="${suggestedDeduction.toFixed(2)}"></td>
        <td>${formatCurrency(payment)}</td>
        <td>${formatCurrency(nextAdvance)}</td>
      </tr>
    `;
  }).join("");

  salaryResult.classList.remove("hidden");
  salaryResult.innerHTML = `
    <p><strong>${periodLabel}:</strong> ${startDate} to ${endDate}</p>
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Staff</th>
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
          </tr>
        </thead>
        <tbody>${rows}</tbody>
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

async function exportWeeklyPdf() {
  if (!window.jspdf || !window.jspdf.jsPDF || typeof window.jspdf.jsPDF !== "function" || !window.html2canvas) return;
  const activeStaff = getActiveStaff();
  if (!activeStaff.length) return;

  const { startDate, endDate } = resolveSalaryRange();
  const weekDays = getWeekDays(startDate, endDate);
  const title = `Week Sheet (${formatDateLabel(startDate)} to ${formatDateLabel(endDate)})`;
  let grandTotal = 0;
  const bodyPromises = activeStaff.map(async (person, idx) => {
    const salary = calculateSalaryForStaff(person, startDate, endDate);
    const totalDays = (salary.totalHours / WORKING_HOURS_PER_DAY).toFixed(2).replace(/\.00$/, "");
    const amount = Math.round(salary.payable);
    grandTotal += amount;
    const hindiName = person.hindiName || await transliterateToHindi(person.name) || person.name;
    return {
      sr: String(idx + 1),
      nameEn: person.name,
      nameHi: hindiName,
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
  const temp = document.createElement("div");
  temp.style.position = "fixed";
  temp.style.left = "-99999px";
  temp.style.top = "0";
  // Match A4 landscape render width more closely for readable scaling.
  temp.style.width = "1120px";
  temp.style.background = "#ffffff";
  temp.style.color = "#111827";
  temp.style.padding = "16px";
  temp.style.fontFamily = "'Noto Sans Devanagari', 'Mangal', Arial, sans-serif";

  const tableHead = `
    <tr style="background:#0e5a73;color:#ffffff;">
      <th style="padding:4px;border:1px solid #cbd5e1;width:28px;">Sr</th>
      <th style="padding:4px;border:1px solid #cbd5e1;width:78px;">Name (English)</th>
      <th style="padding:4px;border:1px solid #cbd5e1;width:78px;">Name (Hindi)</th>
      <th style="padding:4px;border:1px solid #cbd5e1;width:62px;">Daily Wage</th>
      ${weekDays.map((d) => `<th style="padding:3px;border:1px solid #cbd5e1;width:38px;">${d.name}<br>(${d.label})</th>`).join("")}
      <th style="padding:4px;border:1px solid #cbd5e1;width:62px;">Total days</th>
      <th style="padding:4px;border:1px solid #cbd5e1;width:62px;">Extra Hours</th>
      <th style="padding:4px;border:1px solid #cbd5e1;width:62px;">Amount</th>
      <th style="padding:4px;border:1px solid #cbd5e1;width:62px;">Payment</th>
      <th style="padding:4px;border:1px solid #cbd5e1;width:78px;">Notes</th>
      <th style="padding:4px;border:1px solid #cbd5e1;width:58px;">Sign</th>
    </tr>
  `;
  const tableBody = body.map((r) => `
    <tr>
      <td style="padding:4px;border:1px solid #e5e7eb;">${r.sr}</td>
      <td style="padding:4px;border:1px solid #e5e7eb;">${r.nameEn}</td>
      <td style="padding:4px;border:1px solid #e5e7eb;">${r.nameHi}</td>
      <td style="padding:4px;border:1px solid #e5e7eb;">${r.wage}</td>
      ${r.dayMarkers.map((m) => `<td style="padding:4px;border:1px solid #e5e7eb;text-align:center;">${m}</td>`).join("")}
      <td style="padding:4px;border:1px solid #e5e7eb;">${r.totalDays}</td>
      <td style="padding:4px;border:1px solid #e5e7eb;">${r.extraHours}</td>
      <td style="padding:4px;border:1px solid #e5e7eb;">${r.amount}</td>
      <td style="padding:4px;border:1px solid #e5e7eb;">${r.payment}</td>
      <td style="padding:4px;border:1px solid #e5e7eb;">${r.notes}</td>
      <td style="padding:4px;border:1px solid #e5e7eb;">${r.sign}</td>
    </tr>
  `).join("");
  const footer = `
    <tr>
      <td colspan="${4 + weekDays.length + 2}" style="padding:4px;border:1px solid #e5e7eb;"></td>
      <td style="padding:4px;border:1px solid #e5e7eb;font-weight:700;">Total</td>
      <td style="padding:4px;border:1px solid #e5e7eb;font-weight:700;">${grandTotal}</td>
      <td style="padding:4px;border:1px solid #e5e7eb;"></td>
      <td style="padding:4px;border:1px solid #e5e7eb;"></td>
    </tr>
  `;
  temp.innerHTML = `
    <h2 style="margin:0 0 10px 0;">${title}</h2>
    <table style="width:100%;border-collapse:collapse;font-size:12px;table-layout:fixed;">
      <thead>${tableHead}</thead>
      <tbody>${tableBody}${footer}</tbody>
    </table>
  `;
  document.body.appendChild(temp);

  const canvas = await window.html2canvas(temp, { scale: 2, backgroundColor: "#ffffff", useCORS: true });
  document.body.removeChild(temp);
  const imgData = canvas.toDataURL("image/png");
  const doc = new window.jspdf.jsPDF({ orientation: "landscape", unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const ratio = Math.min((pageWidth - 24) / canvas.width, (pageHeight - 24) / canvas.height);
  const renderWidth = canvas.width * ratio;
  const renderHeight = canvas.height * ratio;
  const x = (pageWidth - renderWidth) / 2;
  const y = 12;
  doc.addImage(imgData, "PNG", x, y, renderWidth, renderHeight);
  doc.save(`attendance-week-${startDate}-to-${endDate}.pdf`);
}

function renderStaff() {
  const activeStaff = getActiveStaff();
  if (!activeStaff.length) {
    staffTableBody.innerHTML = '<tr><td colspan="4" class="empty">No staff added yet.</td></tr>';
    return;
  }
  staffTableBody.innerHTML = activeStaff.map((person) => {
    const hourly = person.salaryPerDay / WORKING_HOURS_PER_DAY;
    return `
      <tr>
        <td>${person.name}</td>
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

function getWeeklyRangeByDate(dateStr) {
  const base = new Date(`${dateStr}T00:00:00`);
  const day = base.getDay();
  const start = new Date(base);
  start.setDate(base.getDate() - day);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  return [start.toISOString().split("T")[0], end.toISOString().split("T")[0]];
}

function getMonthlyRangeByDate(dateStr) {
  const base = new Date(`${dateStr}T00:00:00`);
  const start = new Date(base.getFullYear(), base.getMonth(), 1);
  const end = new Date(base.getFullYear(), base.getMonth() + 1, 0);
  return [start.toISOString().split("T")[0], end.toISOString().split("T")[0]];
}

function renderAttendanceHistory() {
  const ref = attendanceRefDate.value || todayString();
  const mode = attendanceViewMode.value || "weekly";
  const [startDate, endDate] = mode === "monthly" ? getMonthlyRangeByDate(ref) : getWeeklyRangeByDate(ref);
  const filtered = state.attendance.filter((entry) => entry.date >= startDate && entry.date <= endDate);

  if (!filtered.length) {
    attendanceTableBody.innerHTML = '<tr><td colspan="4" class="empty">No attendance records yet.</td></tr>';
    return;
  }
  const sorted = [...filtered].sort((a, b) => b.date.localeCompare(a.date));
  attendanceTableBody.innerHTML = sorted.map((entry) => {
    const staff = getStaffById(entry.staffId);
    const name = staff ? staff.name : "Unknown";
    return `
      <tr>
        <td>${entry.date}</td>
        <td>${name}</td>
        <td><span class="badge ${entry.status.toLowerCase()}">${entry.status}</span></td>
        <td>${entry.hours}</td>
      </tr>
    `;
  }).join("");
}

function renderBulkAttendanceRows() {
  const activeStaff = getActiveStaff();
  if (!activeStaff.length) {
    bulkAttendanceBody.innerHTML = '<tr><td colspan="7" class="empty">No active staff available. Add or enable staff.</td></tr>';
    return;
  }
  bulkAttendanceBody.innerHTML = activeStaff.map((person) => `
    <tr data-staff-row="${person.id}">
      <td>${person.name}</td>
      <td>${formatCurrency(person.salaryPerDay)}</td>
      <td>
        <input type="number" class="compact-input js-bulk-salary-input" data-staff-id="${person.id}" min="0" step="0.01" value="${person.salaryPerDay}">
        <button type="button" class="js-update-salary-bulk" data-staff-id="${person.id}">Update</button>
        <span class="update-msg hidden" data-msg-for-bulk="${person.id}">Updated</span>
      </td>
      <td>
        <button type="button" class="js-disable-staff" data-staff-id="${person.id}">Disable</button>
      </td>
      <td>
        <div class="status-group">
          <label class="status-option present-option"><input type="radio" name="status-${person.id}" value="Present" checked>Present</label>
          <label class="status-option absent-option"><input type="radio" name="status-${person.id}" value="Absent">Absent</label>
          <label class="status-option partial-option"><input type="radio" name="status-${person.id}" value="Partial">Partial</label>
        </div>
      </td>
      <td>
        <input type="number" class="compact-input js-partial-hours" data-staff-id="${person.id}" min="0" max="24" step="0.5" value="4" disabled>
      </td>
      <td>
        <input type="number" class="compact-input js-extra-hours" data-staff-id="${person.id}" min="0" max="16" step="0.5" value="0">
      </td>
    </tr>
  `).join("");
  bulkAttendanceBody.querySelectorAll("tr").forEach((row) => updateStatusOptionStyles(row));
}

function renderDisabledStaffRows() {
  const disabled = getDisabledStaff();
  if (!disabled.length) {
    disabledStaffBody.innerHTML = '<tr><td colspan="3" class="empty">No disabled staff.</td></tr>';
    return;
  }
  disabledStaffBody.innerHTML = disabled.map((person) => `
    <tr>
      <td>${person.name}</td>
      <td>${formatCurrency(person.salaryPerDay)}</td>
      <td><button type="button" class="js-enable-staff" data-staff-id="${person.id}">Enable</button></td>
    </tr>
  `).join("");
}

function renderAdvanceStaffOptions() {
  if (!advanceStaffSelect) return;
  const options = state.staff.map((person) => `<option value="${person.id}">${person.name}</option>`).join("");
  advanceStaffSelect.innerHTML = options || "";
}

function renderAdvanceBalance() {
  if (!advanceBalanceBody) return;
  const activeStaff = getActiveStaff();
  if (!activeStaff.length) {
    advanceBalanceBody.innerHTML = '<tr><td colspan="2" class="empty">No records.</td></tr>';
    return;
  }
  advanceBalanceBody.innerHTML = activeStaff.map((person) => {
    const bal = getAdvanceSummary(person.id, "0001-01-01", "9999-12-31").outstanding;
    return `<tr><td>${person.name}</td><td>${formatCurrency(bal)}</td></tr>`;
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
  const pages = [homePage, addStaffPage, weeklySalaryPage, staffSalaryPage, advancePage, attendanceRecordsPage, attendancePage];
  pages.forEach((p) => p.classList.add("hidden"));
  if (pageName === "home") homePage.classList.remove("hidden");
  if (pageName === "add-staff") addStaffPage.classList.remove("hidden");
  if (pageName === "weekly-salary") weeklySalaryPage.classList.remove("hidden");
  if (pageName === "staff-salary") staffSalaryPage.classList.remove("hidden");
  if (pageName === "advance") advancePage.classList.remove("hidden");
  if (pageName === "attendance-records") attendanceRecordsPage.classList.remove("hidden");
  if (pageName === "mark-attendance") attendancePage.classList.remove("hidden");
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

async function saveAdvanceRecord(entry) {
  if (useCloudDb) await window.AttendanceCloud.upsertAdvance(entry);
  else await putOne(dbRef, ADVANCE_STORE, entry);
}

staffForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const name = staffNameInput.value.trim();
  let hindiName = staffNameHindiInput.value.trim();
  const salaryPerDay = Number(salaryPerDayInput.value);
  if (!name || salaryPerDay < 0) return;
  if (!hindiName) {
    hindiName = await transliterateToHindi(name);
  }
  const person = { id: crypto.randomUUID(), name, hindiName, salaryPerDay };
  await saveStaffRecord(person);
  state.staff.push(person);
  renderStaff();
  renderBulkAttendanceRows();
  renderAdvanceStaffOptions();
  renderAdvanceBalance();
  renderSalaryOverview();
  staffForm.reset();
});

staffTableBody.addEventListener("click", async (event) => {
  const btn = event.target.closest(".js-update-salary");
  if (!btn) return;
  const staffId = btn.dataset.staffId;
  const input = staffTableBody.querySelector(`.js-salary-input[data-staff-id="${staffId}"]`);
  if (!input) return;
  const salaryPerDay = Number(input.value);
  if (Number.isNaN(salaryPerDay) || salaryPerDay < 0) return;
  const person = getStaffById(staffId);
  if (!person) return;
  person.salaryPerDay = salaryPerDay;
  await saveStaffRecord(person);
  renderStaff();
  renderBulkAttendanceRows();
  renderAdvanceBalance();
  renderSalaryOverview();
  flashUpdatedMessage(`.update-msg[data-msg-for="${staffId}"]`);
});

bulkAttendanceBody.addEventListener("change", (event) => {
  const radio = event.target;
  if (!radio.matches("input[type='radio']")) return;
  const row = radio.closest("tr");
  updateStatusOptionStyles(row);
  const partialInput = row.querySelector(".js-partial-hours");
  partialInput.disabled = radio.value !== "Partial";
});

bulkAttendanceBody.addEventListener("click", async (event) => {
  const btn = event.target.closest(".js-update-salary-bulk");
  const disableBtn = event.target.closest(".js-disable-staff");
  if (disableBtn) {
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
    return;
  }
  if (!btn) return;
  const staffId = btn.dataset.staffId;
  const input = bulkAttendanceBody.querySelector(`.js-bulk-salary-input[data-staff-id="${staffId}"]`);
  if (!input) return;
  const salaryPerDay = Number(input.value);
  if (Number.isNaN(salaryPerDay) || salaryPerDay < 0) return;
  const person = getStaffById(staffId);
  if (!person) return;
  person.salaryPerDay = salaryPerDay;
  await saveStaffRecord(person);
  renderStaff();
  renderBulkAttendanceRows();
  renderAdvanceBalance();
  renderSalaryOverview();
  flashUpdatedMessage(`.update-msg[data-msg-for-bulk="${staffId}"]`);
});

disabledStaffBody.addEventListener("click", async (event) => {
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
  const date = bulkAttendanceDate.value;
  if (!date) return;
  const tasks = [];
  for (const person of getActiveStaff()) {
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
    const existingIndex = state.attendance.findIndex((entry) => entry.id === record.id);
    if (existingIndex >= 0) state.attendance[existingIndex] = record;
    else state.attendance.push(record);
  }
  await Promise.all(tasks);
  renderAttendanceHistory();
  renderSalaryOverview();
  setPage("home");
});

salaryForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (salaryStartDateInput.value && salaryEndDateInput.value && salaryStartDateInput.value > salaryEndDateInput.value) {
    return;
  }
  renderSalaryOverview();
});

applySalaryDeductionsBtn.addEventListener("click", async () => {
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

downloadWeeklyPdfBtn.addEventListener("click", async () => {
  await exportWeeklyPdf();
});

goMarkAttendanceBtn.addEventListener("click", () => setPage("mark-attendance"));
goDashboardBtn.addEventListener("click", () => setPage("home"));
openAddStaffPageBtn.addEventListener("click", () => setPage("add-staff"));
openMarkAttendancePageBtn.addEventListener("click", () => setPage("mark-attendance"));
openWeeklySalaryPageBtn.addEventListener("click", () => setPage("weekly-salary"));
openStaffSalaryPageBtn.addEventListener("click", () => setPage("staff-salary"));
openAdvancePageBtn.addEventListener("click", () => setPage("advance"));
openAttendanceRecordsPageBtn.addEventListener("click", () => setPage("attendance-records"));
attendanceFilterForm.addEventListener("submit", (event) => {
  event.preventDefault();
  renderAttendanceHistory();
});

advanceForm.addEventListener("submit", async (event) => {
  event.preventDefault();
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

async function init() {
  useCloudDb = !!window.AttendanceCloud?.isConfigured?.();
  renderDbStatus();
  if (useCloudDb) {
    const cloudData = await window.AttendanceCloud.loadAll();
    state.staff = Array.isArray(cloudData?.staff) ? cloudData.staff : [];
    state.attendance = Array.isArray(cloudData?.attendance) ? cloudData.attendance : [];
    state.advances = Array.isArray(cloudData?.advances) ? cloudData.advances : [];
  } else {
    dbRef = await openDatabase();
    await loadState(dbRef);
    await migrateFromLocalStorage(dbRef);
  }
  bulkAttendanceDate.value = todayString();
  attendanceRefDate.value = todayString();
  attendanceViewMode.value = "weekly";
  const [weekStart, weekEnd] = getDateRangeFromLatest(getLatestAttendanceDate(), "weekly");
  salaryStartDateInput.value = weekStart;
  salaryEndDateInput.value = weekEnd;
  advanceDateInput.value = todayString();
  renderStaff();
  renderBulkAttendanceRows();
  renderDisabledStaffRows();
  renderAdvanceStaffOptions();
  renderAdvanceBalance();
  renderAdvanceHistory();
  renderAttendanceHistory();
  renderSalaryOverview();
  setPage("home");
}

init();
