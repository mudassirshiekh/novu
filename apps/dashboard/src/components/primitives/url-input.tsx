'use client';

import { Input, InputField, InputProps } from '@/components/primitives/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/primitives/select';
import { RedirectTargetEnum } from '@novu/shared';
import { forwardRef } from 'react';

type URLValue = {
  type: string;
  url: string;
};

type URLInputProps = Omit<InputProps, 'value' | 'onChange'> & {
  options: string[];
  value: URLValue;
  onChange: (value: URLValue) => void;
};

export const URLInput = forwardRef<HTMLInputElement, URLInputProps>((props, ref) => {
  const { options, value, onChange, ...rest } = props;

  return (
    <div className="flex items-center justify-between space-x-2">
      <div className="relative flex-grow">
        <InputField className="pr-0">
          <Input
            ref={ref}
            type="text"
            className="min-w-[20ch]"
            value={value.url}
            onChange={(e) => onChange({ ...value, url: e.target.value })}
            {...rest}
          />
          <Select value={value.type} onValueChange={(val: RedirectTargetEnum) => onChange({ ...value, type: val })}>
            <SelectTrigger className="h-full rounded-l-none border-0 border-l">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </InputField>
      </div>
    </div>
  );
});
