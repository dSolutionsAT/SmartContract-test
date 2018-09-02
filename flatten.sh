#!/usr/bin/env bash

rm -rf flats/*
./node_modules/.bin/truffle-flattenerchmod
./node_modules/.bin/truffle-flattener contracts/cIT.sol > flats/cIT_flat.sol

./node_modules/.bin/truffle-flattener contracts/cITCrowdsale.sol > flats/cITCrowdsale_flat.sol
