import React from 'react';
import { InputNumber } from 'primereact/inputnumber';

interface EditableField {
    label: string;
    value: number;
    onChange: (value: number | null) => void;
    prefix?: string;
    suffix?: string;
    icon?: React.ReactNode; // Nuevo: permite iconos si los deseas más adelante
}

interface SectionEditableProps {
    title: string;
    fields: EditableField[];
}

export const SectionEditable: React.FC<SectionEditableProps> = ({ title, fields }) => (
    <section className="mb-10 bg-white rounded-2xl shadow-2xl border border-[#f3f3f3] px-8 py-8">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0b4468] mb-8 border-b-2 border-[#de1c85] pb-2 tracking-tight">
            {title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
            {fields.map((field, idx) => (
                <div
                    key={idx}
                    className="flex flex-row items-center gap-4 bg-[#f3f3f3] hover:bg-[#fff6fb] rounded-2xl px-6 py-4 shadow-sm 
                    transition-all duration-200 border border-transparent hover:border-[#de1c85]"
                >
                    {field.icon && (
                        <span className="text-[#de1c85] text-2xl">{field.icon}</span>
                    )}
                    <label className="font-semibold text-gray-700 w-40 min-w-min">
                        {field.label}:
                    </label>
                    <InputNumber
                        value={field.value}
                        onValueChange={e => field.onChange(e.value ?? 0)}
                        className=" border border-[#de1c85] rounded-lg focus:ring-2 focus:ring-[#de1c85] bg-white text-sm"
                        inputClassName="text-sm w-28 py-1 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#de1c85] transition"
                        mode="decimal"
                        prefix={field.prefix}
                        suffix={field.suffix}
                        min={0}
                    />
                </div>
            ))}
        </div>
    </section>
);
