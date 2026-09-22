import React, { useState, useRef, useEffect } from 'react';

/**
 * CustomSelect — Exact Select2 replica for React.
 * Renders the identical HTML + CSS structure that jQuery Select2 produces
 * so existing style.css rules apply without any extra CSS.
 */
const CustomSelect = ({ options = [], defaultValue, onChange }) => {
  const normalizedOptions = options.map(opt =>
    typeof opt === 'string' ? { value: opt, label: opt } : opt
  );

  const [isOpen, setIsOpen]   = useState(false);
  const [selected, setSelected] = useState(
    defaultValue || (normalizedOptions[0] && normalizedOptions[0].label) || ''
  );
  const containerRef = useRef(null);

  /* Close when clicking outside */
  useEffect(() => {
    const onOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', onOutside);
    return () => document.removeEventListener('mousedown', onOutside);
  }, []);

  const toggle = () => setIsOpen(o => !o);

  const handleSelect = (opt) => {
    setSelected(opt.label);
    setIsOpen(false);
    if (onChange) onChange(opt.value);
  };

  return (
    <span
      ref={containerRef}
      className={[
        'select2-container',
        'select2-container--default',
        isOpen ? 'select2-container--open select2-container--below' : ''
      ].join(' ')}
      style={{ position: 'relative', display: 'inline-block', minWidth: '120px' }}
    >
      {/* The visible selected box */}
      <span className="selection">
        <span
          className="select2-selection select2-selection--single"
          role="combobox"
          aria-haspopup="true"
          aria-expanded={isOpen}
          tabIndex={0}
          onClick={toggle}
          onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') toggle(); }}
          style={{ display: 'block', userSelect: 'none', cursor: 'pointer' }}
        >
          <span className="select2-selection__rendered" title={selected}>
            {selected}
          </span>
          <span className="select2-selection__arrow" role="presentation">
            <b role="presentation" />
          </span>
        </span>
      </span>

      {/* Dropdown panel — only mounted when open */}
      {isOpen && (
        <span
          className="select2-dropdown select2-dropdown--below"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            zIndex: 9999,
            background: '#fff',
            border: '1px solid #ededed',
            borderTop: 'none',
            borderRadius: '0 0 4px 4px',
            boxShadow: '0px 2px 5px rgba(0,0,0,0.1)',
          }}
        >
          <span className="select2-results">
            <ul
              className="select2-results__options"
              role="listbox"
              style={{ listStyle: 'none', margin: 0, padding: '4px 0', maxHeight: 200, overflowY: 'auto' }}
            >
              {normalizedOptions.map((opt, idx) => (
                <li
                  key={idx}
                  className={[
                    'select2-results__option',
                    opt.label === selected ? 'select2-results__option--selected' : ''
                  ].join(' ')}
                  role="option"
                  aria-selected={opt.label === selected}
                  onMouseDown={() => handleSelect(opt)}
                  style={{
                    padding: '6px 12px',
                    cursor: 'pointer',
                    fontSize: 14,
                    background: opt.label === selected ? '#f26522' : 'transparent',
                    color: opt.label === selected ? '#fff' : 'inherit',
                  }}
                  onMouseEnter={e => {
                    if (opt.label !== selected) e.currentTarget.style.background = '#f9f9f9';
                  }}
                  onMouseLeave={e => {
                    if (opt.label !== selected) e.currentTarget.style.background = 'transparent';
                  }}
                >
                  {opt.label}
                </li>
              ))}
            </ul>
          </span>
        </span>
      )}
    </span>
  );
};

export default CustomSelect;
