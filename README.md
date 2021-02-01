# ActionManager_Docs
Documenting the Action Manager executeAction calls.

## What is this?

The Action Manager interface is an alternate interface to Adobe's scripting using ExtendScript. (old version of JavaScript) This interface is mostly undocumented,
the only knowledge about this interface is discovered using a plugin called Scripting Listener.  Even with scripting listener the resulting javascript code
it (let's be honest) horrible.  Here is the Open file call;

```
var idOpn = charIDToTypeID( "Opn " );
    var desc8 = new ActionDescriptor();
    var iddontRecord = stringIDToTypeID( "dontRecord" );
    desc8.putBoolean( iddontRecord, false );
    var idforceNotify = stringIDToTypeID( "forceNotify" );
    desc8.putBoolean( idforceNotify, true );
    var idnull = charIDToTypeID( "null" );
    desc8.putPath( idnull, new File( "/Users/mheath/Documents/20201218-BillboardGFX/NEWS_BILLBOARD_TEMPLATE_FLAT.psd" ) );
    var idDocI = charIDToTypeID( "DocI" );
    desc8.putInteger( idDocI, 219 );
executeAction( idOpn, desc8, DialogModes.NO );
```
This format even makes it difficult to understand what the Open call needs to run correctly.  And also requires understanding of what the 
three Javascript objects are for.

### ActionDescriptors 
Are most similar to a Dictionary object.  They have keys (in TypeID) and are strongly typed, there is a `put` and `get` method
for each type.  Also there are a number of complex objects; `Enumerated`, `Object`, `UnitDouble` and `Reference`

### ActionLists 
Are simply lists or arrays of types and values and behave like normal dynamic lists.

### ActionReferences 
Store types and values, but only 1 value of the same type, to store a second value of the same type add another reference.

This can be quite difficult to visualise how references, descriptors and executeAction call all join together.

At first I attemped to produce a more common API description.

`open ( int DocumentID, path _, Boolean forceNotify, Boolean dontRecord);`

However the parameters can be in any order and they are not all required.   Also it makes it difficult to capture enum types or other complex objects.

I looked into JSON, but the values are strongly typed and JSON doesn't really have a mechanism to specify types.  So I ended up using XML, and based the structure on Apple's plist files.

Using this I was able to write some javascript that serialises a Descriptor object into XML and also produces a descriptor from XML.  A Descriptor is a number of pairs, Keys and Types with Values.

```
<?xml version="1.0"?>
<Action>
  <Type>open</Type>
  <Descriptor>
    <Key>dontRecord</Key>
    <Boolean>false</Boolean>
    <Key>forceNotify</Key>
    <Boolean>true</Boolean>
    <Key>null</Key>
    <Path>~/Documents/20201218-BillboardGFX/hardcoded.png</Path>
    <Key>documentID</Key>
    <Integer>219</Integer>
  </Descriptor>
</Action>
```
This captures all the information required to reproduce the call and also makes it easy to omit parameters and determine if they are required.
