import {ExportData} from "../../assets/js/ExportData";
import {HTTPDatafetcher} from "../../assets/js/HTTPDatafetcher";
import {downloadConfig} from "../../assets/js/HelperFunctions";

class localStorageManager {

    saveConfig(store, configName) {

        let exportData = new ExportData();

        exportData.name = configName;
        exportData.dataSourceArray = store.state.dataSourceArray;
        exportData.widgetMetaDataArray = store.state.widgetMetaDataArray;
        
        let exportDataArray = [];

        //To retreive all the configs exported earlier.
        if (localStorage.getItem('exportDataArray')) { 
            exportDataArray = JSON.parse(localStorage.getItem('exportDataArray'));
        }
         
        exportDataArray.push(exportData);

        localStorage.setItem('exportDataArray', JSON.stringify(exportDataArray));

        downloadConfig(JSON.stringify(exportData), configName, 'application/json');
        
    }    

    deleteConfig(index) {

        let exportDataArray = [];

        if (localStorage.getItem('exportDataArray')) {
            exportDataArray = JSON.parse(localStorage.getItem('exportDataArray'));
        }

        exportDataArray.splice(index, 1);

        localStorage.setItem('exportDataArray', JSON.stringify(exportDataArray));

    }
    
    loadConfig(store, index) {
        
        if (localStorage.getItem('exportDataArray')) {
            
            let exportData

            if (index < 0) {
                let parsedData = JSON.parse(localStorage.getItem('exportDataArray'));
                exportData = parsedData[parsedData.length - 1];
            }
            else {
                exportData = JSON.parse(localStorage.getItem('exportDataArray'))[index];
            }
            
            if(exportData == undefined)
                return;

            if ('widgetMetaDataArray' in exportData) {
                //converting string fetcher object to HTTPDatafetcher. Fetcher lost the func after stringify.
                exportData.widgetMetaDataArray.forEach(widgetMetaData => {
                    widgetMetaData.fetcher = new HTTPDatafetcher(widgetMetaData.fetcher.dataSource, widgetMetaData.fetcher.policy, widgetMetaData.fetcher.interval);
                });
            }
            
            this.commitDataToStore(store, exportData);
        }        
    }

    loadConfigFromFile(store, exportData) {
        
        if ('widgetMetaDataArray' in exportData) {
            exportData.widgetMetaDataArray.forEach(widgetMetaData => {
                widgetMetaData.fetcher = new HTTPDatafetcher(widgetMetaData.fetcher.dataSource);
            });
        }
            
        this.commitDataToStore(store, exportData);
     
    }

    commitDataToStore(store, exportData) {

        if(exportData == undefined)
            return;
            
        if ('dataSourceArray' in exportData) {
            store.commit('clearDataSource');
            exportData.dataSourceArray.forEach(dataSource => {
                store.commit('addDataSource', dataSource);
            });
        }       
            
        if ('widgetMetaDataArray' in exportData) {
            store.commit('clearWidgetMetaData');
            exportData.widgetMetaDataArray.forEach(widgetMetaData => {
                console.log(widgetMetaData);
                store.commit('addWidgetMetaData', widgetMetaData);
            });

        }  

    }

    getExportDataArray() {
        return JSON.parse(localStorage.getItem('exportDataArray'));
    }

}

export {localStorageManager};