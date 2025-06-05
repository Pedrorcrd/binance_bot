const axios = require("axios");

const SYMBOL = "BTCUSDT";
const BUY_PRICE = 103832;
const SELL_PRICE = 105520;
const QUANTITY = "0.0001";
const API_KEY = ""
const SECRET_KEY = ""

const API_URL = "https://testnet.binance.vision";//https://api.binance.com

let isOpened = false;

function calcSMA(data){
    const closes= data.map(candle => parseFloat(candle[4]));
    const sum= closes.reduce((a, b) => a + b);
    return sum / data.length;
}

async function start(){
    // comandos do robo
    const {data} = await axios.get(API_URL + "/api/v3/klines?limit=21&interval=15m&symbol=" + SYMBOL);
    const candle = data[data.length - 1];
    const price = parseFloat(candle[4]);
    
    console.clear();
    console.log("Price: " + price);

    const sma21 = calcSMA(data);
    const sma13 = calcSMA(data.slice(8));
    console.log("SMA (21): " + sma21);
    console.log("SMA (11): " + sma13);
    console.log("Is Opened? " + isOpened);

    if (sma13 > sma21 && isOpened === false) {
        console.log("comprar");
        isOpened = true;
    }
    else if (sma13 < sma21 && isOpened === true){
        console.log("vender");
        isOpened = false;
    }
    }   

    setInterval(start, 3000);

    start();