const isEmpty = value => value === undefined || value === null || value === '';

export function email(value) {
    // Let's not start a debate on email regex. This is just for an example app!
    if(isEmpty(value)){
      return 'Required';
    }
    else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        return 'Invalid email address';
    }
}

export function required(value) {
    if (isEmpty(value)) {
        return 'Required';
    }
}

export function minLength(min) {
    return value => {
        if (!isEmpty(value) && value.length < min) {
            return `Must be at least ${min} characters`;
        }
    };
}

export function maxLength(value) {
    const max = 8;
    if (!isEmpty(value) && value.length > max) {
        return `Please keep it below ${max} character limit`;
    }

}

export function integer(value) {
    if (!Number.isInteger(Number(value))) {
        return 'Must be an integer';
    }
}

export function oneOf(enumeration) {
    return value => {
        if (!~enumeration.indexOf(value)) {
            return `Must be one of: ${enumeration.join(', ')}`;
        }
    };
}
