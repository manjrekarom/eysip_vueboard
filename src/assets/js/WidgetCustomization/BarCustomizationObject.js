import {formValidator} from '../../js/HelperFunctions';


let barCustomizationFields = {

    'widgetType': 'plotly',

    'keys': {initialFields: 2, minFields: 2, maxFields: 2, fieldsType: 'variable', inputType: 'treeSelect', multiple: [false, true], flat: [true, true], selectOptions: [], initialValue: [],placeholder: ['Select X Key', 'Select Y Keys']},

    'break1': {'lineBreak': ''},

    'trace': {
        'generateSelector': 'Bar Options',        
        'name': {initialFields: 1, minFields: 0, maxFields: 15, fieldsType: 'variable', inputType: 'text', initialValue: [], placeholder: 'Enter Bar name'},
        'marker': {
            // 'generateSelector': 'Trace Marker Options',        
            'color': {initialFields: 1, minFields: 0, maxFields: 15, fieldsType: 'variable', inputType: 'text', initialValue: [], placeholder: 'Enter Bar Color'},
        },
        // 'width': {initialFields: 1, minFields: 0, maxFields: 15, fieldsType: 'variable', inputType: 'text', initialValue: [], placeholder: 'Enter Marker Size'},
        'text': {initialFields: 1, minFields: 0, maxFields: 15, fieldsType: 'variable', inputType: 'text', initialValue: [], placeholder: 'Enter Texts'},
    },

    'break2': {'lineBreak': ''},

    // 'labels': {initialFields: 1, minFields: 0, maxFields: 15, fieldsType: 'variable', inputType: 'text', initialValue: [], placeholder: 'Enter Label'},

    // 'break3': {'lineBreak': ''},

    'layout': {
        'generateSelector': 'Widget Layout Options',

        'widgetOptions': {
            'dontNestValues': '',

            'showlegend': {initialFields: 1, minFields: 0, maxFields: 1, fieldsType:'fixed', inputType: 'checkbox', initialValue: true, placeholder:'Choose showlegend'},
            'barmode': {initialFields: 1, minFields: 0, maxFields: 15, fieldsType: 'fixed', inputType: 'select', selectOptions: ['group', 'stack', 'relative', 'overlay'], initialValue: '', placeholder: 'Enter Bar Mode'},
            'bargap': {initialFields: 1, minFields: 0, maxFields: 1, fieldsType:'fixed', inputType: 'text', initialValue: '', placeholder:'Enter bar gap'},
            'paper_bgcolor': {initialFields: 1, minFields: 0, maxFields: 1, fieldsType:'fixed', inputType: 'text', initialValue: '', placeholder:'Enter Paper Background'},
            'plot_bgcolor': {initialFields: 1, minFields: 0, maxFields: 1, fieldsType:'fixed', inputType: 'text', initialValue: '', placeholder:'Enter Plot Background'},
            'width': {initialFields: 1, minFields: 0, maxFields: 1, fieldsType:'fixed', inputType: 'hidden', initialValue:undefined, placeholder:''},
            'height': {initialFields: 1, minFields: 0, maxFields: 1, fieldsType:'fixed', inputType: 'hidden', initialValue:undefined, placeholder:''},
        },
        
        'xaxis': {

            'title': {initialFields: 1, minFields: 0, maxFields: 1, fieldsType:'fixed', inputType: 'text', initialValue: '', placeholder:'Enter title'},
            'titlefont': {
                'color': {initialFields: 1, minFields: 0, maxFields: 1, fieldsType:'fixed', inputType: 'text', initialValue: '', placeholder:'Enter title font color'},
                'size': {initialFields: 1, minFields: 0, maxFields: 1, fieldsType:'fixed', inputType: 'text', initialValue: '', placeholder:'Enter title font size'},
            },
            'showline': {initialFields: 1, minFields: 0, maxFields: 1, fieldsType:'fixed', inputType: 'checkbox', initialValue: true, placeholder:'Choose showline'},
            'showgrid': {initialFields: 1, minFields: 0, maxFields: 1, fieldsType:'fixed', inputType: 'checkbox', initialValue: true, placeholder:'Choose showgrid'},
            'gridwidth': {initialFields: 1, minFields: 0, maxFields: 1, fieldsType:'fixed', inputType: 'text', initialValue: '', placeholder:'Enter gridwidth'},
            'showticklabels': {initialFields: 1, minFields: 0, maxFields: 1, fieldsType:'fixed', inputType: 'checkbox', initialValue: true, placeholder:'Choose ticklable'},
            'linecolor':  {initialFields: 1, minFields: 0, maxFields: 1, fieldsType:'fixed', inputType: 'text', initialValue: '', placeholder:'Enter linecolor'},
            'linewidth': {initialFields: 1, minFields: 0, maxFields: 1, fieldsType:'fixed', inputType: 'text', initialValue: '', placeholder:'Enter linewidth'},
            'autotick': {initialFields: 1, minFields: 0, maxFields: 1, fieldsType:'fixed', inputType: 'checkbox', initialValue: true, placeholder:'Choose autotick'},
            'ticks': {initialFields: 1, minFields: 0, maxFields: 1, fieldsType:'fixed', inputType: 'select', selectOptions: ['', 'outside', 'inside'], initialValue: '', placeholder:'Choose ticks'},
            'tickcolor': {initialFields: 1, minFields: 0, maxFields: 1, fieldsType:'fixed', inputType: 'text', initialValue: '', placeholder:'Enter tickcolor'},
            'tickwidth': {initialFields: 1, minFields: 0, maxFields: 1, fieldsType:'fixed', inputType: 'text', initialValue: 2, placeholder:'Enter tickwidth'},
            'ticklen': {initialFields: 1, minFields: 0, maxFields: 1, fieldsType:'fixed', inputType: 'text', initialValue: 5, placeholder:'Enter ticklen'},
            'tickangle': {initialFields: 1, minFields: 0, maxFields: 1, fieldsType:'fixed', inputType: 'text', initialValue: undefined, placeholder:'Enter tick angle'},
            'tickfont': {
                // 'generateSelector': '',
                'family': {initialFields: 1, minFields: 0, maxFields: 1, fieldsType:'fixed', inputType: 'text', initialValue: '', placeholder:'Enter font family'},
                'size': {initialFields: 1, minFields: 0, maxFields: 1, fieldsType:'fixed', inputType: 'text', initialValue: 12, placeholder:'Enter font size'},
                'color': {initialFields: 1, minFields: 0, maxFields: 1, fieldsType:'fixed', inputType: 'text', initialValue: '', placeholder:'Enter font color'},
            }
        },

        'yaxis': {

            'title': {initialFields: 1, minFields: 0, maxFields: 1, fieldsType:'fixed', inputType: 'text', initialValue: '', placeholder:'Enter title'},
            'titlefont': {
                'color': {initialFields: 1, minFields: 0, maxFields: 1, fieldsType:'fixed', inputType: 'text', initialValue: '', placeholder:'Enter title font color'},
                'size': {initialFields: 1, minFields: 0, maxFields: 1, fieldsType:'fixed', inputType: 'text', initialValue: '', placeholder:'Enter title font size'},
            },
            'showline': {initialFields: 1, minFields: 0, maxFields: 1, fieldsType:'fixed', inputType: 'checkbox', initialValue: true, placeholder:'Choose showline'},
            'showgrid': {initialFields: 1, minFields: 0, maxFields: 1, fieldsType:'fixed', inputType: 'checkbox', initialValue: true, placeholder:'Choose showgrid'},
            'gridwidth': {initialFields: 1, minFields: 0, maxFields: 1, fieldsType:'fixed', inputType: 'text', initialValue: '', placeholder:'Enter gridwidth'},
            'showticklabels': {initialFields: 1, minFields: 0, maxFields: 1, fieldsType:'fixed', inputType: 'checkbox', initialValue: true, placeholder:'Choose ticklable'},
            'linecolor':  {initialFields: 1, minFields: 0, maxFields: 1, fieldsType:'fixed', inputType: 'text', initialValue: '', placeholder:'Enter linecolor'},
            'linewidth': {initialFields: 1, minFields: 0, maxFields: 1, fieldsType:'fixed', inputType: 'text', initialValue: '', placeholder:'Enter linewidth'},
            'autotick': {initialFields: 1, minFields: 0, maxFields: 1, fieldsType:'fixed', inputType: 'checkbox', initialValue: true, placeholder:'Choose autotick'},
            'ticks': {initialFields: 1, minFields: 0, maxFields: 1, fieldsType:'fixed', inputType: 'select', selectOptions: ['', 'outside', 'inside'], initialValue: '', placeholder:'Choose ticks'},
            'tickcolor': {initialFields: 1, minFields: 0, maxFields: 1, fieldsType:'fixed', inputType: 'text', initialValue: '', placeholder:'Enter tickcolor'},
            'tickwidth': {initialFields: 1, minFields: 0, maxFields: 1, fieldsType:'fixed', inputType: 'text', initialValue: 2, placeholder:'Enter tickwidth'},
            'ticklen': {initialFields: 1, minFields: 0, maxFields: 1, fieldsType:'fixed', inputType: 'text', initialValue: 5, placeholder:'Enter ticklen'},
            'tickangle': {initialFields: 1, minFields: 0, maxFields: 1, fieldsType:'fixed', inputType: 'text', initialValue: undefined, placeholder:'Enter tick angle'},
            'tickfont': {
                // 'generateSelector': '',
                'family': {initialFields: 1, minFields: 0, maxFields: 1, fieldsType:'fixed', inputType: 'text', initialValue: '', placeholder:'Enter font family'},
                'size': {initialFields: 1, minFields: 0, maxFields: 1, fieldsType:'fixed', inputType: 'text', initialValue: 12, placeholder:'Enter font size'},
                'color': {initialFields: 1, minFields: 0, maxFields: 1, fieldsType:'fixed', inputType: 'text', initialValue: '', placeholder:'Enter font color'},
            }
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

barCustomizationFields = formValidator(barCustomizationFields);

export {barCustomizationFields};