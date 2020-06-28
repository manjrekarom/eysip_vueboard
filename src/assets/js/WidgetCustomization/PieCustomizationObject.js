import {formValidator} from '../../js/HelperFunctions';


let pieCustomizationFields = {

    'widgetType': 'plotly',

    'keys': {initialFields: 2, minFields: 2, maxFields: 2, fieldsType: 'variable', inputType: 'treeSelect', multiple: [false, true], flat: [true, true], selectOptions: [], initialValue: [],placeholder: ['Select X Key', 'Select Y Keys']},

    'break1': {'lineBreak': ''},

    'pieOptions': {
        // 'generateSelector': 'Pie Options',        
        'name': {initialFields: 1, minFields: 0, maxFields: 1, fieldsType: 'fixed', inputType: 'text', initialValue: '', placeholder: 'Enter pie name'},
        'hole': {initialFields: 1, minFields: 0, maxFields: 1, fieldsType: 'fixed', inputType: 'text', initialValue: '', placeholder: 'Enter hole size'},
        'marker': {
            'colors': {initialFields: 1, minFields: 1, maxFields: 1, fieldsType: 'fixed', inputType: 'text', initialValue: '', placeholder: 'Enter pie section Colors'},
        },
        'hoverinfo': {initialFields: 1, minFields: 1, maxFields: 1, fieldsType: 'fixed', inputType: 'select', 
            selectOptions: ['label', 'text', 'value', 'percent', 'name', 'label+text','label+text+value', 'label+text+value+percent', 'label+text+value+percent+name', 'all', 'none'], 
            initialValue: '', placeholder: 'Select Hoverinfo'},
        'textinfo': {initialFields: 1, minFields: 1, maxFields: 1, fieldsType: 'fixed', inputType: 'select', 
            selectOptions: ['label', 'text', 'value', 'percent', 'name', 'label+text','label+text+value', 'label+text+value+percent', 'label+text+value+percent+name', 'all', 'none'], 
            initialValue: '', placeholder: 'Select Textinfo'},
        'textposition': {initialFields: 1, minFields: 1, maxFields: 1, fieldsType: 'fixed', inputType: 'select', selectOptions: ['inside', 'outside', 'auto', 'none'], initialValue: '', placeholder: 'Select textposition'},
    },

    'break2': {'lineBreak': ''},

    'layout': {
        'generateSelector': 'Widget Layout Options',

        'widgetOptions': {
            'dontNestValues': '',

            'showlegend': {initialFields: 1, minFields: 0, maxFields: 1, fieldsType:'fixed', inputType: 'checkbox', initialValue: true, placeholder:'Choose showlegend'},
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

pieCustomizationFields = formValidator(pieCustomizationFields);

export {pieCustomizationFields};