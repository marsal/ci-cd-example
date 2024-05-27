#!/bin/bash

CONTAINER=ci-cd

for i in `seq 1 60`; do
    # check if status of container is running
    if [ "$(docker inspect -f '{{.State.Running}}' $CONTAINER)" = "true" ]; then
        # if it's running exit 0 
        echo "Container $CONTAINER is UP."
        exit 0
    else
        # if not, sleep 1 and retry
        sleep 1
        echo "Retrying..."
    fi
done

# if after 60 sec it's down, exit 1
echo "Container $CONTAINER is DOWN."
exit 1