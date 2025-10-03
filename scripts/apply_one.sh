#!/usr/bin/env bash
set -euo pipefail
pkg="$1"
adb shell cmd appops set --user 0 --uid "$pkg" SYSTEM_EXEMPT_FROM_DISMISSIBLE_NOTIFICATIONS allow
