#!/bin/bash

echo -ne "\033]0;ISM\007"

node index.js .

read -n 1 -s -r -p "Press any key to continue"