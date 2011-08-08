#!/bin/bash

if [ -z "$1" ]; then
    cat >&2 <<EOM
Usage: phasmine.sh [reporter] [SPECFILE]...

Reporter is one of:
    -cr      ConsoleReporter (outputs to the console) (default)
    -tr      TrivialReporter (outputs to ./SpecRunner.html) 
    -qr      QasmineReporter (outputs to the console)
EOM
    exit 1
fi


CMD="phantomjs phasmine.js"
SPR1="lib/SpecRunner.html.1"
SPR2="/tmp/SpecRunner.html.2"
SPR3="lib/SpecRunner.html.3"
SPR="SpecRunner.html"

for i in $@; do
    if [ "$i" = "-tr" ]; then
        MODE="TrivialReporter"
    fi
done

if [ "$MODE" = "TrivialReporter" ]; then
    $CMD $@ > $SPR2
    cat $SPR1 $SPR2 $SPR3 > $SPR
else
    $CMD $@
fi
 