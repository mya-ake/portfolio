FROM denoland/deno:2.7.2

EXPOSE 8000

ARG GIT_REVISION
ENV DENO_DEPLOYMENT_ID=${GIT_REVISION}

# Secrets (MICRO_CMS_API_KEY / MICRO_CMS_API_ENDPOINT) are NOT baked into the
# image. They are injected at runtime as Cloud Run service env vars, and are not
# needed for `deno task build`.

WORKDIR /app

COPY . /app

RUN deno cache main.ts
RUN deno task build

# No --allow-write: the local file cache only runs when APP_ENV != "prod"
# (getUseMicroCMSCache), so the production server never writes to disk.
CMD ["serve", "--allow-net", "--allow-env", "--allow-read", "_fresh/server.js"]
