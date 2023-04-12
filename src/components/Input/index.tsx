import React, { useEffect, useRef } from 'react'
import { useField } from '@unform/core'
import ReactInputMask, { Props as InputProps } from 'react-input-mask'
import { useMyContext } from '@/contexts/context'

interface Props extends InputProps {
  name: string
  label?: string
}

export default function Input({ name, label, ...rest }: Props) {
  const inputRef = useRef(null)

  const { fieldName, defaultValue, registerField, error } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: ref => {
        return ref.current.value
      },
      setValue: (ref, value) => {
        ref.current.value = value
      },
      clearValue: ref => {
        ref.current.value = ''
      },
    })
  }, [fieldName, registerField])

  return (
    <>
      {
        <label htmlFor={fieldName}>
          <span>{label}</span>
          <ReactInputMask
            id={fieldName}
            ref={inputRef}
            defaultValue={defaultValue}
            {...rest}
          />

          {error && <span style={{
            color: 'red',
            fontSize: '0.875rem'
          }}>{error}</span>}
        </label >
      }
    </>
  )
}

Input.defaultProps = {
  mask: ''
}