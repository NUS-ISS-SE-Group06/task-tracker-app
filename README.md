# React.js Development Environment Setup
Prerequisites
Before you begin, ensure you have the following installed on your machine:
npm (Node Package Manager)
React.js relies on Node.js and npm. Download 10.4.0
and install them from https://nodejs.org/. npm (Node Package Manager) comes bundled with Node.js.
Clone Repository
# Getting Started with Create React App

# Clone Repository
git clone https://github.com/NUS-ISS-SE-Group06/task-tracker.git


## Available Scripts
In the project directory, you can run:

### `npm install`
Install Dependencies NPM module


### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

Docker env to run in local:
### to build the image
docker build -t task-tracker-app:latest .
### to run the docker image
docker run -d -p 8000:3000 task-tracker-app:latest
### to check if the container is running
docker ps
### in case to ssh inside the container
docker run --rm -it task-tracker-app:latest sh
### list the images
docker images
### application accessible at
http://localhost:8000/

# Kubernetes Deployment

## Installation of the minikube

brew install minikube

OR 

curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-darwin-arm64

## Start Minikube
minikube start --driver=docker

## Check Status of the minikube
minikube satus

## Get Minikube IP
minikube ip

## Minikube dashboard
minikube dashboard

## To use docker inside minikube
minikube docker-env
eval $(minikube -p minikube docker-env)

## To create namespace for deployment
kubectl apply -f uat-namespace.yaml (UAT)
kubectl apply -f prod-namespace.yaml (PROD)

## To deploy UAT configurations
kubectl apply -f deployment-uat.yaml
kubectl apply -f service-uat.yaml

## To deploy production configurations
kubectl apply -f deployment-prod.yaml
kubectl apply -f service-prod.yaml

## Access services in different namespaces
kubectl get deployments -n uat
kubectl get services -n uat

kubectl get deployments -n prod
kubectl get services -n prod

# To debug in case the url cannot be browsed

## get the pods
kubectl get pods

## check the ip
kubectl exec -it <pod-name> -- curl http://0.0.0.0:3000

## check the service configuration
kubectl describe service task-tracker-app-service

## if you are runnin in kubernetes and want to access the app locally

kubectl port-forward pod/<pod-name> 3000:3000

## app should be accessible at 
http://localhost:3000/


