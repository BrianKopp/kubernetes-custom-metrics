const CONNECTION_LIMIT = Number(process.env.CONNECTION_LIMIT || 20);
const STICKY_TTL = Number(process.env.STICKY_TTL || 5);
const express = require('express');

let connectionCount = 0;
const prometheusMetricString = `\
# HELP cm_connection_count The value of some external metric\n\
# TYPE cm_connection_count gauge\n\
cm_connection_count \
`;

const app = express();

app.get('/', (req, res) => res.send('Hello, World!'));
app.get('/connection', (req, res) => {
    console.log('Received connection request');
    connectionCount++;
    let responseMsg = 'Here\'s a new connection! I have ' + connectionCount + ' connections so far!';
    if (connectionCount > CONNECTION_LIMIT) {
        // simulate disconnecting the connection
        console.log('More connections than desired, schedule reduction');
        setTimeout(() => {
            console.log('Reducing connection');
            connectionCount--;
        }, STICKY_TTL * 2 * 1000);
        responseMsg += '\nI have more connections than I want, reduction scheduled.';
    }
    res.send(responseMsg);
});

app.get('/metrics', (req, res) => {
    res.send(prometheusMetricString + connectionCount);
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
