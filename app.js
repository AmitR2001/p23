const ndef = new NDEFReader();

document.getElementById('writeButton').addEventListener('click', async () => {
    const fullName = document.getElementById('fullName').value;
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const bloodType = document.getElementById('bloodType').value;
    const allergies = document.getElementById('allergies').value;
    const chronicConditions = document.getElementById('chronicConditions').value;
    const currentMedications = document.getElementById('currentMedications').value;
    const emergencyContact = document.getElementById('emergencyContact').value;
    const immunizationRecords = document.getElementById('immunizationRecords').value;

    const data = {
        fullName,
        age,
        gender,
        bloodType,
        allergies,
        chronicConditions,
        currentMedications,
        emergencyContact,
        immunizationRecords
    };

    try {
        await ndef.write({ records: [{ recordType: "text", data: JSON.stringify(data) }] });
        alert('Data written to NFC tag successfully!');
    } catch (error) {
        console.error('Error writing to NFC tag:', error);
        alert('Failed to write data to NFC tag.');
    }
});

document.getElementById('readButton').addEventListener('click', async () => {
    try {
        await ndef.scan();
        ndef.onreading = event => {
            const message = event.message;
            const textDecoder = new TextDecoder();
            let data = '';

            for (const record of message.records) {
                if (record.recordType === "text") {
                    data = textDecoder.decode(record.data);
                }
            }

            localStorage.setItem('nfcData', data);
            window.location.href = 'read.html';
        };
    } catch (error) {
        console.error('Error reading NFC tag:', error);
        alert('Failed to read NFC tag.');
    }
});
