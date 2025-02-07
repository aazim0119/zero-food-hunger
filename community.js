document.getElementById('community-signup').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the values from the form
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    // Display a confirmation message (you can customize this)
    alert(`Thank you for joining us, ${name}! We will contact you at ${email}.`);

    // Optionally, clear the form fields after submission
    document.getElementById('community-signup').reset();
});
