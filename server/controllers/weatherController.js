const axios = require('axios')

module.exports = {
    openWeather: function (req, res) {
        let city = req.params.city

        axios({
            url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${process.env.WEATHER}`,
            method: 'GET'
        })
        .then( data => {
            res.status(200).json({data:data.data})
        })
        .catch( err => {
            res.status(500).json("Internal server error")
        })
    }
}