#!/bin/sh
if mkdir app/components/$1
then
  touch app/components/$1/index.ts
fi
