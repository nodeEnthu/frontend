
import React from 'react'

const renderField = ({ input, label, title, type, meta: { touched, error } }) =>
  <div>
    <label>
      {title}
    </label>
    <div>
      <textarea {...input} placeholder={label} type={type} style={{width:'100%'}}/>
      {touched &&
        error &&
        <span>
          {error}
        </span>}
    </div>
  </div>

export default renderField