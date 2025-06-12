import React from 'react';
import { type FieldError, type UseFormRegisterReturn } from 'react-hook-form';
import { AlertCircle, type LucideIcon } from 'lucide-react';
import { Label } from '@/components/ui/label';

export interface SelectOption {
  value: string | number;
  label: string;
}

export interface FormFieldSelectProps {
  id: string;
  label: string;
  options: SelectOption[];
  register: UseFormRegisterReturn;
  error?: FieldError;
  icon?: LucideIcon;
  rightElement?: React.ReactNode;
  className?: string;
  selectClassName?: string;
  required?: boolean;
}

export function FormFieldSelect({
  id,
  label,
  options,
  register,
  error,
  icon: Icon,
  rightElement,
  className = '',
  selectClassName = '',
  required = false,
}: FormFieldSelectProps) {
  const hasIcon = !!Icon;
  const hasRightElement = !!rightElement;

  return (
    <div className={`space-y-2 ${className}`}>
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      <div className="relative">
        {hasIcon && (
          <Icon className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
        )}
        <select
          id={id}
          className={`text-foreground w-full rounded-md border border-gray-800 bg-black/80 px-3 py-2 ${
            hasIcon ? 'pl-10' : ''
          } ${hasRightElement ? 'pr-10' : ''} ${selectClassName}`.trim()}
          {...register}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${id}-error` : undefined}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {hasRightElement && (
          <div className="absolute top-1/2 right-3 -translate-y-1/2 transform">
            {rightElement}
          </div>
        )}
      </div>
      {error && (
        <p
          id={`${id}-error`}
          className="text-destructive flex items-center gap-1 text-sm"
          role="alert"
        >
          <AlertCircle className="h-3 w-3 flex-shrink-0" />
          {error.message}
        </p>
      )}
    </div>
  );
}
