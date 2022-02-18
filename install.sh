#!/bin/bash
# Full Installer
if [[ "$EUID" -ne 0 ]]; then
    echo "[Inst] Please run as root."
    exit 1
fi

echo "[Inst] Start."
npm i taos-setup -g
taos-setup install && taos start
echo "[Inst] Done xD"
exit 0
