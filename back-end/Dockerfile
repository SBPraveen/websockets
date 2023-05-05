FROM public.ecr.aws/docker/library/node:lts-buster-slim

COPY . .

RUN npm install --quiet --production

RUN npm run build

EXPOSE 8080 8081

ENTRYPOINT ["npm", "start"]