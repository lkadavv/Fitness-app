window.initMask = function() {
    const display = document.getElementById('phone-display');
    const final = document.getElementById('phone-final');
    const country = document.getElementById('country');

    if (display && final && country) {
        display.value = '';
        final.value = '';
        const option = country.options[country.selectedIndex];
        display.placeholder = option.getAttribute('data-placeholder') || '';
    }
};

document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('phone-display');
    const final = document.getElementById('phone-final');
    const country = document.getElementById('country');

    if (!display || !final || !country) return;

   function updateMask() {
    const code = country.value;
    const option = country.options[country.selectedIndex];
    const digitLength = parseInt(option.getAttribute('data-length') || '9'); 
    
    let digits = display.value.replace(/\D/g, '');
    
    if (digits.length > digitLength) {
        digits = digits.substring(0, digitLength);
    }
    
    let formatted = '';
    if (code === '+380') {
        if (digits.length > 0) formatted += digits.substring(0, 2);
        if (digits.length > 2) formatted += ' ' + digits.substring(2, 5);
        if (digits.length > 5) formatted += ' ' + digits.substring(5, 7);
        if (digits.length > 7) formatted += ' ' + digits.substring(7, 9);
    } else if (code === '+1') { 
        if (digits.length > 0) formatted += digits.substring(0, 3);
        if (digits.length > 3) formatted += ' ' + digits.substring(3, 6);
        if (digits.length > 6) formatted += ' ' + digits.substring(6, 10);
    } else {
        if (digits.length > 0) formatted += digits.substring(0, 3);
        if (digits.length > 3) formatted += ' ' + digits.substring(3, 6);
        if (digits.length > 6) formatted += ' ' + digits.substring(6, 9);
    }

    display.value = formatted;
    
    if (digits.length > 0 && digits.length < digitLength) {
        display.setCustomValidity(`Номер має містити рівно ${digitLength} цифр`);
        final.value = "";
    } else {
        display.setCustomValidity("");
        final.value = digits.length === digitLength ? code + digits : "";
    }
}


    display.addEventListener('input', updateMask);
    
    updateMask();
});