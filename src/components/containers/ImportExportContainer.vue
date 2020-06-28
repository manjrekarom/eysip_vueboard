<template>
    <div>
        <button type="button" class="shadow-button"
        data-toggle="modal" data-target="#ImportExportModal">Import/Export</button>
      
        <div id="ImportExportModal" class="modal fade" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Import/Export</h4>
                        <button type="button" id="import-export-close-btn" class="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div id="add-widget-form">
                            <div class="form-group">
                                <label for="import" class="col-form-label">Import File:</label>
                                <input id="inputfile" @change="importConfig($event)" accept=".json" type="file" class="form-control">
                            </div>                            
                            <div class="form-group">
                                <label for="configName" class="col-form-label">Config Name:</label>
                                <input id="configName" v-model="configName" type="text" class="form-control">
                            </div>
                            <div class="form-group">
                                <button type="submit" @click="saveConfig()" class="btn btn-primary">Export Locally</button>
                            </div>                            
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div  v-if="exportDataArray && exportDataArray.length">
            <table class="tbl-header">
                <thead>
                    <tr>
                        <th>Config Name</th>
                        <th>Edit Config</th>
                        <th>Delete Config</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(exportData, index) in exportDataArray" :key="index">
                        <td>{{exportData.name}}</td>
                        <td><button type="submit" @click="loadConfig(index)" class="shadow-button">Load {{exportData.name}} Config</button></td>
                        <td><button type="submit" @click="deleteConfig(index)" class="shadow-button danger">Delete {{exportData.name}} Config</button></td>                                        
                    </tr>
                </tbody>
            </table>
        </div>        
        
    </div>  
</template>


<script>

export default {
    name: 'ImportExportContainer',

    data() {
        return {
            configName: '',
            exportDataArray: this.$localStorageManager.getExportDataArray(),
        }
    },

    methods: {
        importConfig(event) {
            
            let fileReader = new FileReader(); 

            fileReader.readAsText(event.target.files[0]); 

            fileReader.onload = () => { 
                this.$localStorageManager.loadConfigFromFile(this.$store, JSON.parse(fileReader.result));
            } 

            document.getElementById('import-export-close-btn').click();
        },
        saveConfig() {
            this.$localStorageManager.saveConfig(this.$store, this.configName);
            this.exportDataArray = this.$localStorageManager.getExportDataArray();
        },
        deleteConfig(index) {
            this.$localStorageManager.deleteConfig(index);
            this.exportDataArray = this.$localStorageManager.getExportDataArray();
        },
        loadConfig(index) {
            this.$localStorageManager.loadConfig(this.$store, index);
            document.getElementById('import-export-close-btn').click();
        },

    },

    mounted() {
        this.$localStorageManager.loadConfig(this.$store, -1); //Send -ve if you want to load latest
    }
    
}


</script>