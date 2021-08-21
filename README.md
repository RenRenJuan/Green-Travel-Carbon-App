# GT2 [greentravel.app](https://greentravel.app)
<span style="font-size: 12px">Originally Green Travel Carbon Calculator</span>

## 2.0.0
   
- An Expo version of exactly the same functionality as the original 2011 app slightly enhanced
  except it's a completed and x-platform app.

  This first replacement on play and first version on app store using an expo build will be maintained
  but the binaries will be available [here](https://sameboat.live/sb-app) after 2.1 replaces it on the app stores.

## 2.n.m

- Roadmap for regular production Personal Carbon Accounting domain

  - 2.1.0 Regular React Native Android and iOS clients
  - 2.2.0 WatchOS version
  - 2.2.1 Maintain trip histories in cloud
  - 2.3.0 Reporting
  - 2.4.0 Group Aggregation 

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
   
