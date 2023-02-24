ARG NODE_VERSION=stable

FROM gcr.io/connectedcars-staging/node-builder.master:$NODE_VERSION as builder

ARG COMMIT_SHA=master

WORKDIR /app

USER builder

# Copy application code.
COPY --chown=builder:builder . /app

RUN npm i

RUN npm run ci-tsc

RUN npm run ci-eslint

RUN npm run ci-audit
