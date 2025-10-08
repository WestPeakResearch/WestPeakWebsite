import React, { useState } from "react"
import {
  pfForm,
  pfGroup,
  pfLabel,
  pfRequiredMark,
  pfInput,
  pfTextarea,
  pfSelect,
  pfCheckboxGroup,
  pfCheckboxLabel,
  pfCheckboxInput,
  pfHelp,
  pfButton,
  pfStatus,
  pfStatusSuccess,
  pfStatusError,
} from "./ProxiedForm.module.css"

type BaseField = {
  name: string
  label: string
  required?: boolean
  placeholder?: string
  helpText?: string
  defaultValue?: string
  pattern?: string
}

type TextField = BaseField & {
  type?: "text" | "email" | "tel" | "url" | "number" | "password"
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"]
}

type TextareaField = BaseField & { type: "textarea"; rows?: number }

type SelectField = BaseField & {
  type: "select"
  options: Array<{ value: string; label: string }>
  multiple?: boolean
}

type CheckboxGroupField = BaseField & {
  type: "checkbox-group"
  options: Array<{ value: string; label: string }>
}

type Field = TextField | TextareaField | SelectField | CheckboxGroupField

type Props = {
  formName: string
  fields: Field[]
  className?: string
  formDescription?: React.ReactNode
}

export default function ProxiedForm({
  formName,
  fields,
  className = "",
  formDescription,
}: Props) {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle")
  const [errorMsg, setErrorMsg] = useState("")

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("submitting")
    setErrorMsg("")
    const form = e.currentTarget
    try {
      const fd = new FormData(form)
      const res = await fetch("https://workers.icy-salad-5670.workers.dev", {
        method: "POST",
        body: fd,
      })
      const ok = res.ok
      const maybeJson = await safeJson(res)
      if (ok) {
        form.reset()
        window.scrollTo({ top: 0, behavior: "smooth" });
        setStatus("success")
      } else {
        setStatus("error")
        setErrorMsg(maybeJson?.error || `Request failed (${res.status})`)
      }
    } catch (err: any) {
      setStatus("error")
      setErrorMsg(err?.message || "Network error")
    }
  }

  if (status === "success") {
    return (
      <div className={pfForm}>
        {formDescription}
        <p className={pfStatusSuccess}>Thanks, your response has been recorded!</p>
      </div>
    );
  }

  return (
    <form
      action="https://workers.icy-salad-5670.workers.dev"
      method="POST"
      onSubmit={onSubmit}
      className={`${pfForm} ${className}`}
      noValidate
    >
      {formDescription}
      <input type="hidden" name="tab" value={formName} tabIndex={-1} />

      {fields.map(f => (
        <div key={f.name} className={pfGroup}>
          <label htmlFor={f.name} className={pfLabel}>
            {f.label}
            {f.required && <span className={pfRequiredMark}> *</span>}
          </label>

          {f.type === "textarea" ? (
            <textarea
              id={f.name}
              name={f.name}
              required={f.required}
              placeholder={f.placeholder}
              defaultValue={f.defaultValue}
              rows={(f as TextareaField).rows || 4}
              className={pfTextarea}
            />
          ) : f.type === "select" ? (
            <select
              id={f.name}
              name={f.name}
              required={f.required}
              defaultValue={f.defaultValue}
              className={pfSelect}
              multiple={(f as SelectField).multiple}
            >
              {(f as SelectField).options.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ) : f.type === "checkbox-group" ? (
            <div className={pfCheckboxGroup}>
              {(f as CheckboxGroupField).options.map(opt => (
                <label key={opt.value} className={pfCheckboxLabel}>
                  <input
                    className={pfCheckboxInput}
                    type="checkbox"
                    name={f.name}
                    value={opt.value}
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          ) : (
            <input
              id={f.name}
              name={f.name}
              type={(f as TextField).type || "text"}
              inputMode={(f as TextField).inputMode}
              pattern={f.pattern}
              required={f.required}
              placeholder={f.placeholder}
              defaultValue={f.defaultValue}
              className={pfInput}
            />
          )}

          {f.helpText && <p className={pfHelp}>{f.helpText}</p>}
        </div>
      ))}

      <button
        type="submit"
        disabled={status === "submitting"}
        className={pfButton}
      >
        {status === "submitting" ? "Submitting…" : "Submit"}
      </button>

      {status === "error" && (
        <p className={`${pfStatus} ${pfStatusError}`}>
          Error: {errorMsg || "Something went wrong."}
        </p>
      )}
    </form>
  )
}

async function safeJson(res: Response) {
  const ct = res.headers.get("content-type") || ""
  if (!ct.includes("application/json")) return null
  try {
    return await res.json()
  } catch {
    return null
  }
}
