# Action `set|'setd'`

**Set** the selection area on the current active document and layer.

## Syntax

```
set(Reference _, Enumerated to)
set(Reference _, Class to)
set(Reference _, Object to)
```

## Parameters

| Name | Type | Description
| --- | --- | --- |
`null\|'null'` | `Reference channel\|'Chnl'` | A reference of type `channel` containing the selection `Property`.
`to\|'T   '` | `Object Rectangle\|'Rctn'` | The rectangular area to select.  
|  | `Enumerated Ordinal\|'Ordn'` | Use `none\|'None'` to remove the current selection.
|  | `Reference channel\|'Chnl'` | A `Reference` To select the boundingbox of the target layer.

## Return Values

The unmodified requested ActionDescriptor.

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
