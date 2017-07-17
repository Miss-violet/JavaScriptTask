#!/bin/bash
rm -rf ./dist
rm -rf ./docker/dist
#build
export DOCKER_BUILDER_IMAGE=test_zpx_builder_image
docker build --build-arg REACT_BASEURL=http://inter-devops-1.linesum.com/api -t $DOCKER_BUILDER_IMAGE -f ./Dockerfile.build  .
export DOCKER_BUILDER_RUNNER=test_zpx_builder_image_runner
docker stop $DOCKER_BUILDER_RUNNER && docker rm $DOCKER_BUILDER_RUNNER
docker run --name $DOCKER_BUILDER_RUNNER $DOCKER_BUILDER_IMAGE /bin/bash
docker cp $DOCKER_BUILDER_RUNNER:/src/app/dist ./docker/dist
docker stop $DOCKER_BUILDER_RUNNER && docker rm $DOCKER_BUILDER_RUNNER
#dist
export DOCKER_DIST_IMAGE=test_zpx_dist_image
docker build -t $DOCKER_DIST_IMAGE ./docker

#test
docker run --rm -d -p 38080:80 $DOCKER_DIST_IMAGE
sleep 3
open http://localhost:38080