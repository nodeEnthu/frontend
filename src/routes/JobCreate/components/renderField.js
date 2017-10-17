
import React from 'react'

const renderField = ({ input, label, title, type, meta: { touched, error } }) =>
  <div>
    <label>
      {title}
    </label>
    <div>
      <input {...input} placeholder={label} type={type} style={{width:'100%'}}/>
      {touched &&
        error &&
        <div className="error">
          {error}
        </div>}
    </div>
  </div>

export default renderField