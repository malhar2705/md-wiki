FROM node:14 AS ui-build

WORKDIR /usr/src/app/
COPY nginx/ ./
COPY readme-backend.txt ./
COPY readme-frontend.txt ./
COPY readme-docker.txt ./
COPY my-app/ ./my-app/
COPY my-app/src/ ./my-app/src/
COPY my-app/public/ ./my-app/public/

RUN  cd my-app && npm install && npm run build 

FROM node:14 AS server-build

WORKDIR /root/
COPY --from=ui-build /usr/src/app/my-app/build ./my-app/build


COPY api/ ./api/
COPY api/articles/ ./api/articles
COPY api/test/ ./api/test
COPY api/server.js ./api/
COPY api/validation.js ./api/
COPY api/.env ./api/
RUN cd api && npm install

EXPOSE 9090

CMD ["node","./api/server.js"]