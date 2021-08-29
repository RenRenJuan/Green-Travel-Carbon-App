# GT2 [greentravel.app](https://greentravel.app/doc)
<span style="font-size: 12px">Originally Green Travel Carbon Calculator</span>

## 2.0.0
   
- An Expo version of the same functionality as the original 2011 app but a completed and x-platform app
  that actually reports trip carbon impact accurately.

  The 2.0.n series is a replacement on google and first version on apple and will be maintained
  separate from the subsequent production line which will use the [common mechanism](https://sameboat.live/sb-app) 
  for delivery of my apps from 2.1 forward.

  2.0.7 was feature complete at the end of August 2011. 2.0.8 will the stable baseline of same thing
  with background operation.

## 2.n.m

- Roadmap for regular production Personal Carbon Accounting domain

  - 2.1.0 1st embedded product line release
  - 2.2.0 WatchOS extension on iOS
  - 2.3.0 Maintain trip histories in cloud
  - 2.4.0 Group Aggregation 
  - 2.5.0 Reporting

  A base completely free client with the core trip model will remain free and it's sources will 
  be here.
 
  Feature sets in 2.2 and later will be available to [entitled users](https://eg.meansofproduction.biz/index.php/AKPERSON), with entitlements vended in app.
   

2011 Stub App
=============

  Original was just Android (4) and a proof of GPS. It still works on older Android as of 2021-08-16 but 
  will not work with Android 10 due to the app menu button and its backfill the overflow menu 
  button being completely removed. The latter is the three  dots on the nav bar. It was
  removed but was still accessible up to 9 either standardly or by a gesture, If you can't get to this
  control, you can't start a trip so the app won't work.
   
  Currently you need to do 'checkout e3fd46357085f9a8efde3cd4b94a5a4f211ee2e4' to get a working version
  matching what was on play since c. 4709 (after cloning current master).

  As of August 4719 it still loads in Android Studio, and it will be preserved in the repo.

  Note: going over the sources there are references to a PDF. This refers to the origins of the project.
  An individual had taken on the task of making an application for NRDC Boston and got stuck on the GPS.
  The PDF was what that app was supposed to do. I completed it up doing the basic thing it was supposed
  to do.
   
