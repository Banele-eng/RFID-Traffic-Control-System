document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission for validation

    // Collect form data
    const truckId = document.getElementById("truckId").value;
    const driverName = document.getElementById("driverName").value;
    const licensePlate = document.getElementById("licensePlate").value;
    const contactNumber = document.getElementById("contactNumber").value;
    const vehicleType = document.getElementById("vehicleType").value;
    const entryTime = document.getElementById("entryTime").value;

    // Prepare data to send to the backend
    const formData = {
        truckId,
        driverName,
        licensePlate,
        contactNumber,
        vehicleType,
        entryTime
    };

    // Send data to backend
    fetch('http://localhost:3000/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === "Registration successful") {
            document.getElementById("formMessage").textContent = "Registration successful!";
            document.getElementById("formMessage").style.color = "green";
        } else {
            document.getElementById("formMessage").textContent = "Error: " + data.message;
            document.getElementById("formMessage").style.color = "red";
        }
    })
    .catch(error => {
        document.getElementById("formMessage").textContent = "An error occurred.";
        document.getElementById("formMessage").style.color = "red";
    });
});
