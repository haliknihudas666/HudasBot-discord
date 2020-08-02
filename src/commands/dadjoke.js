const url = 'https://icanhazdadjoke.com/';
const options = {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
    }
};

if (command === 'dadjoke') {
    const res = await fetch(url, options);
    const json = await res.json();
    console.log(json);

    msg.channel.send(json.joke);
}