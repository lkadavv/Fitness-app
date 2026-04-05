document.addEventListener('DOMContentLoaded', function() {
    const fields = ['client_name', 'client_surname'];

    fields.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('input', function() {
                this.value = this.value.replace(/\d/g, '');
            });
        }
    });
});