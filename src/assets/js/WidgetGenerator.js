import {getAllValues, retrieveFormData} from "../../assets/js/HelperFunctions";

async function GenerateWidget(widgetMetaData, dataSourceID, updateOnlyWidgetLayout) {

    let jsonDataArray = [];
    let widgetData = [];
    let headerValues = [];
    let cellValues = [];
    let formValues = retrieveFormData({formValues: widgetMetaData.formObject}, {}).formValues;

    let widgetType = widgetMetaData.formObject.type;

    const currentWidgetWidth = widgetMetaData.formObject.layout.widgetOptions.width.initialValue;
    const currentWidgetHeight = widgetMetaData.formObject.layout.widgetOptions.height.initialValue;
    
    let widgetLayout = formValues.layout;
    
    widgetLayout.width = currentWidgetWidth;
    widgetLayout.height = currentWidgetHeight;    

    generateWidgetLayout(widgetMetaData, widgetType, widgetLayout, formValues);

    if(updateOnlyWidgetLayout == true) {
        return  {
            widgetData: [],
            widgetLayout: widgetLayout
        }; 
    }
    
    // let keys = formValues.keys.slice(0, widgetMetaData.formObject.keys.initialFields);
    let keys = formValues.keys;

    if (widgetMetaData.jsonDataArray.length) 
        jsonDataArray = widgetMetaData.jsonDataArray;
    else 
        jsonDataArray = await widgetMetaData.fetcher.fetch();

    for (let i = 0; i < jsonDataArray.length; i++) { //Note for myself - Cannot use foreach here as in Javascript: forEach : a return will not exit the calling function
        
        const jsonData = jsonDataArray[i];           

        let values;
        
        if (Object.keys(formValues).includes("sortX")) {
          values  = getAllValues(jsonData, keys, formValues.sortX);                  
        } 
        else {
            values  = getAllValues(jsonData, keys, false); 
        }


        if(widgetType == 'pie') {
            
            let widget = formValues.pieOptions;

            widget.type = widgetType;
            widget.mode = 'lines';

            widget = GeneratePieChart(widget, values, formValues, dataSourceID)
            
            widgetData.push(Object.assign({}, widget)); //Assigning(Cloning) is very important.
            
            return  {
                widgetData: [...widgetData],
                widgetLayout: widgetLayout
            }; //Returning after fetching the first link as pie does not support comparing

        }

        else if(widgetType == 'table') {

            let widget = {};

            widget.type = widgetType;
            widget.mode = 'lines';
            
            widget = GenerateTable(widget, values, keys, headerValues, cellValues, formValues, dataSourceID);

            if(i == jsonDataArray.length - 1) {
                
                return  {
                    widgetData: [widget],
                    widgetLayout: widgetLayout
                };

            }

        }
        
        else if (widgetType == 'line' || widgetType == 'scattergl'){

            for (let i = 1; i < values.length; i++) {
                
                widgetLayout.xaxis.zeroline = false;
                widgetLayout.yaxis.zeroline = false;

                let widget = {};

                widget.type = widgetType;
                widget.mode = 'lines';

                widget.x = values[0];
                widget.y = values[i]; 
                widget.dataSourceID = dataSourceID;

                if (widgetType == 'Bubble') {
                    widget.mode = 'markers';
                }

                widget.line = {};
                widget.marker = {};

                if (i <= formValues.trace.name.length) {
                    widget.name = formValues.trace.name[i - 1];
                }
                else {
                    widget.name = keys[1][i - 1].split('>').pop();
                }
                if (i <= formValues.trace.mode.length) {
                    widget.mode = formValues.trace.mode[i - 1];
                }

                if (i <= formValues.trace.text.length) {
                    widget.text = formValues.trace.text[i - 1].split(",");
                }
                
                let lineData = formValues.trace.line;
                
                if (i <= lineData.color.length) {
                    widget.line.color = lineData.color[i - 1];
                }
                if (i <= lineData.width.length) {
                    widget.line.width = lineData.width[i - 1];
                }
                if (i <= lineData.shape.length) {
                    widget.line.shape = lineData.shape[i - 1];
                }
                if (i <= lineData.dash.length) {
                    widget.line.dash = lineData.dash[i - 1];
                }

                let markerData = formValues.trace.marker;
                
                if (i <= markerData.color.length) {
                    widget.marker.color = markerData.color[i - 1];
                }
                if (i <= markerData.size.length) {
                    widget.marker.size = markerData.size[i - 1];
                }

                widgetData.push(Object.assign({}, widget)); //Assigning(Cloning) is very important here.
                
            }

        }

        else if(widgetType == 'bar') {

            for (let i = 1; i < values.length; i++) {
                
                let widget = {};

                widget.type = widgetType;
                widget.mode = 'lines';

                widget.x = values[0];
                widget.y = values[i]; 
                widget.dataSourceID = dataSourceID;

                if (widgetType == 'Bubble') {
                    widget.mode = 'markers';
                }

                widget.line = {};
                widget.marker = {};

                if (i <= formValues.trace.name.length) {
                    widget.name = formValues.trace.name[i - 1];
                }
                else {
                    widget.name = keys[1][i - 1].split('>').pop();
                }
                if (i <= formValues.trace.text.length) {
                    widget.text = formValues.trace.text[i - 1].split(",");
                }
                // if (i <= formValues.trace.width.length) {
                //     widget.width = formValues.trace.width[i - 1].split(",");
                // }

                let markerData = formValues.trace.marker;
                
                if (i <= markerData.color.length) {
                    widget.marker.color = markerData.color[i - 1];
                }

                widgetData.push(Object.assign({}, widget)); //Assigning(Cloning) is very important here.
                
            }

        }

    }
    
    return  {
        widgetData: [...widgetData],
        widgetLayout: widgetLayout
    };
    
}

function GeneratePieChart(widget, values, formValues, dataSourceID) {
        
    widget.marker.colors = widget.marker.colors.split(',');

    widget.labels = values[0];
    widget.values = values[1]; 
    widget.dataSourceID = dataSourceID;

    return widget;

}

function GenerateTable(widget, values, keys, headerValues, cellValues, formValues, dataSourceID) { //headerVales, cell values are decleared global otherwise mutilple table(compare) cannot be generated
    keys.forEach(key => {
        headerValues.push([key.split('>').pop()]);
    });

    values.forEach(value => {
        cellValues.push(value);
    });    
  
    widget.header = {};
    widget.columnwidth = formValues.tableOptions.columnwidth;
    widget.header = formValues.tableOptions.header;
    widget.header.values = headerValues;
 
    widget.cells = {};
    widget.cells = formValues.tableOptions.cells;
    widget.cells.values = cellValues;

    widget.dataSourceID = dataSourceID;

    return widget;

}

function generateWidgetLayout(widgetMetaData, widgetType, widgetLayout, formValues) {
    widgetLayout.title = widgetMetaData.formObject.layout.title;
    widgetLayout.margin = formValues.layout.margin;
}

export {GenerateWidget};