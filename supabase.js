(function () {
  const cfg = window.AttendanceConfig || {};
  const url = (cfg.supabaseUrl || "").trim();
  const key = (cfg.supabaseAnonKey || "").trim();

  let client = null;
  if (url && key && key !== "REPLACE_WITH_YOUR_SUPABASE_ANON_KEY" && window.supabase?.createClient) {
    client = window.supabase.createClient(url, key);
  }

  function isConfigured() {
    return !!client;
  }

  function parseCustomDepartmentsRow(settingsRes) {
    if (!settingsRes || settingsRes.error) {
      if (settingsRes?.error) console.warn("app_settings load:", settingsRes.error.message || settingsRes.error);
      return [];
    }
    const row = settingsRes.data;
    if (row == null) return [];
    const v = row.value;
    if (v == null || v === undefined) return [];
    function coerceEntry(x) {
      if (x && typeof x === "object" && x.name != null) {
        const name = String(x.name).trim();
        return name ? { name, attendanceOnly: !!x.attendanceOnly } : null;
      }
      const s = String(x ?? "").trim();
      return s ? { name: s, attendanceOnly: false } : null;
    }
    if (Array.isArray(v)) return v.map(coerceEntry).filter(Boolean);
    if (typeof v === "string") {
      try {
        const parsed = JSON.parse(v);
        return Array.isArray(parsed) ? parsed.map(coerceEntry).filter(Boolean) : [];
      } catch (_e) {
        return [];
      }
    }
    return [];
  }

  async function loadAll() {
    if (!client) return null;
    const [staffRes, attendanceRes, advanceRes, usersRes, settingsRes] = await Promise.all([
      client.from("staff").select("*").order("created_at", { ascending: true }),
      client.from("attendance").select("*").order("date", { ascending: false }),
      client.from("advances").select("*").order("date", { ascending: false }),
      client.from("app_users").select("*").order("created_at", { ascending: true }),
      client.from("app_settings").select("value").eq("key", "custom_departments").maybeSingle(),
    ]);

    if (staffRes.error) throw staffRes.error;
    if (attendanceRes.error) throw attendanceRes.error;
    if (advanceRes.error) throw advanceRes.error;
    if (usersRes.error) throw usersRes.error;

    return {
      customDepartments: parseCustomDepartmentsRow(settingsRes),
      staff: (staffRes.data || []).map((row) => ({
        id: row.id,
        name: row.name || "",
        hindiName: row.hindi_name || "",
        department: row.department || "General",
        isActive: row.is_active !== false,
        salaryPerDay: Number(row.salary_per_day) || 0,
      })),
      attendance: (attendanceRes.data || []).map((row) => ({
        id: row.id,
        staffId: row.staff_id,
        date: row.date,
        status: row.status,
        hours: Number(row.hours) || 0,
        extraHours: Number(row.extra_hours) || 0,
      })),
      advances: (advanceRes.data || []).map((row) => ({
        id: row.id,
        staffId: row.staff_id,
        date: row.date,
        type: row.type,
        amount: Number(row.amount) || 0,
        note: row.note || "",
      })),
      users: (usersRes.data || []).map((row) => ({
        id: row.id,
        username: row.username,
        password: row.password,
        role: row.role || "user",
        isActive: row.is_active !== false,
      })),
    };
  }

  async function saveCustomDepartments(names) {
    if (!client) return;
    let list = [];
    if (Array.isArray(names)) {
      list = names
        .map((n) => {
          if (n && typeof n === "object" && n.name != null) {
            const name = String(n.name).trim();
            return name ? { name, attendanceOnly: !!n.attendanceOnly } : null;
          }
          const s = String(n ?? "").trim();
          return s ? { name: s, attendanceOnly: false } : null;
        })
        .filter(Boolean);
    }
    const { error } = await client.from("app_settings").upsert({ key: "custom_departments", value: list }, { onConflict: "key" });
    if (error) throw error;
  }

  async function saveStaff(person) {
    if (!client) return;
    const { error } = await client.from("staff").upsert({
      id: person.id,
      name: person.name,
      hindi_name: person.hindiName || "",
      department: person.department || "General",
      is_active: person.isActive !== false,
      salary_per_day: person.salaryPerDay,
    }, { onConflict: "id" });
    if (error) throw error;
  }

  async function upsertAttendance(record) {
    if (!client) return;
    const { error } = await client.from("attendance").upsert({
      id: record.id,
      staff_id: record.staffId,
      date: record.date,
      status: record.status,
      hours: record.hours,
      extra_hours: Number(record.extraHours) || 0,
    }, { onConflict: "id" });
    if (error) throw error;
  }

  async function upsertAdvance(entry) {
    if (!client) return;
    const { error } = await client.from("advances").upsert({
      id: entry.id,
      staff_id: entry.staffId,
      date: entry.date,
      type: entry.type,
      amount: Number(entry.amount) || 0,
      note: entry.note || "",
    }, { onConflict: "id" });
    if (error) throw error;
  }

  async function upsertUser(user) {
    if (!client) return;
    const { error } = await client.from("app_users").upsert({
      id: user.id,
      username: user.username,
      password: user.password,
      role: user.role || "user",
      is_active: user.isActive !== false,
    }, { onConflict: "id" });
    if (error) throw error;
  }

  window.AttendanceCloud = {
    isConfigured,
    loadAll,
    saveCustomDepartments,
    saveStaff,
    upsertAttendance,
    upsertAdvance,
    upsertUser,
  };
})();
