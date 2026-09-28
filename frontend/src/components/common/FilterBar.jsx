import React from 'react';
import CustomDatePicker from './CustomDatePicker';
import CustomSelect from './CustomSelect';

const FilterBar = ({ filters, onClear, hasActiveFilters }) => {
  return (
    <div className="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
      {filters.map((filter, index) => {
        if (filter.type === 'date') {
          return (
            <div key={index} className="me-3">
              <div className="input-icon position-relative w-100">
                <span className="input-icon-addon"><i className="ti ti-calendar"></i></span>
                <CustomDatePicker 
                  selected={filter.value[0]}
                  onChange={filter.onChange}
                  startDate={filter.value[0]}
                  endDate={filter.value[1]}
                  isRange={true}
                  placeholderText={filter.placeholder || ""}
                  className="form-control"
                />
              </div>
            </div>
          );
        }

        if (filter.type === 'select') {
          return (
            <div key={index} className="me-3" style={{ minWidth: '150px' }}>
              <CustomSelect 
                options={filter.options}
                value={filter.options.find(o => o.value === filter.value) || filter.options[0]}
                onChange={(option) => filter.onChange(option ? option.value : '')}
              />
            </div>
          );
        }

        return null;
      })}

      {hasActiveFilters && (
        <div className="me-3">
          <button className="btn btn-outline-danger" onClick={onClear}>
            <i className="ti ti-x me-1"></i>Clear
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
