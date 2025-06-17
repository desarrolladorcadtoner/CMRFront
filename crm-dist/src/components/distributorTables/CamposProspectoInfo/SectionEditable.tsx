// SectionEditable.tsx
import React from 'react';
import { InputNumber } from 'primereact/inputnumber';

interface EditableField {
    label: string;
    value: number;
    onChange: (value: number | null) => void;
    prefix?: string;
    suffix?: string;
}

interface SectionEditableProps {
    title: string;
    fields: EditableField[];
}

export const SectionEditable: React.FC<SectionEditableProps> = ({ title, fields }) => (
    <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
            {fields.map((field, idx) => (
                <div className="flex flex-row items-center gap-3 bg-cyan-50 rounded-2xl px-4 py-3 shadow-sm" key={idx}>
                    <label className="font-medium text-gray-700 w-40 min-w-fit">{field.label}:</label>
                    <InputNumber
                        value={field.value}
                        onValueChange={e => field.onChange(e.value ?? 0)}
                        className="w-full border-2 border-none rounded-full focus:border-cyan-600"
                        inputClassName="text-base py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-300 transition"
                        mode="decimal"
                        showButtons
                        buttonLayout="vertical"
                        prefix={field.prefix}
                        suffix={field.suffix}
                        min={0}
                        incrementButtonClassName="p-button p-button-info p-1"
                        decrementButtonClassName="p-button p-button-info p-1"
                        style={{ minWidth: '150px', maxWidth: '200px' }}
                    />
                </div>
            ))}
        </div>
    </div>
  );
