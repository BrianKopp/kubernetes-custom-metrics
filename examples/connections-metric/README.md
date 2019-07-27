# Connections Metric

This is a dummy application designed to simulate the control flow
for scaling a `socket.io` server based on the number of client connections
it has open.

The real-world requirements that this app will try to emulate is the following:

* Cluster of `socket.io` servers collectively serving many thousands of clients.
* Need to scale apps to server `socket.io`, targeting an average number of connections per app.
* Each app must be able to defend itself, rejecting new connections after it reaches a threshold.

This logic will be simulated by keeping a tally of requests that come in
on the `/connection` endpoint. This tally will simulate the `connection_count`
real-world metric.

A super chatty and high-volume socketio server in real life can become overwhelmed
trying to serve and maintain too many socketio connections. The event loop simply
gets overwhelmed. In reality the server app needs to defend itself.
Once the app gets more than the CONNECTION_LIMIT, it will simulate closing the connection.
In real life, the app would need to schedule a socket disconnect at some point
in the future. Since it would be in a cluster, the load balancer would be providing
a sticky cookie with a TTL, so the app would need to schedule the disconnect at
some point past the TTL, say 2*TTL. Clients would then reconnect and get
round-robin'd by the load balancer to another server in the cluster.

The app exposes this `connection_count` metric on the `/metrics` endpoint, and is
scaled according to the average `connection_count`.

## Getting Started

```bash
git clone https://github.com/briankopp/kubernetes-custom-metrics
cd examples/connections-metric
npm install
npm run start
```
