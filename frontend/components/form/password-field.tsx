"use client";

import React, { forwardRef, useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import type { CheckedState } from "@radix-ui/react-checkbox";

interface PasswordFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  formControlProps?: React.HTMLAttributes<HTMLDivElement>;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
}

const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  function PasswordField(
    { formControlProps, labelProps, ...inputProps }: PasswordFieldProps,
    ref
  ) {
    const [isShowingPassword, setIsShowingPassword] =
      useState<CheckedState>(false);

    const handleCheckboxChange = (checked: CheckedState) => {
      setIsShowingPassword(checked);
    };

    return (
      <div
        className="flex flex-col items-start space-y-2 font-mono w-full"
        {...formControlProps}
      >
        <Label htmlFor="password" {...labelProps}>
          Password
        </Label>
        <Input
          ref={ref}
          id="password"
          type={isShowingPassword ? "text" : "password"}
          required
          {...inputProps}
        />
        <div className="flex justify-end items-center gap-3 font-sans w-full">
          <Checkbox
            id="show-password"
            className="cursor-pointer"
            checked={isShowingPassword}
            onCheckedChange={handleCheckboxChange}
          />
          <Label htmlFor="show-password" className="cursor-pointer">
            Show password
          </Label>
        </div>
      </div>
    );
  }
);

export default PasswordField;
