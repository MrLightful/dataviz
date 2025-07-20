# base stage to have pnpm installed
FROM node:22-alpine AS base
RUN npm i -g pnpm

# development stage
FROM base AS development
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
COPY package.json pnpm-lock.yaml ./
COPY drizzle.config.ts ./
COPY drizzle ./drizzle/
RUN pnpm install
COPY . .
RUN pnpm build

# production stage
FROM base AS production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
COPY package.json pnpm-lock.yaml ./
COPY drizzle.config.ts ./
COPY drizzle ./drizzle/
RUN pnpm install
COPY --from=development /usr/src/app/dist ./dist

CMD ["/bin/sh", "-c", "ls -la ./drizzle/meta/ && pnpm db:migrate && node dist/main"]