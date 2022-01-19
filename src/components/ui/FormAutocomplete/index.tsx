import { Field } from 'react-final-form';
import React, { PropsWithChildren } from 'react';
import Input from '../Input';
import FormControl from '../FormControl';
import { SValidationError } from '../../../pages/SchedulePage/styled/appointmentAddDialog';
import { AutocompleteProps, AutocompleteRenderOptionState } from '@material-ui/lab/Autocomplete/Autocomplete';
import { Autocomplete } from '@material-ui/lab';
import './index.css'
import { InputProps } from '@material-ui/core';

const FormAutocomplete = <T,>(props: PropsWithChildren<FormAutocompleteProps<T>>) => {
  const {
    name,
    placeholder,
    options,
    getOptionLabel,
    getOptionValue,
    onScroll,
    disabled,
    inputOnChange,
    loading,
    multiple,
    renderOption,
    onChange,
    inputStyle,
    ...restProps
  } = props

  const infinityScroll = (e: any) => {
    const scrollTop = e.target.scrollTop
    const scrollHeight = e.target.scrollHeight
    const clientHeight = e.target.clientHeight

    if (scrollTop + clientHeight >= scrollHeight) {
      onScroll && onScroll()
    }

  }

  const handleMultipleChange = (values: any[]) => {
    return values && values?.map((value) => {
      return typeof value === 'string' ? value : getOptionValue(value)
    })
  }

  const getLabelByValue = (value: any) => {
    const option = options.find((option) => getOptionValue(option) === value)
    return option && getOptionLabel(option)
  }

  return (
    <Field name={name}>
      {({ input, meta}) => {

        return (
          <Autocomplete
            {...restProps}
            size="small"
            multiple={multiple}
            loading={loading}
            disabled={disabled}
            options={options}
            getOptionLabel={((option) => {
              if (multiple && !option) {
                return []
              }
              return typeof option === 'string' ? getLabelByValue(option) : getOptionLabel(option) as any
            })}
            value={input.value || []}
            onChange={(e: any, value: any) => {
              onChange && onChange(e)

              if (multiple) {
                input.onChange(handleMultipleChange(value))
                return
              }
              input.onChange(getOptionValue(value))
            }}
            getOptionSelected={(option, value) => {
              return typeof value === 'string' ? getOptionValue(option) === value : getOptionValue(option) === getOptionValue(value)
            }}
            onBlur={input.onBlur}
            ListboxProps={{
              onScroll: (e: any) => infinityScroll(e)
            }}
            clearOnBlur={false}
            renderOption={renderOption}
            renderInput={(params: any) => (
              <FormControl fullWidth style={{ ...inputStyle, marginBottom: 0 }}>
                  <Input
                    {...params}
                    onFocus={input.onFocus}
                    onChange={(e) => inputOnChange && inputOnChange(e.target.value)}
                    onBlur={input.onBlur}
                    placeholder={placeholder}
                    variant="outlined"
                    size="small"
                  />
                  {meta.error && meta.touched && (
                    <SValidationError>{meta.error}</SValidationError>
                  )}
              </FormControl>
            )}
          />
        )
      }}
    </Field>
  )
}

export default FormAutocomplete


interface FormAutocompleteProps<T> extends Partial<AutocompleteProps<any, any, any, any>>{
  name: string
  placeholder?: string
  onScroll?: () => void
  options: T[],
  getOptionLabel: (options: T) => string
  getOptionValue: (options: T) => any
  disabled?: boolean
  inputOnChange?: (value: string) => void
  loading?: boolean
  multiple?: boolean,
  onChange?: (e: React.ChangeEvent<{}>) => void
  renderOption?: (option: T, state: AutocompleteRenderOptionState) => React.ReactNode
  inputStyle?: any
}

