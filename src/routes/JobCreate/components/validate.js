const validate = values => {
  const errors = {}
  if (!values.address) {
    errors.address = 'Required'
  }
  if (!values.place_id) {
    errors.place_id = 'Required'
  }
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.budget) {
    errors.budget = 'approximate budget per meal'
  }
  if (values.budget) {
    let integerTest = /^-?\d+\.?\d*$/ ;
    if (!integerTest.test(values.budget))
      errors.budget = 'inly numbers are allowed';
  }
  return errors
}

export default validate
