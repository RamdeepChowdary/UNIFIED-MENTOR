document.getElementById("booking-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const studentName = document.getElementById("studentName").value;
    const teacherName = document.getElementById("teacherName").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;

    if (studentName && teacherName && date && time) {
        db.collection("appointments").add({
            studentName,
            teacherName,
            date,
            time
        }).then(() => {
            alert("Appointment Booked!");
            document.getElementById("booking-form").reset();
            loadAppointments();
        }).catch(error => console.error("Error adding appointment: ", error));
    }
});

// Function to Load Appointments
function loadAppointments() {
    const appointmentsList = document.getElementById("appointments-list");
    appointmentsList.innerHTML = "";

    db.collection("appointments").get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
            const appointment = doc.data();
            const li = document.createElement("li");
            li.textContent = `${appointment.studentName} booked with ${appointment.teacherName} on ${appointment.date} at ${appointment.time}`;
            appointmentsList.appendChild(li);
        });
    });
}

// Load appointments on page load
window.onload = loadAppointments;