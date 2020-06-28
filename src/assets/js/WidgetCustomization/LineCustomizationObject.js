import {formValidator} from '../../js/HelperFunctions';


let lineCustomizationFields = {

    'widgetType': 'plotly',

    'keys': {initialFields: 2, minFields: 2, maxFields: 2, fieldsType: 'variable', inputType: 'treeSelect', multiple: [false, true], flat: [true, true], selectOptions: [], initialValue: [],placeholder: ['Select X Key', 'Select Y Keys']},

    'sortX': {initialFields: 1, minFields: 1, maxFields: 1, fieldsType:'fixed', inputType: 'checkbox', initialValue: false, placeholder:'Sort x-axis'},

    'break1': {'lineBreak': ''},

    'trace': {
        'generateSelector': 'Trace Options',        
        'name': {initialFields: 1, minFields: 0, maxFields: 15, fieldsType: 'variable', inputType: 'text', initialValue: [], placeholder: 'Enter Line name'},
        'mode': {initialFields: 1, minFields: 0, maxFields: 15, fieldsType: 'variable', inputType: 'select', selectOptions: ['lines', 'markers', 'lines+markers'], initialValue: [], placeholder: 'Enter Line Mode'},
        'line': {
            'generateSelector': 'Trace Line Options',        
            'color': {initialFields: 1, minFields: 0, maxFields: 15, fieldsType: 'variable', inputType: 'text', initialValue: [], placeholder: 'Enter Line Color'},
            'width': {initialFields: 1, minFields: 0, maxFields: 15, fieldsType: 'variable', inputType: 'text', initialValue: [], placeholder: 'Enter Line Width'},
            'shape': {initialFields: 1, minFields: 0, maxFields: 15, fieldsType: 'variable', inputType: 'select', selectOptions: ['spline', 'vhv', 'hvh', 'vh', 'hv'], initialValue: [], placeholder: 'Enter Line Shape'},
            'dash': {initialFields: 1, minFields: 0, maxFields: 15, fieldsType: 'variable', inputType: 'select', selectOptions: ['solid', 'dot', 'dashdot'], placeholder: 'Enter Line Dash Type'},
        },
        'marker': {
            'generateSelector': 'Trace Marker Options',        
            'color': {initialFields: 1, minFields: 0, maxFields: 15, fieldsType: 'variable', inputType: 'text', initialValue: [], placeholder: 'Enter Marker Color'},
            'size': {initialFields: 1, minFields: 0, maxFields: 15, fieldsType: 'variable', inputType: 'text', initialValue: [], placeholder: 'Enter Marker Size'},
        },
        'text': {initialFields: 1, minFields: 0, maxFields: 15, fieldsType: 'variable', inputType: 'text', initialValue: [], placeholder: 'Enter Texts'},
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
        
        'xaxis': {

            'title': {initialFields: 1, minFields: 0, maxFields: 1, fieldsType:'fixed', inputType: 'text', initialValue: '', placeholder:'Enter title'},
            'titlefont': {
                'color': {initialFields: 1, minFields: 0, maxFields: 1, fieldsType:'fixed', inputType: 'text', initialValue: '', placeholder:'Enter title font color'},
                'size': {initialFields: 1, minFields: 0, maxFields: 1, fieldsType:'fixed', inputType: 'text', initialValue: '', placeholder:'Enter title font size'},
            },
            'showline': {initialFields: 1, minFields: 0, maxFields: 1, fieldsType:'fixed', inputType: 'checkbox', initialValue: true, placeholder:'Choose showline'},
            'showgrid': {initialFields: 1, minFields: 0, maxFields: 1, fieldsType:'fixed', inputType: 'checkbox', initialValue: true, placeholder:'Choose showgrid'},
            'gridwidth': {initialFields: 1, minFields: 0, maxFields: 1, fieldsType:'fixed', inputType: 'text', initialValue: '', placeholder:'Enter gridwidth'},
            'showticklabels': {initialFields: 1, minFields: 0, maxFields: 1, fieldsType:'fixed', inputType: 'checkbox', initialValue: true, placeholder:'Choose tick lable'},
            'linecolor':  {initialFields: 1, minFields: 0, maxFields: 1, fieldsType:'fixed', inputType: 'text', initialValue: '', placeholder:'Enter line color'},
            'linewidth': {initialFields: 1, minFields: 0, maxFields: 1, fieldsType:'fixed', inputType: 'text', initialValue: '', placeholder:'Enter line width'},
            'autotick': {initialFields: 1, minFields: 0, maxFields: 1, fieldsType:'fixed', inputType: 'checkbox', initialValue: true, placeholder:'Choose autotick'},
            'ticks': {initialFields: 1, minFields: 0, maxFields: 1, fieldsType:'fixed', inputType: 'select', selectOptions: ['', 'outside', 'inside'], initialValue: '', placeholder:'Choose ticks'},
            'tickcolor': {initialFields: 1, minFields: 0, maxFields: 1, fieldsType:'fixed', inputType: 'text', initialValue: '', placeholder:'Enter tick color'},
            'tickwidth': {initialFields: 1, minFields: 0, maxFields: 1, fieldsType:'fixed', inputType: 'text', initialValue: 2, placeholder:'Enter tick width'},
            'ticklen': {initialFields: 1, minFields: 0, maxFields: 1, fieldsType:'fixed', inputType: 'text', initialValue: 0, placeholder:'Enter tick length'},
            'tickangle': {initialFields: 1, minFields: 0, maxFields: 1, fieldsType:'fixed', inputType: 'text', initialValue: undefined, placeholder:'Enter tick angle'},
            'tickfont': {
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

lineCustomizationFields = formValidator(lineCustomizationFields);

export {lineCustomizationFields};