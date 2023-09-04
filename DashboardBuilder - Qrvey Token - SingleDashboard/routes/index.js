const qs = require('qs');
var express = require('express');
var router = express.Router();
const axios = require('axios');
const expiration_time = '1w';

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});


// Generate token to embed widgets with security token
router.post('/generate-qrvey-token', (req, res, next) => {
    let { body } = req;
    body = {
        ...body,
        "userid": process.env.USER_ID,
        "appid": process.env.APP_ID,
        "expiresIn": expiration_time
    }
    let url = `${process.env.BASE_PATH}/devapi/v4/core/login/token`;
    let api = process.env.API_KEY;
    let data = JSON.stringify(body);
    
    var config = {
        method: 'post',
        url: url,
        headers: {
            'x-api-key': api,
            "Content-Type": 'application/json'
        },
        data: data
    };

    axios(config)
        .then(function (response) {
            return res.send(response.data)
        })
        .catch(function (error) {
            res.status(500).send(error)
        });
})



module.exports = router;
