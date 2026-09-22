import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CustomTimePicker = ({ 
  selected, 
  onChange, 
  placeholderText,
  className,
  ...props 
}) => {
  const actualPlaceholder = placeholderText || props.placeholder || "Select Time";
  const [internalTime, setInternalTime] = React.useState(null);
  const actualSelected = selected !== undefined ? selected : internalTime;

  const handleTimeChange = (time) => {
    if (onChange) onChange(time);
    else setInternalTime(time);
  };

  const CustomInput = React.forwardRef(({ value, onClick, onChange, placeholder }, ref) => (
    <div className="input-icon position-relative w-100">
      <span className="input-icon-addon">
        <i className="ti ti-clock text-gray-9"></i>
      </span>
      <input
        value={value}
        onClick={onClick}
        onChange={onChange}
        ref={ref}
        placeholder={placeholder}
        className={`form-control ${className || ''}`}
        style={{ cursor: 'pointer', backgroundColor: '#fff' }}
      />
    </div>
  ));

  return (
    <div className="custom-time-picker-wrapper w-100">
      <DatePicker
        selected={actualSelected}
        onChange={handleTimeChange}
        customInput={<CustomInput />}
        placeholderText={actualPlaceholder}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="h:mm aa"
        {...props}
      />
      <style>{`
        .custom-time-picker-wrapper .react-datepicker {
          border: 1px solid #e3e3e3;
          border-radius: 5px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.05);
          font-family: inherit;
        }
        .custom-time-picker-wrapper .react-datepicker__header {
          background-color: white;
          border-bottom: none;
          padding-top: 10px;
        }
        .custom-time-picker-wrapper .react-datepicker-time__header {
          color: var(--primary, #ff9b44);
          font-weight: 600;
          font-size: 15px;
        }
        .custom-time-picker-wrapper .react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list li.react-datepicker__time-list-item--selected {
          background-color: var(--primary, #ff9b44) !important;
          color: white !important;
        }
        .custom-time-picker-wrapper .react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list li.react-datepicker__time-list-item:hover {
          background-color: rgba(255, 155, 68, 0.1);
          color: var(--primary, #ff9b44);
        }
      `}</style>
    </div>
  );
};

export default CustomTimePicker;
