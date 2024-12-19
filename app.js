document.getElementById('writeButton').addEventListener('click', async () => {
    const fullName = document.getElementById('full_name').value;
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const bloodType = document.getElementById('blood_type').value;
    const allergies = document.getElementById('allergies').value;
    const chronicConditions = document.getElementById('chronic_conditions').value;
    const currentMedications = document.getElementById('current_medications').value;
    const emergencyContact = document.getElementById('emergency_contact').value;
    const immunizationRecords = document.getElementById('immunization_records').value;

    const message = `
        1.PI|FN:${fullName}|A:${age}|G:${gender}|BT:${bloodType}
        2.AL|A:${allergies}
        3.CC|C:${chronicConditions}
        4.MED|C:${currentMedications}
        5.EC|C:${emergencyContact}
        6.IMM|I:${immunizationRecords}
    `.trim();

    if ('NDEFReader' in window) {
        try {
            const ndef = new NDEFReader();
            await ndef.write(message).then(() => {
                document.getElementById('message').textContent = 'Message written.';
            }).catch(error => {
                document.getElementById('message').textContent = `Write failed :-( try again: ${error}.`;
            });
        } catch (error) {
            document.getElementById('message').textContent = `Error: ${error}`;
        }
    } else {
        document.getElementById('message').textContent = 'Web NFC is not supported on this device.';
    }
});

document.getElementById('readButton').addEventListener('click', async () => {
    if ('NDEFReader' in window) {
        try {
            const ndef = new NDEFReader();
            await ndef.scan();
            ndef.onreading = event => {
                const decoder = new TextDecoder();
                for (const record of event.message.records) {
                    const data = decoder.decode(record.data);
                    const newWindow = window.open();
                    newWindow.document.write(`
                        <html>
                        <head>
                            <title>NFC Tag Data</title>
                            <style>
                                body {
                                    font-family: Arial, sans-serif;
                                    background-color: #f4f4f4;
                                    margin: 0;
                                    padding: 20px;
                                }
                                .container {
                                    background-color: #fff;
                                    padding: 20px;
                                    border-radius: 8px;
                                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                                }
                                h1 {
                                    text-align: center;
                                    color: #333;
                                }
                                p {
                                    color: #333;
                                }
                                a {
                                    color: #007bff;
                                    text-decoration: none;
                                }
                                a:hover {
                                    text-decoration: underline;
                                }
                            </style>
                        </head>
                        <body>
                            <div class="container">
                                <h1>NFC Tag Data</h1>
                                <pre>${data}</pre>
                            </div>
                        </body>
                        </html>
                    `);
                }
            };
        } catch (error) {
            document.getElementById('message').textContent = `Error: ${error}`;
        }
    } else {
        document.getElementById('message').textContent = 'Web NFC is not supported on this device.';
    }
});
