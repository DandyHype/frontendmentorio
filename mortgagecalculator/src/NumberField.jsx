import { useEffect, useState } from 'react';
import './NumberField.css'

function NumberField({ error, fieldName, prefix, sufix }) {
  return (
    <label className="input_label">
      <span className="label_title">{fieldName}</span>
      <div className={`input_wrapper ${error && 'wrapper_error'}`}>
        {prefix && <div className={`prefix ${error && 'error'}`}>{prefix}</div>}
        {sufix && <div className={`sufix ${error && 'error'}`}>{sufix}</div>}
        <input name={fieldName} className="input" type="text"></input>
      </div>
      {error && <p className='error_message'>{error}</p>}
    </label>
  );
}

export default NumberField;
