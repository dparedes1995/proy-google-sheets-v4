// index.js
const { google } = require("googleapis");
const keys = require("./sheets-bot-api-key.json"); // el archivo descargado del paso 3

const client = new google.auth.JWT(
    keys.client_email,
    null,
    keys.private_key,
    ["https://www.googleapis.com/auth/spreadsheets"]
);

const sheet = google.sheets({ version: "v4", auth: client });

async function appendGasto() {
    await client.authorize();

    const response = await sheet.spreadsheets.values.append({
        spreadsheetId: "1tzHvzh0pse7_krjiGAmBIVnJq25tebbkw1zse7o8HW8", // lo sacas de la URL
        range: "Gastos!A1",
        valueInputOption: "USER_ENTERED",
        requestBody: {
            values: [["2025-06-03", 10, "Comida", "Almuerzo", "Yape", "Tambo", "Laboral", "Junio"]],
        },
    });

    console.log("Registro exitoso", response.status);
}

appendGasto();
