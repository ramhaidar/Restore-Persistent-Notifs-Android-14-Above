# Android 14/15: Restore non-dismissible "persistent" notifications with ADB

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Visit%20Site-blue?style=for-the-badge)](https://ramhaidar.github.io/Restore-Persistent-Notifs-Android-14-Above/)

Android 14 made ongoing notifications swipe-dismissible. This workaround restores pre-Android-14 behavior **per app** by granting an app-op. Works on user 0 only.

## Requirements
- Android 14 or 15
- USB debugging enabled
- `adb` available in PATH

### Download Android Platform Tools (includes ADB)
- [Windows](https://dl.google.com/android/repository/platform-tools-latest-windows.zip)
- [macOS](https://dl.google.com/android/repository/platform-tools-latest-darwin.zip)
- [Linux](https://dl.google.com/android/repository/platform-tools-latest-linux.zip)

*These are official downloads from [Android Developer Platform Tools](https://developer.android.com/tools/releases/platform-tools).*

## One-liner: all third-party apps (user 0)

**macOS/Linux**
```bash
adb shell 'for p in $(pm list packages --user 0 -3 | cut -d: -f2); do cmd appops set --user 0 --uid "$p" SYSTEM_EXEMPT_FROM_DISMISSIBLE_NOTIFICATIONS allow; done'
```

**Windows PowerShell**
```powershell
adb shell pm list packages --user 0 -3 | % {
  $pkg = ($_ -split ':')[1]
  if ($pkg) { adb shell "cmd appops set --user 0 --uid $pkg SYSTEM_EXEMPT_FROM_DISMISSIBLE_NOTIFICATIONS allow" }
}
```

## Single package

```bash
adb shell cmd appops set --user 0 --uid com.example.app SYSTEM_EXEMPT_FROM_DISMISSIBLE_NOTIFICATIONS allow
```

## Verify

```bash
adb shell cmd appops get --user 0 --uid com.example.app | grep DISMISSIBLE
```

## Revert

**All third-party apps**
```bash
adb shell 'for p in $(pm list packages --user 0 -3 | cut -d: -f2); do cmd appops set --user 0 --uid "$p" SYSTEM_EXEMPT_FROM_DISMISSIBLE_NOTIFICATIONS default; done'
```

**Single package**
```bash
adb shell cmd appops set --user 0 --uid com.example.app SYSTEM_EXEMPT_FROM_DISMISSIBLE_NOTIFICATIONS default
```

## Notes

* Use `--user 0`. Work profiles or secondary users will throw `SecurityException`.
* Only apps that post an ongoing notification benefit.
* OEMs may differ. Test your device/ROM.
* Uninstall/reinstall may require re-applying the app-op.

## References

* Android 14 behavior change: ongoing notifications are user-dismissible. ([Android Developers][1])
* Community confirmations of the `SYSTEM_EXEMPT_FROM_DISMISSIBLE_NOTIFICATIONS` app-op on Android 14/15. ([AlekSmola][2])

[1]: https://developer.android.com/about/versions/14/behavior-changes-all?utm_source=chatgpt.com "Behavior changes: all apps - Android Developers"
[2]: https://aleksmola.github.io/2025/07/01/bring-back-pernament-notifications-android-14-15/?utm_source=chatgpt.com "Bring-Back-Pernament-Notifications-Android-14-15 | AlekSmola"
