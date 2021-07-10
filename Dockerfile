FROM denoland/deno:1.11.2

WORKDIR /web.ts

USER deno

# cache dependencies
COPY deps.ts .
RUN deno cache deps.ts

# these steps will be re-run upon each file change in your working directory:
COPY deps.ts .
ADD . .

# compile the main app so that it doesn't need to be compiled each startup/entry.
RUN deno cache tests/web.test.ts

# ru
CMD ["run", "--allow-net", "tests/web.test.ts"]