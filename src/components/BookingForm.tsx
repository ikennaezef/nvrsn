"use client";

import { useState } from "react";
import { Calendar, ChevronDown, Check, Loader2 } from "lucide-react";
import { SERVICE_TYPES, PREFERRED_PACKAGES, SOUND_PACKAGES } from "@/lib/data";
import { buildWhatsAppUrl } from "@/lib/util";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */
type FieldType = "text" | "email" | "tel" | "date" | "select" | "textarea";

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  eventVenue: string;
  serviceType: string;
  preferredPackage: string;
  guestCount: string;
  additionalDetails: string;
  agreed: boolean;
};

// Every key except `agreed` (the string-valued inputs)
type StringField = Exclude<keyof FormState, "agreed">;

type FieldConfig = {
  name: StringField;
  label: string;
  type: FieldType;
  placeholder: string;
  required: boolean;
  options?: string[];
};

type Errors = Partial<Record<keyof FormState, boolean>>;

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

// Which package list to show for a given service type.
// Any service not listed here falls back to an empty list (placeholder only).
const PACKAGES_BY_SERVICE: Record<string, string[]> = {
  "Professional DJ Services": PREFERRED_PACKAGES,
  "Sound System Setup": SOUND_PACKAGES,
};

// The two-column grid is driven entirely by this config.
const GRID_FIELDS: FieldConfig[] = [
  {
    name: "fullName",
    label: "Full Name",
    type: "text",
    placeholder: "John Doe",
    required: true,
  },
  {
    name: "email",
    label: "Email Address",
    type: "email",
    placeholder: "john@example.com",
    required: true,
  },
  {
    name: "phone",
    label: "Phone Number",
    type: "tel",
    placeholder: "+234 111 000 00",
    required: true,
  },
  {
    name: "eventType",
    label: "Event Type",
    type: "text",
    placeholder: "Wedding, Concert etc",
    required: true,
  },
  {
    name: "eventDate",
    label: "Event Date",
    type: "date",
    placeholder: "dd/mm/yyyy",
    required: true,
  },
  {
    name: "eventVenue",
    label: "Event Venue",
    type: "text",
    placeholder: "Venue, name or address",
    required: true,
  },
  {
    name: "serviceType",
    label: "Service Type",
    type: "select",
    placeholder: "Select a service",
    required: true,
    options: SERVICE_TYPES.slice(0, -1),
  },
  {
    name: "preferredPackage",
    label: "Preferred Package",
    type: "select",
    placeholder: "Select a package",
    required: true,
    // options are computed at render time based on serviceType — see below.
  },
];

const REQUIRED_FIELDS: StringField[] = GRID_FIELDS.filter(
  (f) => f.required,
).map((f) => f.name);

const initialState: FormState = {
  fullName: "",
  email: "",
  phone: "",
  eventType: "",
  eventDate: "",
  eventVenue: "",
  serviceType: "",
  preferredPackage: "",
  guestCount: "",
  additionalDetails: "",
  agreed: false,
};

/* ------------------------------------------------------------------ */
/* Reusable field                                                      */
/* ------------------------------------------------------------------ */
type FieldProps = {
  name: StringField;
  label: string;
  value: string;
  onChange: (name: StringField, value: string) => void;
  type?: FieldType;
  placeholder?: string;
  required?: boolean;
  error?: boolean;
  options?: string[];
  rows?: number;
  className?: string;
  disabled?: boolean;
};

function Field({
  name,
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required = false,
  error = false,
  options = [],
  rows = 5,
  className = "",
  disabled = false,
}: FieldProps) {
  const base =
    "w-full rounded-xl border bg-white px-5 py-4 text-[15px] outline-none transition focus:ring-2 focus:ring-violet-100";
  const borderClass = error
    ? "border-red-400"
    : "border-gray-200 focus:border-violet-400";

  const control = (() => {
    switch (type) {
      case "select":
        return (
          <div className="relative">
            <select
              id={name}
              name={name}
              value={value}
              onChange={(e) => onChange(name, e.target.value)}
              required={required}
              disabled={disabled}
              className={`${base} ${borderClass} appearance-none pr-12 ${value ? "text-gray-800" : "text-gray-400"} ${disabled ? "cursor-not-allowed bg-gray-50 opacity-60" : ""}`}
            >
              <option value="" disabled>
                {placeholder}
              </option>
              {options.map((opt) => (
                <option key={opt} value={opt} className="text-gray-800">
                  {opt}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-600"
              strokeWidth={2}
            />
          </div>
        );

      case "textarea":
        return (
          <textarea
            id={name}
            name={name}
            rows={rows}
            value={value}
            onChange={(e) => onChange(name, e.target.value)}
            required={required}
            placeholder={placeholder}
            className={`${base} ${borderClass} resize-none text-gray-800 placeholder-gray-400`}
          />
        );

      case "date":
        return (
          <div className="relative">
            <input
              id={name}
              name={name}
              type="text"
              value={value}
              onChange={(e) => onChange(name, e.target.value)}
              onFocus={(e) => {
                e.currentTarget.type = "date";
              }}
              onBlur={(e) => {
                if (!e.currentTarget.value) e.currentTarget.type = "text";
              }}
              required={required}
              placeholder={placeholder}
              className={`${base} ${borderClass} pr-12 text-gray-800 placeholder-gray-400`}
            />
            <Calendar
              className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500"
              strokeWidth={1.75}
            />
          </div>
        );

      default:
        return (
          <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={(e) => onChange(name, e.target.value)}
            required={required}
            placeholder={placeholder}
            className={`${base} ${borderClass} text-gray-800 placeholder-gray-400`}
          />
        );
    }
  })();

  return (
    <div className={className}>
      <label
        htmlFor={name}
        className="mb-2.5 block text-[15px] font-bold text-gray-900"
      >
        {label}
        {required && <span className="text-rose-500"> *</span>}
      </label>
      {control}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Form                                                                */
/* ------------------------------------------------------------------ */
export default function BookingForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Errors>({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Packages depend on the chosen service type.
  const packageOptions = PACKAGES_BY_SERVICE[form.serviceType] ?? [];

  const update = <K extends keyof FormState>(name: K, value: FormState[K]) => {
    setForm((prev) => {
      const next = { ...prev, [name]: value };

      // When the service changes, clear the package if it no longer belongs
      // to the new service's list.
      if (name === "serviceType") {
        const valid = PACKAGES_BY_SERVICE[value as string] ?? [];
        if (!valid.includes(prev.preferredPackage)) {
          next.preferredPackage = "";
        }
      }

      return next;
    });

    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: false }));
    if (submitError) setSubmitError(""); // clear the banner once they start fixing things
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitted(false);

    const nextErrors: Errors = {};
    REQUIRED_FIELDS.forEach((name) => {
      if (!form[name].trim()) nextErrors[name] = true;
    });
    if (!form.agreed) nextErrors.agreed = true;

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setSubmitError("Some required fields are missing.");
      return;
    }

    // Open WhatsApp immediately — inside the click's gesture — so the browser
    // doesn't block it as a popup. (Opening it AFTER an `await` usually gets blocked.)
    window.open(buildWhatsAppUrl(form), "_blank", "noopener,noreferrer");

    // Save a copy to our backend so the lead isn't lost if they never tap send.
    try {
      setIsSubmitting(true);
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(`Save failed with status ${res.status}`);
    } catch (err) {
      // WhatsApp is already open, so a failed save is a background issue — log it
      // rather than blocking the customer or contradicting the handoff.
      console.error("Could not save booking:", err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mx-auto max-w-5xl rounded-2xl lg:rounded-[28px] border border-gray-100 bg-white p-4 shadow-sm md:p-12"
    >
      {/* Hide the native date icon so only our custom calendar icon shows, while keeping the picker clickable */}
      <style>{`
        input[type="date"]::-webkit-calendar-picker-indicator {
          position: absolute;
          right: 0;
          width: 3rem;
          height: 100%;
          opacity: 0;
          cursor: pointer;
        }
      `}</style>

      {/* Two-column grid, driven by GRID_FIELDS */}
      <div className="grid grid-cols-1 gap-x-8 gap-y-7 md:grid-cols-2">
        {GRID_FIELDS.map((field) => {
          const isPackage = field.name === "preferredPackage";

          return (
            <Field
              key={field.name}
              {...field}
              // Package options are derived from the selected service type.
              options={isPackage ? packageOptions : field.options}
              // Keep the package select locked until a service is chosen.
              disabled={isPackage && !form.serviceType}
              placeholder={
                isPackage && !form.serviceType
                  ? "Select a service type first"
                  : field.placeholder
              }
              value={form[field.name]}
              error={errors[field.name]}
              onChange={update}
            />
          );
        })}
      </div>

      {/* Full-width optional fields */}
      <Field
        name="guestCount"
        label="Estimated Guest Count"
        placeholder="e.g., 100-150"
        value={form.guestCount}
        onChange={update}
        className="mt-7"
      />

      <Field
        type="textarea"
        name="additionalDetails"
        label="Additional Details"
        placeholder="Any special requests, add-ons, or additional information..."
        value={form.additionalDetails}
        onChange={update}
        className="mt-7"
      />

      {/* Agreement / note box */}
      <div className="mt-10 rounded-2xl border border-gray-200 p-6">
        <p className="text-[15px] text-gray-400">
          After submitting this form, our team will reach out to you via email
          and/or WhatsApp with the quotation and complete your booking process.
        </p>

        <div className="mt-5 flex items-start gap-3">
          <button
            type="button"
            onClick={() => update("agreed", !form.agreed)}
            aria-pressed={form.agreed}
            aria-label="Agree to terms and conditions"
            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition ${
              form.agreed
                ? "border-violet-500 bg-violet-500"
                : errors.agreed
                  ? "border-red-400 bg-white"
                  : "border-violet-400 bg-white"
            }`}
          >
            {form.agreed && (
              <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
            )}
          </button>

          <p className="text-[15px] text-gray-600">
            I agree to the Terms and Conditions including the booking policy,
            cancellation terms, and payment procedures.
          </p>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`mt-8 flex w-full items-center justify-center gap-2 rounded-full py-4 text-[15px] font-semibold text-white transition ${
          isSubmitting
            ? "cursor-not-allowed bg-violet-400"
            : "bg-violet-500 hover:bg-violet-600 active:bg-violet-700"
        }`}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" strokeWidth={2} />
            Submitting...
          </>
        ) : (
          "Submit Form"
        )}
      </button>

      {/* Status message (mutually exclusive) */}
      {submitError && (
        <p className="mt-4 text-center text-[15px] font-medium text-red-500">
          {submitError}
        </p>
      )}

      {submitted && (
        <p className="mt-4 text-center text-[15px] font-medium text-violet-600">
          Thanks — your booking request has been received.
        </p>
      )}
    </form>
  );
}
