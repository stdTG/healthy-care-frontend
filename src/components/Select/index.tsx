import React from 'react';
import { Select } from 'antd';
import { SelectProps } from 'antd/lib/select';

const { Option } = Select

const AppSelect = <T,>(props: Props<T>) => {
  const {
    value,
    onChange,
    style,
    options,
    suffixIcon,
    getOptionValue,
    renderOptions,
    defaultValue,
    ...restProps
  } = props

  return (
    <div>
      <Select
        {...restProps}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        suffixIcon={suffixIcon}
        style={{
          width: '100%',
          borderRadius: '10px',
          ...style
        }}
      >
        {options && options.map((value, index, array) => {
          return (
            <Option value={getOptionValue(value)}>
              {renderOptions(value)}
            </Option>
          )
        })}
      </Select>
    </div>
  )
}

export default AppSelect

interface Props <T> extends Omit<SelectProps<any>, 'options'>{
  options: T[]
  getOptionValue: (option: T) => string | number,
  renderOptions: (option: T) => any
}