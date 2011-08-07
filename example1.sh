#!/bin/bash

./phasmine.sh spec/jasmine-example/spec/SpecHelper.js \
              spec/jasmine-example/spec/PlayerSpec.js \
              spec/jasmine-example/src/Player.js \
              spec/jasmine-example/src/Song.js

echo Load ./SpecRunner.html into your browser.
