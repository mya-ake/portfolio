FROM denoland/deno:1.36.4

EXPOSE 8000

ARG GIT_REVISION
ARG MICRO_CMS_API_KEY
ARG MICRO_CMS_API_ENDPOINT
ENV DENO_DEPLOYMENT_ID=${GIT_REVISION}
ENV MICRO_CMS_API_KEY=${MICRO_CMS_API_KEY}
ENV MICRO_CMS_API_ENDPOINT=${MICRO_CMS_API_ENDPOINT}

WORKDIR /app

ADD . /app

RUN deno cache main.ts
RUN deno task build

CMD ["run", "--allow-net", "--allow-env", "--allow-read", "--allow-write", "--allow-run",  "main.ts"]
