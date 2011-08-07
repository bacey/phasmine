#!/bin/bash

if [ -z "$1" ]; then
    cat >&2 <<EOM
Usage: phasmine.sh [reporter] [SPECFILE]...

Reporter is one of:
    -qcr     QasmineConsoleReporter (outputs to the console)
    -tcr     TrivialConsoleReporter (outputs to ./SpecRunner.html) (default)
EOM
    exit 1
fi


CMD="phantomjs phasmine.js"
SPR1="lib/SpecRunner.html.1"
SPR2="/tmp/SpecRunner.html.2"
SPR3="lib/SpecRunner.html.3"
SPR="SpecRunner.html"

for i in $@; do
    if [ "$i" = "-qcr" ]; then
        MODE="qcr"
    fi
done

if [ "$MODE" = "qcr" ]; then
    $CMD $@
else
    $CMD $@ > $SPR2
    cat $SPR1 $SPR2 $SPR3 > $SPR
fi
 