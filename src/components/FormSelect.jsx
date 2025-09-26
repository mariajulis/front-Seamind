
import React from "react";

export const FormSelect = ({
    label,
    icon: Icon,
    value,
    onChange,
    options = [],
    placeholder = "Selecione uma opção",
    required = false,
    className = "",
    ...props
}) => {
    return (
        <div className={`mb-4 ${className}`} {...props}>
            <label className="flex items-center gap-2 text-lg font-medium text-dark mb-3">
                {Icon && <Icon className="w-5 h-5" />}
                {label} {required && <span className="text-red-500">*</span>}
            </label>

            <select
                value={value}
                onChange={onChange}
                required={required}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg
                            text-dark focus:outline-none focus:ring-2 focus:ring-light"
            >

                <option value="">{placeholder}</option>

                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>

        </div>
    )
}
