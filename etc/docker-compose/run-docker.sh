#!/bin/bash

if [[ ! -d certs ]]
then
    mkdir certs
    cd certs/
    if [[ ! -f localhost.pfx ]]
    then
        dotnet dev-certs https -v -ep localhost.pfx -p 4fe48eff-e7a0-4c70-9667-22528bca0896 -t
    fi
    cd ../
fi

docker-compose up -d
