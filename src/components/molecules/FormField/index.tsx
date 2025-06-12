import React from 'react';
import { type FieldError, type UseFormRegisterReturn } from 'react-hook-form';
import { AlertCircle, type LucideIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export interface FormFieldProps {
  id: string;
  label: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  placeholder?: string;
  icon?: LucideIcon;
  register: UseFormRegisterReturn;
  error?: FieldError;
  rightElement?: React.ReactNode;
  className?: string;
  inputClassName?: string;
  required?: boolean;
}

export function FormField({
  id,
  label,
  type = 'text',
  placeholder,
  icon: Icon,
  register,
  error,
  rightElement,
  className = '',
  inputClassName = '',
  required = false,
}: FormFieldProps) {
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
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          className={`${hasIcon ? 'pl-10' : ''} ${hasRightElement ? 'pr-10' : ''} ${inputClassName}`.trim()}
          {...register}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${id}-error` : undefined}
        />
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
