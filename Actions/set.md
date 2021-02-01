# set

select an area on the current active layer and current document.

## Parameters

- null : Reference of Property type and Channel class.
- to : the area to select.  Can be Rectangle Object, Enumerated Ordinal.None or a Channel class Reference with an Enumation of channel type, to select the bounding box of that channel.

## Example
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
