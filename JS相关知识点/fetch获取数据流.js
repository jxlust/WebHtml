// Node -> chat.js
async function getData() {
    const response = await fetch('http://localhost:4001/', {
        method: 'GET',
        dataType: "text/event-stream",
    })
    if (!response.ok) {
        throw new Error(`Http error status: ${response.status}`);
    }
    const reader = response.body.getReader();
    let decoder = new TextDecoder();

    let finished = true;
    while (finished) {
        const { value, done } = await reader.read();
        if (done) {
            finished = false;
            break;
        } else {
            const str = decoder.decode(value);
            console.log(str);
            updateView(str)

        }
    }
    // const result = await reader.read();
    // console.log(result)
}
const chatDiv = document.createElement('div')
document.body.appendChild(chatDiv)

function updateView(str) {
    chatDiv.innerHTML = chatDiv.innerHTML + str
}

getData();