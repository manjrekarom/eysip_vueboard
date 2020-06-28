var allDistinctKeys = []
var valueArray = []

function uuidGenerator() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

function getAllDistinctKeys(jsonData)
{
    allDistinctKeys = ['root'];
    
    allDistinctKeys = getAllDistinctKeysRecursive(jsonData, allDistinctKeys, 'root', 'root', []);
    
    let allDistinctKeysTree = [];
    allDistinctKeysTree = obtainTreeArray(allDistinctKeys, allDistinctKeysTree, '', '');

    console.log(allDistinctKeys);
    console.log(allDistinctKeysTree);

    return allDistinctKeysTree;
}

function getAllDistinctKeysRecursive(jsonData, allDistinctKeys, parentsNames, fullPath, keysProcessed) {        

    for (let key in jsonData) {
        
        if(keysProcessed.includes(key)) {
            continue;
        }

        if((typeof(jsonData[key]) == "object" && jsonData[key] != null) || typeof(jsonData[key]) == 'string' || typeof(jsonData[key]) == 'number') {
            keysProcessed.push(key);
        }

        if(typeof(jsonData[key]) == "object")
        {
            if (Array.isArray(jsonData[key]) == true) {
                parentsNames = fullPath;
                allDistinctKeys.push([parentsNames + '>' + key]);
                getAllDistinctKeysRecursive(jsonData[key], allDistinctKeys[allDistinctKeys.length - 1], parentsNames + '>' + key, fullPath + '>' + key, []);
            }
            else {
                if(isNaN(key) == true) {
                    getAllDistinctKeysRecursive(jsonData[key], allDistinctKeys, parentsNames, fullPath + '>' + key, keysProcessed);           
                }else {
                    getAllDistinctKeysRecursive(jsonData[key], allDistinctKeys, parentsNames, fullPath + '>' + key, keysProcessed);
                }
            }
        }

        else if ((typeof(jsonData[key]) == 'string' || typeof(jsonData[key]) == 'number')) {
            allDistinctKeys.push(parentsNames + '>' + key);
        }
    }

    allDistinctKeys = [...new Set(allDistinctKeys)];
    
    for (let i = 0; i < allDistinctKeys.length; i++) {
        
        if(Array.isArray(allDistinctKeys[i]) == true) {
            allDistinctKeys[i] = [...new Set(allDistinctKeys[i])];
        }

    } 

    return allDistinctKeys;
}

function obtainTreeArray(allDistinctKeys, allDistinctKeysTree, parentID) {

    for (let i = 1; i < allDistinctKeys.length; i++) {
        
        if(Array.isArray(allDistinctKeys[i]) == true) {
            
            let temp = allDistinctKeys[i][0];            
            let arrayKey = temp.split(">").pop();

            let obj = {
                'id': temp,
                'label': arrayKey,
                'children': [],
            }
            
            allDistinctKeysTree.push(obj);
            obtainTreeArray(allDistinctKeys[i], obj.children, '')
        }
        else {
            let obj = {
                'id':  parentID + '' + allDistinctKeys[i],
                'label': allDistinctKeys[i].split(">").pop(),
            }

            allDistinctKeysTree.push(obj);
        }
    } 

    return allDistinctKeysTree
}

function retrieveFormData(formObject, formValues) {

    for (let key in formObject) {
        
        if(typeof(formObject[key]) !== 'object') {
            continue;
        }
        else if('initialFields' in formObject[key]){
            let values = formObject[key].initialValue
            
            if(formObject[key].inputType.toLowerCase() === 'number') {
                if(Array.isArray(values)) {
                    for (let i = 0; i < values.length; i++) {
                        values[i] = parseInt(values[i]);
                    }
                }
                else {
                    values = parseInt(values);
                }
            }
            
            formValues[key] = values;
        }
        else {
            if(Object.keys(formObject[key]).includes('dontNestValues')) {
                retrieveFormData(formObject[key], formValues);
            } else {
                formValues[key] = {};
                retrieveFormData(formObject[key], formValues[key]);
            }
        }
    }

    return formValues;
}

function getAllValues(jsonData, keysArray, sortX) {

    var valuesArray = [];    
    
    keysArray.forEach(keys => {

        if(Array.isArray(keys) == false) {
            keys = [keys];
        }
        
        keys.forEach(key => {

            let data = jsonData;
            let isArray = false;

            key = key.split('>');
            key.shift();

            key.forEach(_key => {
                data = data[_key];    
            });

            if(Array.isArray(data)) {
                isArray = true;
            }

            const selectedKey = key.pop();
            
            if (isNaN(selectedKey) == false || isArray == true) {

                let arrayKey = key.pop();

                while (key.length > 0) {
                       
                    data = jsonData;

                    key.forEach(_key => {
                        data = data[_key];    
                    });

                    if (Array.isArray(data)) {

                        let temp = [];

                        if (isArray == true) { 

                            let values = [...extractValue(data, selectedKey)];
                            values.forEach(element => {
                                temp = temp.concat(element)
                            }); 
                            
                        }
                        else {

                            let values = [...extractValue(data, arrayKey)];
                            values.forEach(element => {
                                temp.push(element[selectedKey]);
                            });
                        }
                        
                        valuesArray.push(temp);
                        valueArray = []
                        break;
                    }

                    key.pop();                    
                }
            } 
            else {

                data = jsonData;

                key.forEach(_key => {
                    data = data[_key];    
                });

                let values = [...extractValue(data, selectedKey)];
                valuesArray.push(values);
                valueArray = []
            }                       
        });
    });    
    
    if(sortX == true) { 
        valuesArray = bubbleSort(valuesArray[0], valuesArray.slice(1, valuesArray.length));
    }
    console.log('called');
    return valuesArray;

}

function extractValue(jsonData, key) {    

    for (let _key in jsonData) {
        if(typeof(jsonData[_key]) == "object" && Array.isArray(jsonData[_key]) == false)
        {
            extractValue(jsonData[_key], key);
        }
        
        if ((typeof(jsonData[key]) == 'string' || typeof(jsonData[key]) == 'number') || Array.isArray(jsonData[_key]) == true) {
            if(_key == key) {
                valueArray.push(jsonData[key]);
            }
        }
    }

    return valueArray;

}

function bubbleSort(xValues, yValuesArray) {
    let len = xValues.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len; j++) {
            if (xValues[j] > xValues[j + 1]) {
                let tmp = xValues[j];
                xValues[j] = xValues[j + 1];
                xValues[j + 1] = tmp;

                for (let k = 0; k < yValuesArray.length; k++) {
                    let temp = yValuesArray[k][j];
                    yValuesArray[k][j] = yValuesArray[k][j + 1]
                    yValuesArray[k][j + 1] = temp;
                }
            }
        }
    }
    
    let sortedArr = [];

    sortedArr.push(xValues);

    for (let i = 0; i < yValuesArray.length; i++) {
        sortedArr.push(yValuesArray[i]);
    }

    return sortedArr;
}

function formValidator(formObject) {

    for (let key in formObject) {
        
        if(typeof(formObject[key]) !== 'object') {
            continue;
        }
        else if('initialFields' in formObject[key]){
            
            if('minFields' in formObject[key] == false) {
                formObject[key]['minFields'] = 1;
            }

            if('maxFields' in formObject[key] == false) {
                formObject[key]['maxFields'] = 1;
            }

            if('fieldsType' in formObject[key] == false) {
                formObject[key]['fieldsType'] = 'fixed';
            }

            if('inputType' in formObject[key] == false) {
                formObject[key]['inputType'] = 'text';
            }
            
            if(formObject[key].fieldsType == 'fixed' && 'initialValue' in formObject[key] == false) {
                formObject[key]['initialValue'] = null;
            } 
            else if (formObject[key].fieldsType == 'variable' && 'initialValue' in formObject[key] == false) {
                formObject[key]['initialValue'] = [];
            } 
            else if (formObject[key].fieldsType == 'fixed' && Array.isArray(formObject[key].initialValue) == true) {
                formObject[key]['initialValue'] = null;
            }
            else if(formObject[key].fieldsType == 'variable' && Array.isArray(formObject[key].initialValue) == false) {
                formObject[key]['initialValue'] = [];
            }

            if('placeholder' in formObject[key] == false) {
                formObject[key]['placeholder'] = '';
            }
            else if (formObject[key].fieldsType == 'variable' && Array.isArray(formObject[key].placeholder) == false) {
                formObject[key]['placeholder'] = [formObject[key].placeholder];
            }
            else if(formObject[key].fieldsType == 'fixed' && Array.isArray(formObject[key].placeholder) == true) {
                formObject[key]['placeholder'] = formObject[key].placeholder[0];
            }

            if(formObject[key].initialFields < formObject[key].minFields) {
                formObject[key].initialFields = formObject[key].minFields;
            } 
            else if(formObject[key].initialFields > formObject[key].maxFields) {
                formObject[key].initialFields = formObject[key].maxFields;
            }

        }
        else {
            formValidator(formObject[key]);
        }
        
    }

    return formObject;
            
}

function downloadConfig(jsonData, name, type)
{
    var file = new Blob([jsonData], {type: type});
    var isIE = /*@cc_on!@*/false || !!document.documentMode;
    if (isIE)
    {
        window.navigator.msSaveOrOpenBlob(file, name);
    }
    else
    {
        var a = document.createElement('a');
        a.href = URL.createObjectURL(file);
        a.download = name;
        a.click();
    }
}

export {getAllValues, getAllDistinctKeys, uuidGenerator, retrieveFormData, formValidator, downloadConfig};