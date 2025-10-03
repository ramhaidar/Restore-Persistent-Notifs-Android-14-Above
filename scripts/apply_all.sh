#!/usr/bin/env bash
set -euo pipefail
adb shell 'for p in $(pm list packages --user 0 -3 | cut -d: -f2); do cmd appops set --user 0 --uid "$p" SYSTEM_EXEMPT_FROM_DISMISSIBLE_NOTIFICATIONS allow; done'
