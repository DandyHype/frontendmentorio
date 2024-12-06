import { useState } from "react";
import "./RadioField.css";




function RadioField({error, options }) {

  const [option, setOption] = useState('')

function handleOnChange(event){
  const option = event.target.value
  setOption(option)
 
}

  return (
    <section className="form_radios">
    <p>Mortgage Type</p>
      {options &&
        options.map((value) => (
          <label key={value} className="radio_label">
            <span>{value}</span>
            <input name="Mortgage Type" onChange={handleOnChange} type="radio" value={value} checked={option === value}></input>
          </label>
        ))}
        {error && <p className='error_message'>{error}</p>}
    </section>
  );
}

export default RadioField;
