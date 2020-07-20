export const validateForm = (field,regEx) => {
    if((new RegExp(regEx)).test(field.value))
        {
            field.classList.remove('invalide');
            return true;
        }
    else 
    {
        field.classList.add('invalide')
        return false;
    }} 