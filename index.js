
const {exec} = require('child_process');
const _ = require('underscore');
const config = require('./config.json');
const express = require('express');
const bodyParser = require('body-parser');
let app = express();

app.use(bodyParser.json({
    type: 'application/json'
}));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/', function (req, res) {

    let text = req.body.text;

    if(!text)
        return res.status(400).send({
            error: 'text not found'
        });

    stem(text, function (err, result) {
        if(err)
            return res.status(400).send({
                error: err
            });
        res.send(result);
    });

});

app.use(function(req, res, next) {
    res.sendStatus(404);
});

app.listen(config.port, function () {
    console.log(`Mystem wrapper started on port ${config.port}`);
});

let stem = (text, cb) => {

    exec(`echo '${text}' | ${config.mystem_path} -e UTF-8 -gni --format json`, (error, stdout, stderr) => {
        if (error || stderr) {
            return cb(error || stderr);
        }

        let result = _.map(stdout.split('\n'), function (item) {
            return item ? JSON.parse(item) : null;
        });

        result = _.filter(result, function (item) {
            return !!item;
        });

        let words = _.map(result, function (item) {
            return item.analysis[0].lex;
        }).join(' ');

        cb(null, {
            text: text,
            analisys: result,
            words: words
        });

    });

};