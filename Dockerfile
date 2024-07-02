FROM node:20-alpine

ARG PB_VERSION=0.22.14

RUN apk add --no-cache \
    unzip \
    ca-certificates \
    # this is needed only if you want to use scp to copy later your pb_data locally
    openssh

# download and unzip PocketBase
ADD https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip /tmp/pb.zip
RUN unzip /tmp/pb.zip -d /pb/

# copy the local pb_migrations dir into the container
COPY ./pocketbase/pb_migrations /pb/pb_migrations

# copy the local pb_hooks dir into the container
COPY ./pocketbase/pb_hooks /pb/pb_hooks

# Build the frontend

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# The actual app code
COPY . .
RUN \
  if [ -f yarn.lock ]; then yarn run build --outDir /pb/pb_public; \
  elif [ -f package-lock.json ]; then npm run build --outDir /pb/pb_public; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build --outDir /pb/pb_public; \
  else echo "Lockfile not found." && exit 1; \
  fi

EXPOSE 8080

# start PocketBase
CMD ["/pb/pocketbase", "serve", "--http=0.0.0.0:8080"]
