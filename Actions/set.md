# Action `set|'setd'`

**Set** a property of the application or document or selection region.
## Syntax

```
set(Reference _, Enumerated to)
set(Reference _, Class to)
set(Reference _, Object to)
```

## Parameters

| Name | Type | Description
| --- | --- | --- |
`null\|'null'` | `Reference` | The property to be changed.
`to\|'T   '` | `Object`, `Reference` or `Enumerated` | The value to set the property to.  

#### null|'null'
* To set the selection region use a `Reference` of `Class channel\|'Chnl'` and `Property selection\|'fsel'`
* To set the Application units preferences use a `Reference` of `Class property\|'Prpr'` and `Property unitsPrefs\|'UntP'` with a `Class application\|'capp'` and `Enumerated ordinal\|'Ordn'` with the value `targetEnum\|'Trgt'`

#### to|'T   '
* To select a rectangle use an `Object` of the `rectangle\|Rctn` type.
* To select a layers bounding box use a `Reference` of `Class channel\|'Chnl'` and `Enumerated channel\|'Chnl'` with the value `transparencyEnum\|'Trsp'`.
* To cancel the selection region use an `Enumerated ordinal\|'Ordn'` with the value `none\|'None'`.
* To change the Application Preferences use an `Object` of the `channel\|'Chnl'` type.



## Return Values

The unmodified requested ActionDescriptor is returned back to the caller.

## XML Examples
### Select Rectangle
```xml
<?xml version="1.0"?>
<Action>
  <Type>set</Type>
  <Descriptor>
    <Key>null</Key>
    <Reference>
      <Class>channel</Class>
      <Property>selection</Property>
    </Reference>
    <Key>to</Key>
    <Object>
      <Type>rectangle</Type>
      <Descriptor>
        <Key>top</Key>
        <UnitDouble>
          <Type>pixelsUnit</Type>
          <Value>3268</Value>
        </UnitDouble>
        <Key>left</Key>
        <UnitDouble>
          <Type>pixelsUnit</Type>
          <Value>1328</Value>
        </UnitDouble>
        <Key>bottom</Key>
        <UnitDouble>
          <Type>pixelsUnit</Type>
          <Value>3716</Value>
        </UnitDouble>
        <Key>right</Key>
        <UnitDouble>
          <Type>pixelsUnit</Type>
          <Value>5040</Value>
        </UnitDouble>
      </Descriptor>
    </Object>
  </Descriptor>
</Action>
```
### Select Nothing
```xml
<?xml version="1.0"?>
<Action>
  <Type>set</Type>
  <Descriptor>
    <Key>null</Key>
    <Reference>
      <Class>channel</Class>
      <Property>selection</Property>
    </Reference>
    <Key>to</Key>
    <Enumerated>
      <Type>Ordinal</Type>
      <Value>None</Type>
    </Enumerated>
  </Descriptor>
</Action>
```
### Select Transparency
```xml
<?xml version="1.0"?>
<Action>
  <Type>set</Type>
  <Descriptor>
    <Key>null</Key>
    <Reference>
      <Class>channel</Class>
      <Property>selection</Property>
    </Reference>
    <Key>to</Key>
    <Reference>
      <Class>channel</Class>
      <Enumerated>
        <Type>channel</Type>
      	<Value>transparencyEnum</Value>
      </Enumerated>
    </Reference>
  </Descriptor>
</Action>
```
### Set Measurement Units
```xml
<Action>
<Type>set</Type>
<Descriptor>
<Key>null</Key>
<Reference>
<Class>property</Class>
<Property>unitsPrefs</Property>
</Reference>
<Key>to</Key>
<Object>
<Type>unitsPrefs</Type>
<Descriptor>
<Key>rulerUnits</Key>
<Enumerated>
<Type>rulerUnits</Type>
<Value>rulerPixels</Value>
</Enumerated>
</Descriptor>
</Object>
</Descriptor>
</Action>
```