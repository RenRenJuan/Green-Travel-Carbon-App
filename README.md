[greentravel.app](https://greentravel.app)
==============================

  Originally Green Travel Carbon Calculator
   
- Starts with Expo version  same functionilty as in e3fd46357085f9a8efde3cd4b94a5a4f211ee2e4 
  except completed and x-platform app.

- Expo Only and Native Android/iOS code levels. 

   Expo only version (in Ejectable) will be maintained as starter for the domain model.
   Mostly so that developers can use the simplest version without Google/Apple dev kits.

   The expo client will remain standalone, not support backend function and other enhancements.

>     Note: the initial expo app on App Store/Play will be replaced by the full react native version
>           and binaries for the current expo client will be downloadable from greentravel.app .

   There will be several iterations of it before
   ...   

- Native clients with cloud service available as in app purchase

  - more context than a single trip, group aggregation, etc.
  - developer support via the common mechanism for same in my domains
  
  Continuity with ejected expo client will be maintained at the domain model level but there
  is no commitment to expo in the production client which is what will be on play and app store
  replacing the expo client as GT2 matures.
   
- FOSS as before

   Up to proprietary systems support in my other domains, this will remain fully open source.
   Initially it will be more of a vehicle for my development offerings but the intent is 
   develop a full featured Personal Carbon domain.

   All of the client code will be here, the backend code will be open source in 
   git.meansofproduction.biz accessible as with other sources in my domain space.


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
  to do so.
   
