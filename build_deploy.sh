#! usr/bin/bash

cd src/files/
python3 get_files.py
cd ../..
npm run build
npm run deploy
