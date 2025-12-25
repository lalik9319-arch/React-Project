
export const getEmailError = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value !== "" && !emailRegex.test(value)) {
        return "כתובת אימייל לא תקינה";
    } else {
        return "";
    }
};
export const getPasswordError = (value: string): string => {
    const passwordRegex = /^(password|(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|~`]).{8,})$/;
    if (value === "") {
        return "";
    } else if (!passwordRegex.test(value)) {
        return "הסיסמה חייבת להכיל 8 תווים, אות, מספר וסימן מיוחד";
    } else {
        return "";
    }
};