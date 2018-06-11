const SlackBot = require('slackbots');
const axios = require('axios');

const bot = new SlackBot({
   token: 'xoxb-378645163924-378871533026-qxnIoeKbZcAAyOS0hHkinIfe',
   name: 'jokebot' 
});

// START HANDLER
bot.on('start', () => {
    const params = {
        icon_emoji: ':smiley:'
    }

    bot.postMessageToChannel(
        'general',
        'Get Ready To Laugh With @Jokebot',
        params
    );    
});

// ERROR HANDELER
bot.on('error', (err) => {
    console.log(err);
});

// MESSAGE HANDLER
bot.on('message', (data) => {
    if(data.type !== 'message') {
        return;
    }

    handleMessage(data.text);
});

// RESPONSE TO DATA
function handleMessage(message) {
    if(message.includes(' chucknorris')) {
        chuckJoke();
    } else if(message.includes(' yomomma')) {
        yoMommaJoke();
    } else if(message.includes(' random')) {
        randomJoke();
    } else if(message.includes(' help')) {
        runHelp();
    }
} 

// TELL A CHUCK NORRIS JOKE
function chuckJoke() {
    axios.get('http://api.icndb.com/jokes/random/')
    .then(res => {
        const joke = res.data.value.joke;

        const params = {
            icon_emoji: ':laughing:'
        }
    
        bot.postMessageToChannel(
            'general',
            `Chuck Norris: ${joke}`,
            params
        ); 

    });
}

// TELL A YoMomma JOKE
function yoMommaJoke() {
    axios.get('http://api.yomomma.info/')
    .then(res => {
        const joke = res.data.joke;

        const params = {
            icon_emoji: ':laughing:'
        }
    
        bot.postMessageToChannel(
            'general',
            `YoMomma: ${joke}`,
            params
        ); 

    });
}

// TELL A RANDOM JOKE
function randomJoke() {
    const rand = Math.floor(Math.random() * 2) + 1;

    if(rand === 1) {
        chuckJoke();
    } else if(rand === 2) {
        yoMommaJoke();
    }
}

// SHOW HELP TEXT
function runHelp() {

    const params = {
        icon_emoji: ':question:'
    }

    bot.postMessageToChannel(
        'general',
        `Type @jokebot with either 'chucknorris', 'yomomma' or 'random' to get a joke`,
        params
    );
}