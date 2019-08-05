const express = require('express');
const bodyParser = require('body-parser');

let externalMetricValue = Number(process.env.CUSTOM_METRIC || 0);

const prometheusMetricString = `\
# HELP custom_external_metric The value of some external metric\n\
# TYPE custom_external_metric gauge\n\
custom_external_metric \
`;

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello, World!\n'));

app.get('/metrics', (req, res) => {
    res.send(prometheusMetricString + externalMetricValue + '\n');
});

app.get('/value', (req, res) => res.json({ value: externalMetricValue }));

app.put('/value', (req, res) => {
    if (!req.body || typeof req.body.value === 'undefined') {
        console.error('bad request, expected body and value');
        res.status(400).json({ error: 'Bad Request', reason: 'Expected request body to have value'})
    } else {
        try {
            externalMetricValue = Number(req.body.value);
            console.log('set new metric value to ' + externalMetricValue);
            res.json({ message: 'success' });
        } catch (e) {
            console.error('error parsing number from body value', e);
            res.status(400).json({ error: 'error parsing body value' });
        }
    }
});

const port = Number(process.env.PORT || 3000);
const server = app.listen(port, () => console.log('listening on port ' + port));

const shutdown = (signal) => {
    console.log('received signal ' + signal + ', closing server');
    server.close((err) => {
        if (err) {
            console.error('error shutting down server', err);
            process.exit(1);
        } else {
            console.log('successfully shut down server');
            process.exit(0);
        }
    });
}
process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
