# Review Instructions

The repository contains a NestJS backend and a React (react-router framework) frontend.

## Getting Started

Run the applications using docker compose:

```bash
docker compose up -d --build
```

The frontend will be available at http://localhost:5173 and the backend at http://localhost:3000

## Ingesting Data

The backend provides an endpoint at `/ingest/url` that can be used to ingest data by url.

Run this to ingest the ImageNet data:

```bash
curl -X POST http://localhost:3000/ingest/url -H "Content-Type: application/json" -d '{"url": "https://raw.githubusercontent.com/tzutalin/ImageNet_Utils/refs/heads/master/detection_eval_tools/structure_released.xml"}'
```

## Get Taxonomy by API (optional)

The backend provides an endpoint at `/path?query=<path>` that can be used to get taxonomy 1 level at a time at path.

```bash
curl "http://localhost:3000/path?query=ImageNet%202011%20Fall%20Release"
```

This will return an array of taxonomy elements at the path `ImageNet 2011 Fall Release`.

## Frontend

The frontend app is available at [http://localhost:5173](http://localhost:5173).
This renders a tree of taxonomy, lazily loading children on demand.
