import { useState, useEffect } from "react";
import { Phone, Calendar, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import axiosInstance from "@/lib/axios";

interface Metal {
  metalId: number;
  metalType: string;
  metalPurity: string;
}

interface ServiceRequest {
  id: string;
  type: "Service Ticket" | "Custom Design";
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  subject: string;
  description: string;
  submittedDate: string;
  status: "NEW" | "IN_PROGRESS" | "DONE" | "CANCELLED" | "REVIEWED" | "QUOTED" | "CLOSED";
  customerNotes?: string;
  originalData: any;
}

interface RequestDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: ServiceRequest | null;
  /** Optional: parent can refresh list after save */
  onUpdateStatus?: (newStatus?: ServiceRequest["status"]) => void;
}

export default function RequestDetailsModal({
  isOpen,
  onClose,
  request,
  onUpdateStatus,
}: RequestDetailsModalProps) {
  const [metals, setMetals] = useState<Metal[]>([]);
  const [status, setStatus] = useState<ServiceRequest["status"] | undefined>(undefined);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchMetals = async () => {
      try {
        const response = await axiosInstance.get("/api/metals");
        setMetals(response.data);
      } catch (error) {
        console.error("Error fetching metals:", error);
      }
    };
    if (isOpen) fetchMetals();
  }, [isOpen]);

  // Initialize status when request changes
  useEffect(() => {
    if (request) setStatus(request.status);
  }, [request]);

  if (!request) return null;

  const getMetalName = (metalId: number | undefined) => {
    if (!metalId) return "Not specified";
    const metal = metals.find((m) => m.metalId === metalId);
    return metal ? `${metal.metalType} - ${metal.metalPurity}` : "Unknown metal";
  };

  const getCustomDesignImages = () => {
    if (request.type !== "Custom Design") return [];
    const design = request.originalData as any;
    return design.image ? [design.image] : [];
  };

  const statusTone =
    request.type === "Custom Design" ? "bg-teal/15 text-teal" : "bg-sky-blue/15 text-navy";

  const statusOptions =
    request.type === "Service Ticket"
      ? (["NEW", "IN_PROGRESS", "DONE", "CANCELLED"] as const)
      : (["NEW", "REVIEWED", "IN_PROGRESS", "QUOTED", "CLOSED"] as const);

  // PUT full object to backend
  const handleSaveStatus = async () => {
    if (!status) return;
    try {
      setSaving(true);

      if (request.type === "Service Ticket") {
        const ticket = request.originalData; // expects { serviceId, ... }
        const payload = { ...ticket, status };
        await axiosInstance.put(`/api/serviceticket/${ticket.serviceId}`, payload);
      } else {
        const design = request.originalData; // expects { designId, ... }
        const payload = { ...design, status };
        await axiosInstance.put(`/api/customdesign/${design.designId}`, payload);
      }

      toast.success("Status updated");
      onUpdateStatus?.(status);
      onClose(); // close modal after save
    } catch (err: any) {
      if (err?.response?.status === 401) {
        toast.error("Authentication failed. Please log in again.");
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        window.location.href = "/auth/login";
      } else {
        toast.error(err?.response?.data?.message || "Failed to update status");
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-display">Request Details</DialogTitle>
            <span className="text-sm font-mono text-muted-foreground">{request.id}</span>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Customer Information */}
          <div className="bg-muted/50 p-4 rounded-lg space-y-3">
            <h3 className="font-semibold text-lg">Customer Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium">{request.customerName || "N/A"}</p>
              </div>
              <div className="flex items-center gap-2">
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium text-sm">{request.customerEmail || "N/A"}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{request.customerPhone || "N/A"}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Submitted</p>
                  <p className="font-medium">
                    {request.submittedDate
                      ? new Date(request.submittedDate).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Request Details */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  request.type === "Custom Design" ? "bg-teal/20 text-teal" : "bg-sky-blue/20 text-navy"
                }`}
              >
                {request.type}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusTone}`}>
                {status}
              </span>
            </div>

            <div>
              <h3 className="font-display text-2xl font-semibold mb-2">
                {request.subject || `${request.type} Request`}
              </h3>
              <p className="text-muted-foreground whitespace-pre-wrap">{request.description}</p>
            </div>

            {/* Preferred Metal for Custom Design */}
            {request.type === "Custom Design" && (
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">Preferred Metal Type</h4>
                <p className="text-muted-foreground">
                  {getMetalName((request.originalData as any).preferredMetalId)}
                </p>
              </div>
            )}
          </div>

          {/* Customer Notes */}
          {request.customerNotes && (
            <div className="border-t pt-6 space-y-4">
              <h3 className="font-semibold text-lg">Customer Notes</h3>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <p className="text-muted-foreground whitespace-pre-wrap">{request.customerNotes}</p>
              </div>
            </div>
          )}

          {/* Design Images for Custom Design */}
          {request.type === "Custom Design" && getCustomDesignImages().length > 0 && (
            <div className="border-t pt-6 space-y-4">
              <h3 className="font-semibold text-lg">Design Images</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {getCustomDesignImages().map((imageUrl: string, index: number) => (
                  <div key={index} className="relative">
                    <img
                      src={imageUrl}
                      alt={`Design ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg border"
                    />
                    <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                      Image {index + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Status selector + Actions */}
          <div className="border-t pt-6 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
              <div className="md:col-span-2">
                <Label htmlFor="status">Change Status</Label>
                <Select value={status} onValueChange={(v) => setStatus(v as ServiceRequest["status"])}>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={onClose} disabled={saving}>
                  Close
                </Button>
                <Button onClick={handleSaveStatus} disabled={!status || saving}>
                  <Pencil className="h-4 w-4 mr-2" />
                  {saving ? "Saving..." : "Update Status"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
