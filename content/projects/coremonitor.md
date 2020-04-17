---
title: CoreMonitor
date: 2014-01-05 14:01:00
tags:
    - logitech
    - lcd
    - g19
    - g15
    - keyboard
---

Easily monitor your system's resource usage using our powerful replacement for the default Logitech G15/G19 resource monitor widget.

* **Graphed CPU Usage**

    CoreMonitor keeps track of each of your processor's cores, logging
    their individual load at set intervals. It then generates up to the
    second graphs showing usage over the past few seconds - allowing you
    to keep track of what your CPU is really doing. 

* **View Volume Level**

    Adjusting your system volume can be a pain, especially when you're not
    sure whether it's the current song or your volume level that's causing
    the problem. CoreMonitor displays a handy volume bar whenever you adjust
    your volume, allowing you the get the right volume first time, every time.

* **Tweak Options**

    Everybody likes their information a little different, whether you'd prefer to get
    slower updates but see more historical load information, or want the very latest
    processor load info - CoreMonitor allows you to choose.

* **Notification API**

    CoreMonitor allows applications without their own Logitech G19 integration
    to easily display notifications using either a basic HTTP API, or by sending
    structured XML.

{{< alert info >}}
[Download CoreMonitor](https://cdn.sierrasoftworks.com/coremonitor/CoreMonitorSetup.exe)
{{< /alert >}}

{{< alert >}}
[View on GitHub](https://github.com/SierraSoftworks/coremonitor)
{{< /alert >}}

<!--more-->


### Information Methods
* **/system/version**
    This returns the current CoreMonitor version running on the local system. [TEST](http://localhost:56302/system/version "Requires CoreMonitor to be running on your machine to work")
* **/system/version/show**
    This shows the current CoreMonitor version as a notification on the device's display. [TEST](http://localhost:56302/system/version/show "Requires CoreMonitor to be running on your machine to work")

### Notifications
Notification requests are made to the `/notifications/show` page.

#### HTTP GET Requests
In the case of *HTTP GET* requests, CoreMonitor will expect the following parameters to be present

* **title** - Specifies the title to be displayed on the notification. Should be less than 20 characters long to prevent clipping.  
* **text** - Specifies the text to be displayed on the notification. Should be less than 200 characters long to prevent clipping.  
* **displayperiod** - Specifies the amount of time in milliseconds for which the notification should be displayed. If the value **0** is used, then the notification will remain on the display until the user closes it by pressing the *OK* button.  

##### Example
`/notifications/show**?**title**=Sierra%20Softworks&**text**=This%20is...&**displayperiod**=10000` [TEST](http://localhost:56302/notifications/show?title=Sierra%20Softworks&text=This%20is%20a%20test%20notification%20which%20was%20generated%20by%20our%20website%20to%20demonstrate%20CoreMonitor%27s%20notifications%20API&displayperiod=10000 "Requires CoreMonitor to be running on your machine to work")

This will show a notification for 10 seconds, after which time the notification will disappear. 
If you would like to hide it prematurely, you can press either the *Back* or *OK* button.

#### XML Requests
XML requests are made through *HTTP POST* requests to the same page. There is the additional option of providing a
Base64 encoded image (in either *JPG* or *PNG* format) which will be displayed in a 48x48px square in the notification's
header area. Note that by using an image, you reduce the amount of space within which text may appear.

```xml
<?xml version=\"1.0\" encoding=\"utf-8\" ?>
<Message>
    <type>Notification</type>
    <title>Title</title>
    <text>Text</text>
    <image>Base64 Image</image>
    <displayperiod>1000</displayperiod>
</Message>
<!--EOM-->
```

The `<!--EOM-->` component is used to allow multiple notifications to be pushed through the same socket
very quickly without the risk of malformed XML being received by the client. It is not strictly necessary,
especially on newer versions of CoreMonitor, however it is recommended that you keep it to support legacy versions
which may encounter problems otherwise.

### Responses
CoreMonitor will respond with either *success* or *failed* depending on whether or not the given parameters were valid.
If you attempt to access an unknown path (which would usually result in a 404 error) you will be shown an embedded
webpage which details how to use the API.