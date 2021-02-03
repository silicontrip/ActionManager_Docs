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
Stores a single type and optional value, to store a second value and type add another reference.

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

## Detailed description of the XML 
The `Action` tag is used to specify that this XML is used to describe an action, the first child is `Type` which is the name of the Action, this is the first
parameter of the `executeAction(` call. The next child is the `Descriptor` If an action call requires parameters, they will always be stored in a descriptor.
The descriptor is made of key value pairs, this needs to be order preserving, as a value immediately follows its key.  There are a number of primative types, which require only 1 value
such as `Boolean`, `Class`, `Data`, `Double`, `Integer`, `LargeInteger`, `Path` and `String` and only require a single call to `descriptor.putTYPE(key,value)`  More complex objects are
`Enumerated` has both an Enumerated type, and value. `List` requires an ActionList to be created first. `Object` requires another ActionDescriptor to be created. 
`Reference` requires an ActionReference.  `UnitDouble` requires a unitType ID and a value.

As I encounter more calls and objects I will endevour to document them here.

## Actions

Contain Execute Action calls, each begin with the `<Action>` tag.

## Types

Contain Object Types and begin with the `<Descriptor>` tag.  Some types also have the requesting Reference that was passed to `executeActionGet(`
