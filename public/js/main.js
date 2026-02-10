document.getElementById('mainForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
        "name": document.getElementById('name').value,
        "email": document.getElementById('email').value,
        "class": document.getElementById('class').value,
        "number": document.getElementById('number').value
    };

    try {
        const response = await fetch('/api/form/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (result.success) {
            alert('Form submitted successfully!');
            e.target.reset();
        } else {
            alert('Error: ' + result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while submitting the form');
    }
});
