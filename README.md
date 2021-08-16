GT2 Personal Carbon Calculator
==============================

  Features for the revived app.
   
* First buildout of same basic function as in e3fd46357085f9a8efde3cd4b94a5a4f211ee2e4 but with

   More parameters for the trip calc.

   Starter for the domain model.

* Expo Only and Full Native Android/iOS code levels. 

  
   For various purposes, there will be an expo only code level and a full version.
   Mostly so that developers can use the simplest version without Google/Apple dev kits.

   There will be several iterations of the client before
   ...   

* Backend service available as in app purchase

   With typical cloud enhancements such as more context than a single trip, group aggregation, etc.
   The client itself with the basic trip model will remain free.
   
* FOSS as before

   Up to proprietary systems support in my other domains, this will remain fully open source.
   Initially it will be more of a vehicle for my development offerings but the intent is 
   develop a full featured Personal Carbon domain.

   All of the client code will be here, the backend code will be open source in 
   git.meansofproduction.biz accessible as with other sources in my domain space.


2011 Stub App
=============

  Original was just Android and a proof of GPS. It still works on older Android as of 2021-08-16 but 
  will not work with Android 10 due to the app menu button and its backfill the overflow menu 
  button being completely removed. The latter is the three  dots on the nav bar. It was
  removed but was still accessible up to 9 either standardly or by a gesture, If you can't get to this
  control, you can't start a trip so the app won't work.
   
  Currently you need to do 'checkout e3fd46357085f9a8efde3cd4b94a5a4f211ee2e4' to get a working version
  matching what was on play since c. 4709 (after cloning current master).

  As of August 4719 it still loads in Android Studio, and it will be preserved in the repo.
   
