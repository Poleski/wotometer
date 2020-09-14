const axios = require("axios");

exports.get = (url, res, callback) => {
    console.log('fetching: ' + url);
    axios.get(url)
        .then(response => {
            if (response.data.status === 'ok') {
                const newData = (callback && typeof callback === 'function') ? callback(response.data.data) : response.data.data;
                res.status(200).send(newData);
            } else {
                console.log(response.data);
                res.status(response.data.error.code).send(response.data.error.message);
            }
        })
        .catch(error => {
            console.log(error);
            res.send('error');
        })
};