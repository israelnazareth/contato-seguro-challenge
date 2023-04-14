import React, { useRef, useEffect } from "react";
import ReactSelect, { Props as SelectProps } from "react-select";
import { useField } from "@unform/core";

interface Props extends SelectProps {
  name: string;
  label?: string;
}

export function SelectUsers({ name, label, ...rest }: Props) {
  const { fieldName, defaultValue, registerField, error } = useField(name);

  const selectRef = useRef(null);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref) => ref.state.selectValue,
      setValue: (ref, value) => {
        ref.select.setValue(value || null);
      }
    });
  }, [fieldName, registerField]);

  return (
    <>
      <label htmlFor={fieldName}>
        <span>{label}</span>
        <ReactSelect
          ref={selectRef}
          defaultValue={defaultValue}
          {...rest}
        />

        {error && <span style={{
          color: 'red',
          fontSize: '0.875rem',
          fontWeight: 'bold'
        }}>{error}</span>}
      </label >
    </>
  );
};
