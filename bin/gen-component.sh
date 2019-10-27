#!/bin/sh
if mkdir client/components/$1
then
  touch client/components/$1/index.ts
fi
