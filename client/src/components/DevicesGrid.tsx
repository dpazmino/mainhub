import * as React from "react";
import { Check, Loader2, AlertCircle } from "lucide-react";
import { getDevices, getDeviceAllocations, updateDeviceAllocation } from "@/lib/api";
import type { Device, DeviceAllocation } from "@shared/schema";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface EditableAllocation extends DeviceAllocation {
  deviceName?: string;
  deviceType?: string;
}

function EditableCell({
  value,
  field,
  allocationId,
  onSave,
  type = "text",
}: {
  value: string | null | undefined;
  field: string;
  allocationId: string;
  onSave: (id: string, field: string, value: string) => Promise<boolean>;
  type?: "text" | "date" | "select";
}) {
  const [localValue, setLocalValue] = React.useState(value || "");
  const [isSaving, setIsSaving] = React.useState(false);
  const [saved, setSaved] = React.useState(false);
  const [error, setError] = React.useState(false);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const originalValue = React.useRef(value || "");

  React.useEffect(() => {
    setLocalValue(value || "");
    originalValue.current = value || "";
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    setSaved(false);
    setError(false);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(async () => {
      if (newValue !== originalValue.current) {
        setIsSaving(true);
        try {
          const success = await onSave(allocationId, field, newValue);
          if (success) {
            setSaved(true);
            originalValue.current = newValue;
            setTimeout(() => setSaved(false), 2000);
          } else {
            setError(true);
            setLocalValue(originalValue.current);
            setTimeout(() => setError(false), 3000);
          }
        } catch (err) {
          console.error("Failed to save:", err);
          setError(true);
          setLocalValue(originalValue.current);
          setTimeout(() => setError(false), 3000);
        } finally {
          setIsSaving(false);
        }
      }
    }, 800);
  };

  return (
    <div className="relative">
      {type === "select" ? (
        <select
          value={localValue}
          onChange={handleChange}
          className={`w-full text-xs border rounded px-2 py-1 bg-white/50 focus:outline-none ${
            error ? "border-red-400 bg-red-50" : "border-border/50 focus:border-primary"
          }`}
          data-testid={`select-${field}-${allocationId}`}
        >
          <option value="">—</option>
          <option value="Excellent">Excellent</option>
          <option value="Good">Good</option>
          <option value="Fair">Fair</option>
          <option value="Damaged">Damaged</option>
          <option value="N/A">N/A</option>
        </select>
      ) : (
        <Input
          type={type}
          value={localValue}
          onChange={handleChange}
          className={`text-xs h-7 bg-white/50 ${
            error ? "border-red-400 bg-red-50" : "border-border/50 focus:border-primary"
          }`}
          data-testid={`input-${field}-${allocationId}`}
        />
      )}
      {isSaving && (
        <Loader2 className="absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 animate-spin text-muted-foreground" />
      )}
      {saved && !isSaving && (
        <Check className="absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 text-green-500" />
      )}
      {error && !isSaving && (
        <AlertCircle className="absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 text-red-500" />
      )}
    </div>
  );
}

export default function DevicesGrid() {
  const [devices, setDevices] = React.useState<Device[]>([]);
  const [allocations, setAllocations] = React.useState<EditableAllocation[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function loadData() {
      try {
        const [devicesData, allocationsData] = await Promise.all([
          getDevices(),
          getDeviceAllocations(),
        ]);
        setDevices(devicesData);
        
        const enrichedAllocations = allocationsData.map(alloc => {
          const device = devicesData.find(d => d.resourceId === alloc.resourceId);
          return {
            ...alloc,
            deviceName: device?.resourceName || alloc.resourceId || "Unknown Device",
            deviceType: device?.resourceType || "N/A",
          };
        });
        
        setAllocations(enrichedAllocations);
      } catch (err) {
        setError("Failed to load device data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSave = async (id: string, field: string, value: string): Promise<boolean> => {
    try {
      await updateDeviceAllocation(id, { [field]: value || null });
      setAllocations(prev =>
        prev.map(a => (a.id === id ? { ...a, [field]: value || null } : a))
      );
      return true;
    } catch (err) {
      console.error("Failed to update allocation:", err);
      return false;
    }
  };

  const getStatusBadge = (status: string | null) => {
    const colors: Record<string, string> = {
      Active: "bg-green-100 text-green-700 border-green-200",
      Completed: "bg-blue-100 text-blue-700 border-blue-200",
      Overdue: "bg-red-100 text-red-700 border-red-200",
      Cancelled: "bg-gray-100 text-gray-600 border-gray-200",
    };
    return colors[status || ""] || "bg-gray-100 text-gray-600 border-gray-200";
  };

  if (loading) {
    return (
      <Card className="rounded-3xl bg-white/70 border-border/70">
        <CardContent className="p-8 flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          <span className="ml-2 text-muted-foreground">Loading devices...</span>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="rounded-3xl bg-white/70 border-border/70">
        <CardContent className="p-8 flex items-center justify-center text-red-600">
          <AlertCircle className="h-5 w-5 mr-2" />
          {error}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-3xl bg-white/70 border-border/70 shadow-sm">
      <CardHeader className="pb-2">
        <h2 className="text-lg font-semibold" data-testid="text-devices-title">
          Device Allocations
        </h2>
        <p className="text-sm text-muted-foreground" data-testid="text-devices-description">
          View and manage device checkouts. Changes are saved automatically.
        </p>
      </CardHeader>
      <CardContent className="p-4">
        <div className="overflow-x-auto">
          <table className="w-full text-sm" data-testid="table-device-allocations">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left py-2 px-2 font-medium text-muted-foreground text-xs">Device</th>
                <th className="text-left py-2 px-2 font-medium text-muted-foreground text-xs">Device Type</th>
                <th className="text-left py-2 px-2 font-medium text-muted-foreground text-xs">Allocated To</th>
                <th className="text-left py-2 px-2 font-medium text-muted-foreground text-xs">Purpose</th>
                <th className="text-left py-2 px-2 font-medium text-muted-foreground text-xs">Request Date</th>
                <th className="text-left py-2 px-2 font-medium text-muted-foreground text-xs">Checkout</th>
                <th className="text-left py-2 px-2 font-medium text-muted-foreground text-xs">Expected Return</th>
                <th className="text-left py-2 px-2 font-medium text-muted-foreground text-xs">Actual Return</th>
                <th className="text-left py-2 px-2 font-medium text-muted-foreground text-xs">Checked Out By</th>
                <th className="text-left py-2 px-2 font-medium text-muted-foreground text-xs">Checkout Cond.</th>
                <th className="text-left py-2 px-2 font-medium text-muted-foreground text-xs">Return Cond.</th>
                <th className="text-left py-2 px-2 font-medium text-muted-foreground text-xs">Damage</th>
                <th className="text-left py-2 px-2 font-medium text-muted-foreground text-xs">Notes</th>
                <th className="text-left py-2 px-2 font-medium text-muted-foreground text-xs">Status</th>
              </tr>
            </thead>
            <tbody>
              {allocations.map((alloc) => (
                <tr
                  key={alloc.id}
                  className="border-b border-border/30 hover:bg-white/50"
                  data-testid={`row-allocation-${alloc.id}`}
                >
                  <td className="py-2 px-2">
                    <span className="text-xs font-medium">{alloc.deviceName}</span>
                  </td>
                  <td className="py-2 px-2">
                    <span className="text-xs text-muted-foreground">{alloc.deviceType || "—"}</span>
                  </td>
                  <td className="py-2 px-2">
                    <span className="text-xs text-muted-foreground">{alloc.allocatedToType || "—"}</span>
                  </td>
                  <td className="py-2 px-2 min-w-[120px]">
                    <EditableCell
                      value={alloc.allocationPurpose}
                      field="allocationPurpose"
                      allocationId={alloc.id}
                      onSave={handleSave}
                    />
                  </td>
                  <td className="py-2 px-2 min-w-[110px]">
                    <EditableCell
                      value={alloc.requestDate}
                      field="requestDate"
                      allocationId={alloc.id}
                      onSave={handleSave}
                      type="date"
                    />
                  </td>
                  <td className="py-2 px-2 min-w-[110px]">
                    <EditableCell
                      value={alloc.checkoutDate}
                      field="checkoutDate"
                      allocationId={alloc.id}
                      onSave={handleSave}
                      type="date"
                    />
                  </td>
                  <td className="py-2 px-2 min-w-[110px]">
                    <EditableCell
                      value={alloc.expectedReturnDate}
                      field="expectedReturnDate"
                      allocationId={alloc.id}
                      onSave={handleSave}
                      type="date"
                    />
                  </td>
                  <td className="py-2 px-2 min-w-[110px]">
                    <EditableCell
                      value={alloc.actualReturnDate}
                      field="actualReturnDate"
                      allocationId={alloc.id}
                      onSave={handleSave}
                      type="date"
                    />
                  </td>
                  <td className="py-2 px-2">
                    <span className="text-xs">
                      {alloc.studentId || alloc.staffId || alloc.checkoutStaffId || "—"}
                    </span>
                  </td>
                  <td className="py-2 px-2 min-w-[100px]">
                    <EditableCell
                      value={alloc.conditionAtCheckout}
                      field="conditionAtCheckout"
                      allocationId={alloc.id}
                      onSave={handleSave}
                      type="select"
                    />
                  </td>
                  <td className="py-2 px-2 min-w-[100px]">
                    <EditableCell
                      value={alloc.conditionAtReturn}
                      field="conditionAtReturn"
                      allocationId={alloc.id}
                      onSave={handleSave}
                      type="select"
                    />
                  </td>
                  <td className="py-2 px-2 min-w-[140px]">
                    <EditableCell
                      value={alloc.damageDescription}
                      field="damageDescription"
                      allocationId={alloc.id}
                      onSave={handleSave}
                    />
                  </td>
                  <td className="py-2 px-2 min-w-[140px]">
                    <EditableCell
                      value={alloc.notes}
                      field="notes"
                      allocationId={alloc.id}
                      onSave={handleSave}
                    />
                  </td>
                  <td className="py-2 px-2">
                    <Badge
                      variant="outline"
                      className={`text-xs ${getStatusBadge(alloc.status)}`}
                      data-testid={`badge-status-${alloc.id}`}
                    >
                      {alloc.status || "Unknown"}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {allocations.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No device allocations found
          </div>
        )}
      </CardContent>
    </Card>
  );
}
