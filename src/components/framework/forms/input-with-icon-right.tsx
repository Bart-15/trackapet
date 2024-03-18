'use client';

import React from 'react';

import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  errorBorder?: boolean;
  iconRight: React.ReactNode;
}

const InputWithIconRight = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, iconRight, errorBorder = false, ...props }, ref) => (
    <div
      className={cn(
        `flex h-10 items-center rounded-md border border-input bg-white pl-1 pr-4 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2 ${
          errorBorder ? 'border-red-500' : ''
        }`,
        className,
      )}
    >
      <input
        {...props}
        ref={ref}
        className='w-full p-2 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50'
      />
      <Label>{iconRight}</Label>
    </div>
  ),
);

InputWithIconRight.displayName = 'InputWithIconRight';

export { InputWithIconRight };
