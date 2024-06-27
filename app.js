const axios = require('axios');
const finnhubToken = process.env.FINNHUBTOKEN;

async function getQuote(symbol, callback) {
    
    try {
        const apiUrl1 = `https://finnhub.io/api/v1/quote?symbol=${symbol}`;
        const apiUrl2 = `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}`;

        // Call Finnhub quotw and profile API's
        const [response1, response2] = await Promise.all([
            axios.get(apiUrl1, {headers: {"X-Finnhub-Token":finnhubToken}}),
            axios.get(apiUrl2, {headers: {"X-Finnhub-Token":finnhubToken}})
        ]);

        // Process response
        //console.log(response.data);
        const data = {
            Price: response1.data.c,
            Change: response1.data.d,
            ChangePercent: response1.data.dp,
            DayHigh: response1.data.h,
            DayLow: response1.data.l,
            OpenPrice: response1.data.o,
            PreviousClose: response1.data.pc,
            Symbol: response2.data.ticker,
            Name: response2.data.name
        }
        callback({success: true, data: data});

    } catch (error) {
        //console.error('Error:', error);
        callback({success: true, data: error});
    }
}

async function getWatchlist(symbols, callback) {
    
    const data = [];
    const symbolsArray = symbols.split(',');

    try {
        // Array to store all API requests and responses
        const quoteApiRequests = [];
        const profileApiRequests = [];
        const quoteApiResponsesData = [];
        const profileApiResponsesData = [];

        // Create two arrays of API endpoints
        symbolsArray.forEach(element => {
            quoteApiRequests.push(axios.get(`https://finnhub.io/api/v1/quote?symbol=${element}`, {headers: {"X-Finnhub-Token":finnhubToken}}));
            profileApiRequests.push(axios.get(`https://finnhub.io/api/v1/stock/profile2?symbol=${element}`, {headers: {"X-Finnhub-Token":finnhubToken}}));
        });

        //console.log(quoteApiEndpoints);
        //console.log(profileApiEndpoints);
        //console.log(quoteApiRequests);
        //console.log(profileApiRequests);

        // Wait for all quote and profile requests to complete using Promise.all()
        const quoteResponses = await Promise.all(quoteApiRequests);
        const profileResponses = await Promise.all(profileApiRequests);
        
        // Process quote responses
        quoteResponses.forEach(response => {
            quoteApiResponsesData.push(response.data)
        });

        // Process profile responses
        profileResponses.forEach(response => {
            profileApiResponsesData.push(response.data)
        });


        //console.log(quoteApiResponsesData);
        //console.log(profileApiResponsesData);

        for (let i = 0; i < quoteApiResponsesData.length; i++) {
            data.push({
                Price: quoteApiResponsesData[i].c,
                Change: quoteApiResponsesData[i].d,
                ChangePercent: quoteApiResponsesData[i].dp,
                Symbol: profileApiResponsesData[i].ticker,
                Name: profileApiResponsesData[i].name
            });
        }

        callback({success: true, data: data});

    } catch (error) {
        //console.error('Error:', error);
        callback({success: true, data: error});
    }
}

// Call the async function to start the process
getQuote('aapl', function(x) {
    console.log(x);
});

getWatchlist('aapl,txn,intc', function(x) {
    console.log(x);
});
