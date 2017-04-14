const isEmpty = value => value === undefined || value === 'undefined' || value === null || value === 'null' || value === '' ;
const isEmptyArray = value => value.length === 0

export function email(value) {
    if (isEmpty(value)) {
        return 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        return 'Invalid email address';
    } else return null;
}

export function required(value,message) {
    if (isEmpty(value)) {
        return message || 'Required';
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
    const max = value;
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

export function regexTime(value) {
    if (isEmpty(value)) {
        return null;
    } else if(!/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]\s[AM|PM]/i.test(value)){
        return "valid date formats are HH:MM AM/PM"
    }

}
export function regexDate(value) {
    if (isEmpty(value)) {
        return null;
    } else if(!/^^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/i.test(value)){
        return "valid date formats are HH:MM AM/PM"
    }
}
export function requiredArray(value,message){
    if (isEmptyArray(value)) {
        return message || 'Required';
    }
}
