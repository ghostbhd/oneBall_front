#!/bin/bash
cd back-end
npm update
npm i -f
npm i -g @nestjs/cli
npm run start:dev
