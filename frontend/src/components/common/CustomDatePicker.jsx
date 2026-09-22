import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CustomDatePicker = ({ 
  selected, 
  onChange, 
  placeholderText,
  isRange = false,
  startDate,
  endDate,
  className,
  showTimeSelect = false,
  value,
  defaultValue,
  ...props 
}) => {
  // Use placeholder from props if placeholderText is not provided
  const actualPlaceholder = placeholderText || props.placeholder || "Select Date";
  // Internal state fallback for uncontrolled usage
  const [internalDate, setInternalDate] = React.useState(null);
  const [internalRange, setInternalRange] = React.useState([null, null]);

  const actualSelected = selected !== undefined ? selected : internalDate;
  const actualStartDate = startDate !== undefined ? startDate : internalRange[0];
  const actualEndDate = endDate !== undefined ? endDate : internalRange[1];

  const handleDateChange = (date) => {
    if (onChange) onChange(date);
    else setInternalDate(date);
  };

  const handleRangeChange = (update) => {
    if (onChange) onChange(update);
    else setInternalRange(update);
  };

  // A custom input wrapper to match the template's UI if needed
  const CustomInput = React.forwardRef(({ value, onClick, onChange, placeholder }, ref) => (
    <div className="input-icon position-relative w-100">
      <span className="input-icon-addon">
        <i className="ti ti-calendar text-gray-9"></i>
      </span>
      <input
        value={value}
        onClick={onClick}
        onChange={onChange}
        ref={ref}
        placeholder={placeholder}
        className={`form-control ${className || ''}`}
        style={{ cursor: 'pointer' }}
      />
    </div>
  ));

  if (isRange) {
    return (
      <div className="custom-date-picker-wrapper w-100">
        <DatePicker
          selectsRange={true}
          startDate={actualStartDate}
          endDate={actualEndDate}
          onChange={handleRangeChange}
          customInput={<CustomInput />}
          placeholderText={actualPlaceholder}
          dateFormat={showTimeSelect ? "MM/dd/yyyy h:mm aa" : "MM/dd/yyyy"}
          showTimeSelect={showTimeSelect}
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          popperPlacement="bottom-start"
          popperProps={{ strategy: 'fixed' }}
          {...props}
        />
        <style>{`
        html[data-theme="dark"] .custom-date-picker-wrapper {
          --bs-body-bg: #1a1c22;
          --bs-border-color: #2e3038;
          --bs-body-color: #a3a8cc;
        }
        .custom-date-picker-wrapper .react-datepicker-popper {
          z-index: 9999 !important;
        }
        .custom-date-picker-wrapper .react-datepicker {
          border: 1px solid var(--bs-border-color, #e3e3e3);
          background-color: var(--bs-body-bg, #fff);
          border-radius: 5px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.05);
          font-family: inherit;
          padding: 10px;
        }
        .custom-date-picker-wrapper .react-datepicker__header {
          background-color: var(--bs-body-bg, #fff);
          border-bottom: none;
          padding-top: 0;
        }
        .custom-date-picker-wrapper .react-datepicker__day-names {
          background-color: rgba(255, 155, 68, 0.05);
          border-radius: 5px;
          margin-bottom: 5px;
        }
        .custom-date-picker-wrapper .react-datepicker__current-month,
        .custom-date-picker-wrapper .react-datepicker-time__header,
        .custom-date-picker-wrapper .react-datepicker-year-header {
          color: var(--primary, #ff9b44);
          font-weight: 600;
          font-size: 15px;
          display: none; /* Hide default header if using dropdowns */
        }
        .custom-date-picker-wrapper .react-datepicker__month-select,
        .custom-date-picker-wrapper .react-datepicker__year-select {
          border: 1px dashed var(--primary, #ff9b44);
          color: var(--primary, #ff9b44);
          border-radius: 4px;
          padding: 2px 5px;
          outline: none;
          background: var(--bs-body-bg, #fff);
          margin: 0 5px;
          font-weight: 600;
          cursor: pointer;
        }
        .custom-date-picker-wrapper .react-datepicker__navigation {
          top: 15px;
        }
        .custom-date-picker-wrapper .react-datepicker__navigation-icon::before {
          border-color: var(--primary, #ff9b44);
          border-width: 2px 2px 0 0;
        }
        .custom-date-picker-wrapper .react-datepicker__day-name {
          color: var(--primary, #ff9b44);
          font-weight: 600;
          width: 35px;
          line-height: 35px;
          margin: 0;
        }
        .custom-date-picker-wrapper .react-datepicker__day {
          width: 35px;
          line-height: 35px;
          margin: 0;
          color: var(--bs-body-color, #4f545a);
          border-radius: 5px;
        }
        .custom-date-picker-wrapper .react-datepicker__day:hover {
          background-color: rgba(255, 155, 68, 0.1);
          color: var(--primary, #ff9b44);
        }
        .custom-date-picker-wrapper .react-datepicker__day--selected,
        .custom-date-picker-wrapper .react-datepicker__day--in-selecting-range,
        .custom-date-picker-wrapper .react-datepicker__day--in-range {
          background-color: var(--primary, #ff9b44) !important;
          color: white !important;
          border-radius: 5px;
        }
        .custom-date-picker-wrapper .react-datepicker__day--keyboard-selected {
          background-color: rgba(255, 155, 68, 0.2);
          color: var(--primary, #ff9b44);
        }
        .custom-date-picker-wrapper .react-datepicker__day--outside-month {
          color: #ccc;
        }
      `}</style>
      </div>
    );
  }

  return (
    <div className="custom-date-picker-wrapper w-100">
      <DatePicker
        selected={actualSelected}
        onChange={handleDateChange}
        customInput={<CustomInput />}
        placeholderText={actualPlaceholder}
        dateFormat={showTimeSelect ? "MM/dd/yyyy h:mm aa" : "MM/dd/yyyy"}
        showTimeSelect={showTimeSelect}
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        popperPlacement="bottom-start"
        popperProps={{ strategy: 'fixed' }}
        {...props}
      />
      <style>{`
        html[data-theme="dark"] .custom-date-picker-wrapper {
          --bs-body-bg: #1a1c22;
          --bs-border-color: #2e3038;
          --bs-body-color: #a3a8cc;
        }
        .custom-date-picker-wrapper .react-datepicker-popper {
          z-index: 9999 !important;
        }
        .custom-date-picker-wrapper .react-datepicker {
          border: 1px solid var(--bs-border-color, #e3e3e3);
          background-color: var(--bs-body-bg, #fff);
          border-radius: 5px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.05);
          font-family: inherit;
          padding: 10px;
        }
        .custom-date-picker-wrapper .react-datepicker__header {
          background-color: var(--bs-body-bg, #fff);
          border-bottom: none;
          padding-top: 0;
        }
        .custom-date-picker-wrapper .react-datepicker__day-names {
          background-color: rgba(255, 155, 68, 0.05);
          border-radius: 5px;
          margin-bottom: 5px;
        }
        .custom-date-picker-wrapper .react-datepicker__current-month,
        .custom-date-picker-wrapper .react-datepicker-time__header,
        .custom-date-picker-wrapper .react-datepicker-year-header {
          color: var(--primary, #ff9b44);
          font-weight: 600;
          font-size: 15px;
          display: none; /* Hide default header if using dropdowns */
        }
        .custom-date-picker-wrapper .react-datepicker__month-select,
        .custom-date-picker-wrapper .react-datepicker__year-select {
          border: 1px dashed var(--primary, #ff9b44);
          color: var(--primary, #ff9b44);
          border-radius: 4px;
          padding: 2px 5px;
          outline: none;
          background: var(--bs-body-bg, #fff);
          margin: 0 5px;
          font-weight: 600;
          cursor: pointer;
        }
        .custom-date-picker-wrapper .react-datepicker__navigation {
          top: 15px;
        }
        .custom-date-picker-wrapper .react-datepicker__navigation-icon::before {
          border-color: var(--primary, #ff9b44);
          border-width: 2px 2px 0 0;
        }
        .custom-date-picker-wrapper .react-datepicker__day-name {
          color: var(--primary, #ff9b44);
          font-weight: 600;
          width: 35px;
          line-height: 35px;
          margin: 0;
        }
        .custom-date-picker-wrapper .react-datepicker__day {
          width: 35px;
          line-height: 35px;
          margin: 0;
          color: var(--bs-body-color, #4f545a);
          border-radius: 5px;
        }
        .custom-date-picker-wrapper .react-datepicker__day:hover {
          background-color: rgba(255, 155, 68, 0.1);
          color: var(--primary, #ff9b44);
        }
        .custom-date-picker-wrapper .react-datepicker__day--selected,
        .custom-date-picker-wrapper .react-datepicker__day--in-selecting-range,
        .custom-date-picker-wrapper .react-datepicker__day--in-range {
          background-color: var(--primary, #ff9b44) !important;
          color: white !important;
          border-radius: 5px;
        }
        .custom-date-picker-wrapper .react-datepicker__day--keyboard-selected {
          background-color: rgba(255, 155, 68, 0.2);
          color: var(--primary, #ff9b44);
        }
        .custom-date-picker-wrapper .react-datepicker__day--outside-month {
          color: #ccc;
        }
        .custom-date-picker-wrapper .react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list li.react-datepicker__time-list-item--selected {
          background-color: var(--primary, #ff9b44) !important;
          color: white !important;
        }
        .custom-date-picker-wrapper .react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list li.react-datepicker__time-list-item:hover {
          background-color: rgba(255, 155, 68, 0.1);
          color: var(--primary, #ff9b44);
        }
      `}</style>
    </div>
  );
};

export default CustomDatePicker;
