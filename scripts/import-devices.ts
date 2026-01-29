import fs from "fs";
import path from "path";
import { db } from "../server/db";
import { devices, deviceAllocations } from "../shared/schema";

function parseCSV(content: string): Record<string, string>[] {
  const lines = content.trim().split("\n");
  const headers = lines[0].split(",");
  const rows: Record<string, string>[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values: string[] = [];
    let current = "";
    let inQuotes = false;

    for (const char of lines[i]) {
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === "," && !inQuotes) {
        values.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }
    values.push(current.trim());

    const row: Record<string, string> = {};
    headers.forEach((header, idx) => {
      row[header.trim()] = values[idx] || "";
    });
    rows.push(row);
  }

  return rows;
}

function parseValue(val: string): string | null {
  if (!val || val === "null" || val === "" || val === "N/A") return null;
  return val;
}

function parseNumber(val: string): string | null {
  if (!val || val === "null" || val === "") return null;
  const num = parseFloat(val);
  return isNaN(num) ? null : String(num);
}

function parseInteger(val: string): number | null {
  if (!val || val === "null" || val === "") return null;
  const num = parseInt(val, 10);
  return isNaN(num) ? null : num;
}

function parseBool(val: string): boolean {
  return val === "true" || val === "1";
}

async function importDevices() {
  console.log("Starting device data import...");

  const devicesFile = path.join(
    process.cwd(),
    "attached_assets/devices_1769645792231.csv"
  );
  const allocationsFile = path.join(
    process.cwd(),
    "attached_assets/device_allocations_1769645792230.csv"
  );

  const devicesData = parseCSV(fs.readFileSync(devicesFile, "utf-8"));
  const allocationsData = parseCSV(fs.readFileSync(allocationsFile, "utf-8"));

  console.log(`Devices: ${devicesData.length} records`);
  console.log(`Allocations: ${allocationsData.length} records`);

  console.log("Importing devices...");
  let devicesImported = 0;
  for (let i = 0; i < devicesData.length; i++) {
    const row = devicesData[i];
    try {
      await db
        .insert(devices)
        .values({
          id: `DEV-${String(i + 1).padStart(4, "0")}`,
          resourceId: parseValue(row.resource_id),
          resourceName: row.resource_name || "Unknown Device",
          resourceType: parseValue(row.resource_type),
          description: parseValue(row.description),
          category: parseValue(row.category),
          brand: parseValue(row.brand),
          modelNumber: parseValue(row.model_number),
          serialNumber: parseValue(row.serial_number),
          purchaseDate: parseValue(row.purchase_date),
          purchaseCost: parseNumber(row.purchase_cost),
          currentValue: parseNumber(row.current_value),
          warrantyExpiration: parseValue(row.warranty_expiration),
          location: parseValue(row.location),
          condition: parseValue(row.condition),
          maintenanceSchedule: parseValue(row.maintenance_schedule),
          lastMaintenanceDate: parseValue(row.last_maintenance_date),
          checkoutAllowed: parseBool(row.checkout_allowed),
          maxCheckoutDays: parseInteger(row.max_checkout_days),
          requiresTraining: parseBool(row.requires_training),
          responsibleStaffId: parseValue(row.responsible_staff_id),
          insuranceValue: parseNumber(row.insurance_value),
          status: parseValue(row.status) || "Available",
        })
        .onConflictDoNothing();
      devicesImported++;
    } catch (e) {
      console.log(`Error importing device ${i}:`, e);
    }
  }
  console.log(`Devices imported: ${devicesImported}`);

  console.log("Importing allocations...");
  let allocationsImported = 0;
  for (const row of allocationsData) {
    try {
      await db
        .insert(deviceAllocations)
        .values({
          id: row.allocation_id,
          allocationId: parseValue(row.allocation_id),
          resourceId: parseValue(row.resource_id),
          allocatedToType: parseValue(row.allocated_to_type),
          allocationPurpose: parseValue(row.allocation_purpose),
          requestDate: parseValue(row.request_date),
          checkoutDate: parseValue(row.checkout_date),
          expectedReturnDate: parseValue(row.expected_return_date),
          actualReturnDate: parseValue(row.actual_return_date),
          checkoutStaffId: parseValue(row.checkout_staff_id),
          checkinStaffId: parseValue(row.checkin_staff_id),
          conditionAtCheckout: parseValue(row.condition_at_checkout),
          conditionAtReturn: parseValue(row.condition_at_return),
          damageReported: parseBool(row.damage_reported),
          damageDescription: parseValue(row.damage_description),
          repairCost: parseNumber(row.repair_cost),
          lateReturn: parseBool(row.late_return),
          lateFeeCharged: parseNumber(row.late_fee_charged),
          trainingVerified: parseBool(row.training_verified),
          agreementSigned: parseBool(row.agreement_signed),
          notes: parseValue(row.notes),
          status: parseValue(row.status) || "Active",
          studentId: parseValue(row.student_id),
          staffId: parseValue(row.staff_id),
          programId: parseValue(row.program_id),
          projectId: parseValue(row.project_id),
        })
        .onConflictDoNothing();
      allocationsImported++;
    } catch (e) {
      console.log(`Error importing allocation:`, e);
    }
  }
  console.log(`Allocations imported: ${allocationsImported}`);

  console.log("Device import complete!");
  process.exit(0);
}

importDevices().catch((e) => {
  console.error("Import failed:", e);
  process.exit(1);
});
