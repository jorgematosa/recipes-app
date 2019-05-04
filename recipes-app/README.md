# How to start the app
ng serve

# How to build the api to deploy in kubernetes
docker build --target=prod -f ./Dockerfile -t="eu.gcr.io/ustwo-tech-ex/ustwo-app:v1" .
