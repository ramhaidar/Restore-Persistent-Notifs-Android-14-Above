param([Parameter(Mandatory=$true)][string]$Package)
adb shell "cmd appops set --user 0 --uid $Package SYSTEM_EXEMPT_FROM_DISMISSIBLE_NOTIFICATIONS allow"
