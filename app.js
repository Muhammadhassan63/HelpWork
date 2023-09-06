const OPENAI_API_KEY = "#";
const submitButton = document.getElementById('submitButton');
const output = document.getElementById('output');
const inputElement = document.getElementById('input');
const dropdown_value = document.getElementById('language');
let selectedOption = dropdown_value.value;

let text_field_data = "";
const loader = document.getElementById('loader');

dropdown_value.addEventListener('change', function () {
    selectedOption = dropdown_value.value;
});

async function getMessage() {
    text_field_data = inputElement.value;
    console.log('clicked');
    let prompt = (`Write me a Code in ${selectedOption} for ${text_field_data}`);
    console.log(text_field_data);

    if (text_field_data == null || text_field_data.trim() === "") {
        var alertBox = document.getElementById("alertBox");
        alertBox.style.display = "block";
        return; // Don't send the API request
    }
    console.log(prompt);

    // Show the loader while waiting for the response
    loader.style.display = "block";

    const options = {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${OPENAI_API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", "content": `${prompt}` }],
        })
    }

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', options);
        const data = await response.json();
        console.log(data.choices[0].message.content);
        // Set the value of the output textarea
        output.value = data.choices[0].message.content;
    } catch (error) {
        console.log(error);
    } finally {
        // Hide the loader when the response is received
        loader.style.display = "none";
    }
}

submitButton.addEventListener('click', getMessage);
