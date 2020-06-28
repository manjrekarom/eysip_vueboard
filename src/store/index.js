import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({

    state: {
        dataSourceArray: [],
        editingDataSource: false,
        editIndexDS: 0,
        editingWidget: false,
        editIndexWidget: 0,
        widgetMetaDataArray: [],
    },

    mutations: {
        
        addDataSource(state, dataSource) {
            state.dataSourceArray.push(dataSource);            
        },
        editDataSource(state, updatedDataSource) {
            state.dataSourceArray.splice(state.editIndexDS, 1, updatedDataSource);
        },
        setDataSourceMode(state, index) {
            
            if(index >= 0)
                state.editingDataSource = true;
            else
                state.editingDataSource = false;

            state.editIndexDS = index;

        },
        deleteDataSource(state, index) {
            state.dataSourceArray.splice(index, 1);
        },
        clearDataSource(state) {
            state.dataSourceArray.splice(0, state.dataSourceArray.length);
        },
        
        

        addWidgetMetaData(state, widgetMetaData) {
            state.widgetMetaDataArray.push(widgetMetaData);
        },
        editWidgetMetaData(state, widgetMetaData) {
            widgetMetaData.gridData = state.widgetMetaDataArray[state.editIndexWidget].gridData;
            state.widgetMetaDataArray.splice(state.editIndexWidget, 1, widgetMetaData);
        },
        editWidgetLayout(state, {index, newWPx, newHPx}) {
            let widgetOptions = Object.assign({}, state.widgetMetaDataArray[index].formObject.layout.widgetOptions);
            widgetOptions.height.initialValue = newHPx - 100;
            widgetOptions.width.initialValue = newWPx - 30;
            // state.widgetMetaDataArray[index].widgetLayout = widgetLayout;
            state.widgetMetaDataArray[index].formObject.layout.widgetOptions = widgetOptions;
        },
        deleteWidgetMetaData(state, index) {
            state.widgetMetaDataArray.splice(index, 1);
        },
        setWidgetMode(state, index) {
            
            if(index >= 0)
                state.editingWidget = true;
            else
                state.editingWidget = false;

            state.editIndexWidget = index;

        },
        clearWidgetMetaData(state) {
            state.widgetMetaDataArray.splice(0, state.widgetMetaDataArray.length);
        },

    }

})