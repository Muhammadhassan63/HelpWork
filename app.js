
const OPENAI_API_KEY =  "#"
const submitButton = document.getElementById('submitButton')
const output = document.querySelector('#output')
const inputElement = document.getElementById('input')
const dropdown_value = document.getElementById('language')
let selectedOption = dropdown_value.value;
let text_field_data = "";
dropdown_value.addEventListener('change', function () {
    selectedOption = dropdown_value.value;

});



async function getMessage() {
    text_field_data = inputElement.value
    console.log('clicked')
    let prompt = (`Write me a Code in ${selectedOption} for ${text_field_data}`);
    console.log(prompt)


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

        const response = await fetch('https://api.openai.com/v1/chat/completions', options)
        const data = await response.json()
        console.log(data.choices[0].message.content) 
        input.value = data.choices[0].message.content
    } 
    
    catch (error) {
        console.log(error)

    }
}


submitButton.addEventListener('click', getMessage)