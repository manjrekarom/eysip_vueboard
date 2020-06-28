let mapCustomizationFields = {

    'widgetType': 'map',
    
    // 'center': {initialFields: 1, minFields: 1, maxFields: 1, fieldsType: 'fixed', inputType: 'text', initialValue: '10, 10',placeholder: 'Enter map center co-ordinates'},
    // 'zoom': {initialFields: 1, minFields: 1, maxFields: 1, fieldsType: 'fixed', inputType: 'text', initialValue: '7',placeholder: 'Enter zoom amount'},
    // 'map-type-id': {initialFields: 1, minFields: 1, maxFields: 1, fieldsType: 'fixed', inputType: 'text', initialValue: '',placeholder: 'Enter map type'},
    'keys': {initialFields: 2, minFields: 2, maxFields: 2, fieldsType: 'variable', inputType: 'treeSelect', multiple: [false, false], flat: [false, false], selectOptions: [], initialValue: [],placeholder: ['Select X Key', 'Select Y Keys']},

    'clickable': {initialFields: 1, minFields: 1, maxFields: 10, fieldsType: 'variable', inputType: 'checkbox', initialValue: [], placeholder: ["Select clickable"]},
    'offStatusMsg': {initialFields: 1, minFields: 1, maxFields: 10, fieldsType: 'variable', inputType: 'checkbox', initialValue: [], placeholder: ["Select draggabe"]},
    
    'layout': {

        'widgetOptions': {
            'dontNestValues': '',

            'width': {initialFields: 1, minFields: 0, maxFields: 1, fieldsType:'fixed', inputType: 'hidden', initialValue:undefined, placeholder:''},
            'height': {initialFields: 1, minFields: 0, maxFields: 1, fieldsType:'fixed', inputType: 'hidden', initialValue:undefined, placeholder:''},
        }
    }
};

export {mapCustomizationFields};