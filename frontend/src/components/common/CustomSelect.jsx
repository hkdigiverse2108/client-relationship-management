import React from 'react';
import Select from 'react-select';

const CustomSelect = ({ children, options, value, onChange, placeholder, isMulti, className, isSearchable = true, ...props }) => {
  
  // Custom styling to match Select2 and the template's Bootstrap theme perfectly
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      minHeight: '40px',
      borderRadius: '5px',
      border: state.isFocused ? '1px solid var(--primary, #ff9b44)' : '1px solid var(--custom-border, #e3e3e3)',
      boxShadow: 'none',
      backgroundColor: 'var(--custom-bg, transparent)',
      cursor: 'pointer',
      '&:hover': {
        border: state.isFocused ? '1px solid var(--primary, #ff9b44)' : '1px solid var(--custom-border, #e3e3e3)'
      }
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: '2px 15px',
    }),
    input: (provided) => ({
      ...provided,
      margin: '0px',
      color: 'var(--custom-text, #333)'
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      height: '38px',
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: 'var(--custom-muted, #6f7072)',
      padding: '8px 15px',
      '&:hover': {
        color: 'var(--custom-text, #333)'
      }
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: '5px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
      marginTop: '4px',
      border: '1px solid var(--custom-border, #e3e3e3)',
      backgroundColor: 'var(--custom-menu-bg, #fff)',
      zIndex: 9999,
      padding: '4px 0'
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected 
        ? 'rgba(255, 155, 68, 0.1)' 
        : state.isFocused 
          ? 'var(--custom-hover-bg, #f8f9fa)' 
          : 'transparent',
      color: state.isSelected ? 'var(--primary, #ff9b44)' : 'var(--custom-text, #4f545a)',
      padding: '8px 15px',
      cursor: 'pointer',
      fontSize: '14px',
      '&:hover': {
        backgroundColor: state.isSelected ? 'rgba(255, 155, 68, 0.1)' : 'var(--custom-hover-bg, #f8f9fa)',
        color: state.isSelected ? 'var(--primary, #ff9b44)' : 'var(--custom-text, #333)'
      }
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'var(--custom-text, #4f545a)',
      fontSize: '14px',
      fontWeight: '400'
    })
  };

  // Convert standard <option> children to react-select options format
  const parsedOptions = React.useMemo(() => {
    if (options) return options;
    if (!children) return [];
    
    const childrenArray = React.Children.toArray(children);
    return childrenArray
      .filter(child => child.type === 'option') 
      .map(child => {
        // If value is explicitly provided, use it. Otherwise, use the text content as value.
        const val = child.props.value !== undefined ? child.props.value : child.props.children;
        return {
          value: val,
          label: child.props.children
        };
      })
      // Filter out options that are essentially placeholders (e.g. "Select", "Choose...") if they have empty value
      .filter(opt => opt.value !== '' && opt.label !== 'Select'); 
  }, [children, options]);

  // Extract placeholder from children if it's an option without a value
  const derivedPlaceholder = React.useMemo(() => {
    if (placeholder) return placeholder;
    if (!children) return "Select";
    
    const childrenArray = React.Children.toArray(children);
    const placeholderChild = childrenArray.find(child => 
      child.type === 'option' && 
      (child.props.value === '' || child.props.children === 'Select' || child.props.children === 'Select...')
    );
    return placeholderChild ? placeholderChild.props.children : "Select";
  }, [children, placeholder]);

  return (
    <>
      <style>{`
        html[data-theme="dark"] {
          --custom-bg: transparent;
          --custom-menu-bg: #1a1c22;
          --custom-border: #2e3038;
          --custom-text: #a3a8cc;
          --custom-muted: #6c7293;
          --custom-hover-bg: #2e3038;
        }
      `}</style>
      <Select
      className={`custom-react-select ${className || ''}`}
      classNamePrefix="react-select"
      options={parsedOptions}
      value={value}
      onChange={onChange}
      placeholder={derivedPlaceholder}
      isMulti={isMulti}
      isSearchable={isSearchable}
      styles={customStyles}
      {...props}
    />
    </>
  );
};

export default CustomSelect;
