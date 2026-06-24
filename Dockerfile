# Pinned by digest for reproducible, tamper-evident builds. The :2.8.3 tag is kept
# for readability; the digest is the multi-arch index for that tag. When bumping the
# version, update BOTH the tag and the digest (e.g. `docker buildx imagetools inspect
# denoland/deno:<version>`, or the registry manifest digest).
FROM denoland/deno:2.8.3@sha256:438618d8c0678c3154fc77ad6edad61f38cbc42803a181e7908d3e2c9e645022

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
