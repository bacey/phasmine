#!/bin/bash

ps x | grep node | grep -v grep >/dev/null

if [ $? -eq 0 ]; then
    ./phasmine.sh spec/PhasmineSpec.js
    echo Load ./SpecRunner.html into your browser.
else
    echo Start the Express.js server in a different terminal/console
    echo with ./start_server.sh, then re-run this example.
fi

