import React from "react";

export const FormTextarea = ({
    label,
    value,
    onChange,
    placeholder,
    required = false,
    rows = 4,
    className = "",
    ...props
}) => {
    return (
        <div className={`mb-4 ${className}`} {...props}>

            <label className="block text-lg font-medium text-dark mb-3">
                {label} {required && <span className="text-red-500">*</span>}


            </label>
            <textarea
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                rows={rows}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg
                        text-dark focus:outline-none focus:ring-2 focus:ring-light"

            />
        </div>
    )
}
