Response Attributes:

c
Current price

d
Change

dp
Percent change

h
High price of the day

l
Low price of the day

o
Open price of the day

pc
Previous close price


EndPoint : https://finnhub.io/docs/api/quote Or  "https://finnhub.io/api/v1/quote?symbol=AAPL&token=ccva2o2ad3iaeesdj0u0ccva2o2ad3iaeesdj0ug"

Search Endpoint : "https://finnhub.io/api/v1/search?q=apple&token=ccva2o2ad3iaeesdj0u0ccva2o2ad3iaeesdj0ug"

<!-- Working with time stamp -->

const date = new Date()

<!-- -- this will return current time in millsecond -->
const currentTime = date.getTime() 

<!-- -- this will return current time in second -->
const currentTimeSecond = math.floor(date.getTime()/ 1000)

<!-- -- this will return current time in seconnd a day ago -->
const oneDayAge = currentTimeSecon - 60*60*24

<!-- -- this will return current time in seconnd a week ago -->
const oneDayAge = currentTimeSecon - 60*60*24*7


<!-- chartData structure  -->

chartData = {
    day: "",
    week:"",
    year:""
}
<!-- Data structure inside the day, week and year -->
data = [
    {
        x:4,
        y:6
    },
    {
        x:4,
        y:6
    }
]


<!-- For the chart -->
https://apexcharts.com/     ---- is been used

https://apexcharts.com/docs/react-charts/