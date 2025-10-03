$pkgs = adb shell pm list packages --user 0 -3
$pkgs | ForEach-Object {
  $p = ($_ -split ':')[1]
  if ($p) { adb shell "cmd appops set --user 0 --uid $p SYSTEM_EXEMPT_FROM_DISMISSIBLE_NOTIFICATIONS default" }
}
