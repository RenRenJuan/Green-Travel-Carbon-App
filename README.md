# GT2 [greentravel.app](https://greentravel.app/doc)
<span style="font-size: 12px">Originally Green Travel Carbon Calculator</span>

## 2.0.0
   
- An Expo version of the same functionality as the original 2011 app but a completed [x-platform](https://apps.apple.com/ao/app/gt2-green-travel-carbon-app/id1583117880) app
  that actually reports trip distance and time and thus carbon impact accurately.

  The 2.0.n series is a replacement on google and first version on apple and will be maintained
  separate from the subsequent production line which will use the [common mechanism](https://devops1.sameboat.network/sb-app) 
  for delivery of my apps from 2.1 forward.

  2.0.7 was feature complete at the end of August 2021.

  2.0.8 the stable baseline of same thing but with background operation, with subsequent change only for stack maintenance was complete in Sept 2023.

## 1.n.m (semantic reset)

PCA which is sold as Green Travel 2.n.m, n > 0 is a maintained instance of the [PMTA](https://sameboat.network/personaleco) generic base.

- Roadmap for regular production Personal Carbon Accounting domain, PCA 1

  - 1.1.0 [Product baseline](https://devops1.sameboat.network/sb-app)
  - 1.2.0 Wearable extension 
  - 1.3.0 Maintain trip histories in cloud
  - 1.4.0 Group Aggregation 
  - 1.5.0 Reporting

  The product line version, unlike the standalone 2.0.n series will be based on the Domain Space App and so the semantic numbering resets.
  It will also be free but with feature sets at higher levels of [entitlement](https://eg.meansofproduction.biz/eg/index.php/AKPERSON), vended in-app.

  The product line source app will greatly expand upon the cause for being of the 2011 app which was to demonstrate working GPS (see below).
  Motion/travel tracking remains the core function but there will be additional reusable infra for a number of purposes, in particular
  wearable extensions. PCA 1 is an application of this new code which is available to entitled users of git.meansofproduction.biz.
   

2011 Stub App
=============

  Original was Android (4) and a proof of GPS. It still works on older Android as of 2021-08-16 but 
  will not work with Android 10 due to the app menu button and its backfill the overflow menu 
  button being completely removed. The latter is the three  dots on the nav bar. It was
  removed but was still accessible up to 9 either standardly or by a gesture, If you can't get to this
  control, you can't start a trip so the app won't work.
   
  Currently you need to do 'checkout e3fd46357085f9a8efde3cd4b94a5a4f211ee2e4' to get a working version
  matching what was on play since c. 4709 (after cloning current master).

  As of August 4719 it still loads in Android Studio, and it will be preserved in the repo.

  Note: going over the sources there are references to a PDF. This refers to the origins of the project.
  An individual had taken on the task of making an application for NRDC Boston and got stuck on the GPS.
  The PDF was what that app was supposed to do. I completed it up to doing the basic thing it was supposed
  to do.
   
