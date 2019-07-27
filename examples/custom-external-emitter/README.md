# Custom External Emitter

This application exposes a prometheus metric describing some
external resource. Instead of actually polling some external
resource to show in the metrics, the app exposes an endpoint
allowing the value of the metric to be set manually.