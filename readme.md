# Stock API Scaffold Project in Nodejs using Axios

Scaffold project to test logic for calling backend API (Finnhub) to expose two new endpoints below:

`GET /quote?symbol=AAPL`

Response:

```json
{
  "Price": 212.49,
  "Change": -1.75,
  "ChangePercent": -0.8168,
  "DayHigh": 215.17,
  "DayLow": 211.3,
  "OpenPrice": 213.81,
  "PreviousClose": 214.24,
  "Symbol": "AAPL",
  "Name": "Apple Inc"
}
```

`GET /watchlist?symbols=AAPL,INTC,TXN,NVDA,AMZN,MSFT`

Response:

```json
[
  {
    "Change": -1.75,
    "ChangePercent": -0.8168,
    "Price": 212.49,
    "Symbol": "AAPL",
    "Name": "Apple Inc"
  },
  {
    "Change": -0.01,
    "ChangePercent": -0.0328,
    "Price": 30.45,
    "Symbol": "INTC",
    "Name": "Intel Corp"
  },
  {
    "Change": -2.38,
    "ChangePercent": -1.2126,
    "Price": 193.9,
    "Symbol": "TXN",
    "Name": "Texas Instruments Inc"
  },
  {
    "Change": 2.27,
    "ChangePercent": 1.7514,
    "Price": 131.88,
    "Symbol": "NVDA",
    "Name": "NVIDIA Corp"
  },
  {
    "Change": -0.17,
    "ChangePercent": -0.0925,
    "Price": 183.66,
    "Symbol": "AMZN",
    "Name": "Amazon.com Inc"
  },
  {
    "Change": 0.99,
    "ChangePercent": 0.2242,
    "Price": 442.57,
    "Symbol": "MSFT",
    "Name": "Microsoft Corp"
  }
]
```