
function valueXML (type,ref,key)
{
	var xml = "";
	switch (type) {
		case DescValueType.OBJECTTYPE:
			var val = ref.getObjectValue(key);
			var vtype = ref.getObjectType(key);
			var vtypeName = typeIDToStringID(vtype);

			rval = descriptorXML(val);
			xml = xml + "<Object>\n<Type>" + vtypeName + "</Type>\n"
			xml = xml + rval;
			xml = xml + "</Object>\n"

			break;
		case DescValueType.ALIASTYPE:
			var val = ref.getPath(key);
			xml = xml + "<Path>" + val + "</Path>\n";
			break;
		case DescValueType.INTEGERTYPE:
			var val = ref.getInteger(key);
			xml = xml + "<Integer>" + val + "</Integer>\n";
			break;
		case DescValueType.BOOLEANTYPE:
			var val = ref.getBoolean(key);
			xml = xml + "<Boolean>" + val + "</Boolean>\n";
			break;
		case DescValueType.ENUMERATEDTYPE:
				var val = ref.getEnumerationValue(key);
				var vtype = ref.getEnumerationType(key);
				var valName = typeIDToStringID(val);
				var vtypeName = typeIDToStringID(vtype);

				xml = xml + "<Enumerated>\n";
				xml = xml + "<Type>"+vtypeName+"</Type>\n";
				xml = xml + "<Value>"+valName+"</Value>\n</Enumerated>\n";
				
				break;
			case DescValueType.STRINGTYPE:
				var val = ref.getString(key);
				xml = xml + "<String>" + val + "</String>\n";
				break;
			case DescValueType.REFERENCETYPE:
			var val = ref.getReference(key);
				xml = xml + referenceXML(val);
				break;
			case DescValueType.UNITDOUBLE:
				var val = ref.getUnitDoubleValue(key);
				var type = ref.getUnitDoubleType(key);
				var typen = typeIDToStringID(type);
				xml = xml + "<UnitDouble>\n";
				xml = xml + "<Type>" + typen + "</Type>\n";
				xml = xml + "<Value>" + val + "</Value>\n";
				xml = xml + "</UnitDouble>\n";
				break;
			case DescValueType.LISTTYPE:
				var val = ref.getList(key);
				xml = xml + listXML(val);
				break;
			case DescValueType.CLASSTYPE:
				var val = ref.getClass(key);
				var vname = typeIDToStringID(val);
				xml = xml + "<Class>" + vname + "</Class>\n";
				break;
			case DescValueType.DOUBLETYPE:
				var val = ref.getDouble(key);
				xml = xml + "<Double>" + val + "</Double>\n";
				break;
			default:
				alert(type);
				break;
		}
		return xml;
}

function listXML (list)
{
	var xml = "<List>\n";
	for (var ind=0; ind <list.count; ++ind)
	{
		var ltype = list.getType(ind);
		xml += valueXML(ltype,list,ind);
	}
	xml = xml + "</List>\n"
	return xml;
}

function referenceXML (reference)
{

	//alert ("referenceXML: " +reference.typename);  // useless

	var xml = "<Reference>\n";

	var vv = reference.getDesiredClass();
	var vvn = typeIDToStringID(vv);

	xml = xml + "<Class>"+vvn+"</Class>\n";

	try { 
		var etype = reference.getEnumeratedType();
		var eval = reference.getEnumeratedValue();
		var ntype = typeIDToStringID(etype);
		var nval = typeIDToStringID(eval);
		xml = xml + "<Enumerated>\n";
		xml = xml + "<Type>"+ntype+"</Type>\n";
		xml = xml + "<Value>"+nval+"</Value>\n";
		xml = xml + "</Enumerated>\n";

	} catch (e) { ; }
	try {
		var id = reference.getIdentifier();
		xml = xml + "<Identifier>" + id + "</Identifier>\n";
	} catch (e) { ; }
	try {
		var ind = reference.getIndex();
		xml = xml + "<Index>" + ind + "</Index>\n";
	} catch (e) { ; }
//	try {
		var name = reference.getName();
		if (name.length >0) {
			xml = xml + "<Name>" + name + "</Name>\n";
		}
//	} catch (e) { ; }
	try {
		var off = reference.getOffset();
		xml = xml + "<Offset>" + off + "</Offset>\n";
	} catch (e) { ; }
	try {
		var prop = reference.getProperty();
		var propn = typeIDToStringID(prop);
		xml = xml +"<Property>"+propn+"</Property>\n";
	} catch (e) { ; }

//	var ref = reference.getContainer();  // returns a reference object
//	xml = xml + referenceXML(ref);  // will we just infinitely loop..
	// no it appears to crash at the first query


	xml = xml + "</Reference>\n";
	return xml;
}

function descriptorXML (descriptor)
{
	var xml = "<Descriptor>\n";
	var dcount = descriptor.count;
	for (var ind=0; ind < dcount; ++ind)
	{
		var kk = descriptor.getKey(ind);
		var ktype = descriptor.getType(kk);
	//	alert(ktype);
		var kkName = typeIDToStringID(kk);
	//	alert(kkName);
	//	alert(kk);

		xml = xml + "<Key>" + kkName + "</Key>\n";
		xml = xml + valueXML(ktype,descriptor,kk);
	}
	xml = xml + "</Descriptor>\n";
	return xml;
}

function actionXML (id, descriptor,dummy)
{
	var xml = "<Action>\n";
	xml += "<Type>" + typeIDToStringID(id) + "</Type>\n";
	xml += descriptorXML(descriptor);
	xml += "</Action>\n";

	return xml;
}

function saveXMLAction (fn, id, desc,dummy)
{
	f=new File(fn);
	var r = f.open("w");
	var xx = actionXML(id,desc,dummy);
	r= f.write(xx);
	f.close();
}

function saveXMLDescriptor (fn,desc)
{
	f=new File(fn);
	var r = f.open("w");
	var xx = descriptorXML(desc);
	r= f.write(xx);
	f.close();
}

function XMLDescriptor (xml)
{
	var dd = new ActionDescriptor();
	for (i=0; i < xml.length(); i=i+2)
	{
		var key = xml[i].text();
		var val = xml[i+1].text();
		var vtype = xml[i+1].name();

		var strType = "" + vtype;
	//	alert("."+vtype+".");

		var keyID = stringIDToTypeID(key);

		switch (strType)
		{
			case "Boolean":
				dd.putBoolean(keyID,val=="true");
				break;
			case "Path":
				dd.putPath(keyID,new File(val));
				break;
			case "Integer":
				dd.putInteger(keyID,parseInt(val));
				break;
			default:
				alert("type: " + strType + " not implemented");
			// Will be adding more 
		}

	}
	return dd;
}

function executeXML (s)
{
	var exe = s.xpath('/Type');
	var exeID = stringIDToTypeID(exe);
	var tdesc = s.xpath('/Descriptor/*');

	var desc = makeDescriptor(tdesc);

	//var xx = descriptorXML(desc);
	//alert (xx);

	executeAction(exeID,desc,DialogModes.NO);

}

