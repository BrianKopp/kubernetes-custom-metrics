# Custom External Emitter

This application exposes a prometheus metric describing some
external resource. Instead of actually polling some external
resource to show in the metrics, the app exposes an endpoint
allowing the value of the metric to be set manually.

## Getting Started

```bash
git clone https://github.com/briankopp/kubernetes-custom-metrics
cd examples/custom-external-emitter
npm install
npm run start
# listening on port 3000
```

## Test the API

```bash
curl localhost:3000
# Hello, World!

# Hit the prometheus endpoint
curl localhost:3000/metrics
# # HELP cm_external_metric The value of some external metric
# # TYPE cm_external_metric gauge
# cm_external_metric 0

# Confirm the value of the metric
curl localhost:3000/value
# {"value": 0}

# Set the value of the metric manually (on UNIX)
curl -X PUT --header "Content-Type: application/json" \
    --data '{"value": 5}' localhost:3000/value
# {"message": "success"}

# On windows, quotes are different
curl -X PUT --header "Content-Type: application/json" \
    --data "{\"value\": 5}" localhost:3000/value
# {"message": "success"}

# Confirm the value was set
curl localhost:3000/value
# {"value": 5}

# Hit prometheus endpoint again
curl localhost:3000/metrics
# # HELP cm_external_metric The value of some external metric
# # TYPE cm_external_metric gauge
# cm_external_metric 5
```
