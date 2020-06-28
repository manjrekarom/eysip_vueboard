let switchCustomizationFields = {

    'widgetType': 'switch',

    'url': {initialFields: 1, minFields: 1, maxFields: 1, fieldsType: 'fixed', inputType: 'text', selectOptions: '', initialValue: '',placeholder: 'Enter URL'},

    'onStatusMsg': {initialFields: 1, minFields: 1, maxFields: 1, fieldsType: 'fixed', inputType: 'text', selectOptions: '', initialValue: 'true',placeholder: 'Enter on status message'},
    'offStatusMsg': {initialFields: 1, minFields: 1, maxFields: 1, fieldsType: 'fixed', inputType: 'text', selectOptions: '', initialValue: 'false',placeholder: 'Enter off status message'},
    
    'layout': {

        'widgetOptions': {
            'width': {initialFields: 1, minFields: 0, maxFields: 1, fieldsType:'fixed', inputType: 'hidden', initialValue:undefined, placeholder:''},
            'height': {initialFields: 1, minFields: 0, maxFields: 1, fieldsType:'fixed', inputType: 'hidden', initialValue:undefined, placeholder:''},
        }
    }
};

export {switchCustomizationFields};