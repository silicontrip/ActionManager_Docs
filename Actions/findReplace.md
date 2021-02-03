# Action `findReplace`

*No 4 character code for findReplace*
Find and replace text occurances in text layers.

## Syntax
```
findReplace(Reference null, Object using)
```
## Parameters
| Name | Type | Description
| --- | --- | --- |
`null\|'null'` | `Reference` | The text layers.
`using\|'Usng'` | `Object` | Find replace parameters.

#### `null|'null'`
* Contains a `textLayer|'TxLr' Class` of `Enumerated ordinal|'Ordn' allEnum|'Al  '` and a `property|'Prpr' Class` of `findReplace`

#### `using|'Usng'`
* Contains a `findReplace Object` containing the parameters required for the `findReplace` action.

## Return Value

## XML
```xml 
<?xml version="1.0"?>
<Action>
  <Type>findReplace</Type>
  <Descriptor>
    <Key>null</Key>
    <Reference>
      <Class>property</Class>
      <Property>findReplace</Property>
      <Class>textLayer</Class>
      <Enumerated>
        <Type>ordinal</Type>
        <Value>allEnum</Value>
      </Enumerated>
    </Reference>
    <Key>using</Key>
    <Object>
      <Type>findReplace</Type>
      <Descriptor>
        <Key>find</Key>
        <String>MMM</String>
        <Key>checkAll</Key>
        <Boolean>true</Boolean>
        <Key>forward</Key>
        <Boolean>true</Boolean>
        <Key>caseSensitive</Key>
        <Boolean>false</Boolean>
        <Key>wholeWord</Key>
        <Boolean>false</Boolean>
        <Key>ignoreAccents</Key>
        <Boolean>true</Boolean>
      </Descriptor>
    </Object>
  </Descriptor>
</Action>
```