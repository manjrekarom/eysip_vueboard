import {formValidator} from '../../js/HelperFunctions';


let tableCustomizationFields = {

    'widgetType': 'plotly',

    'keys': {initialFields: 1, minFields: 1, maxFields: 1, fieldsType: 'fixed', inputType: 'treeSelect', multiple: true, flat: true, selectOptions: [], initialValue: [],placeholder: 'Select Columns'},

    'break1': {'lineBreak': ''},
    
    'tableOptions': {
        'generateSelector': 'Table Options',                

        'columnwidth': {initialFields: 1, minFields: 0, maxFields: 100, fieldsType: 'variable', inputType: 'text', initialValue: [], placeholder: 'Enter coloums width'},

        'header': {
            // 'generateSelector': 'Table Header Options',                
        
            'height': {initialFields: 1, minFields: 0, maxFields: 1, fieldsType:'fixed', inputType: 'text', initialValue: '', placeholder:'Enter header height'},
            'align': {initialFields: 1, minFields: 1, maxFields: 1, fieldsType: 'fixed', inputType: 'select', selectOptions: ['left', 'center', 'right'], initialValue: '', placeholder: 'Select text alignment'},
            'line': {
                // 'generateSelector': 'Trace Line Options',        
                'color': {initialFields: 1, minFields: 0, maxFields: 1, fieldsType: 'fixed', inputType: 'text', initialValue: '', placeholder: 'Enter Border Color'},
                'width': {initialFields: 1, minFields: 0, maxFields: 1, fieldsType: 'fixed', inputType: 'text', initialValue: '', placeholder: 'Enter Border Width'},
            }, 
            'font': {
                // 'generateSelector': '',
                'family': {initialFields: 1, minFields: 0, maxFields: 1, fieldsType:'fixed', inputType: 'text', initialValue: '', placeholder:'Enter font family'},
                'size': {initialFields: 1, minFields: 0, maxFields: 1, fieldsType:'fixed', inputType: 'text', initialValue: 12, placeholder:'Enter font size'},
                'color': {initialFields: 1, minFields: 0, maxFields: 1, fieldsType:'fixed', inputType: 'text', initialValue: 'white', placeholder:'Enter font color'},
            }, 
            'fill': {
                'color': {initialFields: 1, minFields: 0, maxFields: 100, fieldsType: 'variable', inputType: 'text', initialValue: ['rgb(46, 156, 229)'], placeholder: 'Enter Fill Color'},
            }, 
        },
        'cells': {
            // 'generateSelector': 'Table Cell Options',                
  
            'height': {initialFields: 1, minFields: 0, maxFields: 1, fieldsType:'fixed', inputType: 'text', initialValue: '', placeholder:'Enter header height'},
            'align': {initialFields: 1, minFields: 1, maxFields: 1, fieldsType: 'fixed', inputType: 'select', selectOptions: ['left', 'center', 'right'], initialValue: '', placeholder: 'Select text alignment'},
            'line': {
                // 'generateSelector': 'Trace Line Options',        
                'color': {initialFields: 1, minFields: 0, maxFields: 1, fieldsType: 'fixed', inputType: 'text', initialValue: '', placeholder: 'Enter Line Color'},
                'width': {initialFields: 1, minFields: 0, maxFields: 1, fieldsType: 'fixed', inputType: 'text', initialValue: '', placeholder: 'Enter Line Width'},
            }, 
            'font': {
                // 'generateSelector': '',
                'family': {initialFields: 1, minFields: 0, maxFields: 1, fieldsType:'fixed', inputType: 'text', initialValue: '', placeholder:'Enter font family'},
                'size': {initialFields: 1, minFields: 0, maxFields: 1, fieldsType:'fixed', inputType: 'text', initialValue: 12, placeholder:'Enter font size'},
                'color': {initialFields: 1, minFields: 0, maxFields: 1, fieldsType:'fixed', inputType: 'text', initialValue: '', placeholder:'Enter font color'},
            }, 
            'fill': {
                'color': {initialFields: 1, minFields: 0, maxFields: 100, fieldsType: 'variable', inputType: 'text', initialValue: ['white'], placeholder: 'Enter Fill Color'},
            }, 
        },
    },    

    'break2': {'lineBreak': ''},

    'layout': {
        'generateSelector': 'Table Layout Options',

        'widgetOptions': {
            'dontNestValues': '',

            'paper_bgcolor': {initialFields: 1, minFields: 0, maxFields: 1, fieldsType:'fixed', inputType: 'text', initialValue: '', placeholder:'Enter Paper Background'},
            'plot_bgcolor': {initialFields: 1, minFields: 0, maxFields: 1, fieldsType:'fixed', inputType: 'text', initialValue: '', placeholder:'Enter Plot Background'},
            'width': {initialFields: 1, minFields: 0, maxFields: 1, fieldsType:'fixed', inputType: 'hidden', initialValue:undefined, placeholder:''},
            'height': {initialFields: 1, minFields: 0, maxFields: 1, fieldsType:'fixed', inputType: 'hidden', initialValue:undefined, placeholder:''},
        },
        
        'margin': {
            'autoexpand': {initialFields: 1, minFields: 0, maxFields: 1, fieldsType:'fixed', inputType: 'checkbox', initialValue: '', placeholder:'Choose Auto-Expand'},
            't': {initialFields: 1, minFields: 0, maxFields: 1, fieldsType:'fixed', inputType: 'number', initialValue: '', placeholder:'Enter top margin'},
            'b': {initialFields: 1, minFields: 0, maxFields: 1, fieldsType:'fixed', inputType: 'number', initialValue: '', placeholder:'Enter bottom margin'},
            'l': {initialFields: 1, minFields: 0, maxFields: 1, fieldsType:'fixed', inputType: 'number', initialValue: '', placeholder:'Enter left margin'},
            'r': {initialFields: 1, minFields: 0, maxFields: 1, fieldsType:'fixed', inputType: 'number', initialValue: '', placeholder:'Enter right margin'},
            'pad': {initialFields: 1, minFields: 0, maxFields: 1, fieldsType:'fixed', inputType: 'number', initialValue: '', placeholder:'Enter padding'},
        }
    },
    
};

tableCustomizationFields = formValidator(tableCustomizationFields);

export {tableCustomizationFields};