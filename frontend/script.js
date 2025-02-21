document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission for validation
    
    // Validate form fields
    const truckId = document.getElementById("truckId").value;
    const driverName = document.getElementById("driverName").value;
    const licensePlate = document.getElementById("licensePlate").value;
    const contactNumber = document.getElementById("contactNumber").value;
    const vehicleType = document.getElementById("vehicleType").value;
    const entryTime = document.getElementById("entryTime").value;

    if (truckId === "" || driverName === "" || licensePlate === "" || contactNumber === "" || vehicleType === "" || entryTime === "") {
        document.getElementById("formMessage").textContent = "All fields are required!";
        document.getElementById("formMessage").style.color = "red";
    } else {
        // In a real application, you would send the data to the server here
        document.getElementById("formMessage").textContent = "Registration successful!";
        document.getElementById("formMessage").style.color = "green";
    }
});
