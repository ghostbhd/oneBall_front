#!/bin/bash
cd front-end
npm install -g npm@10
npm install -g create-vite
npm update
npm i
npm run dev -- --host 0.0.0.0
