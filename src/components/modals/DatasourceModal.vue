<template>
    <div>
        <button type="button" class="shadow-button" @click="($store.commit('setDataSourceMode', -1))"
        data-toggle="modal" data-target="#AddDataSourceModal">Add Datasource</button>

        <div id="AddDataSourceModal" class="modal fade" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Add Datasource</h4>
                        <button type="button" id="add-datasource-close-btn" class="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div id="add-widget-form">
                            
                            <form>
                                <div class="form-group">
                                    <label for="dataSourceName">Name</label>
                                    <input type="text" id="dataSourceName" v-model="dataSource.name" 
                                    class="form-control" placeholder="Enter Name">
                                </div>
                                <div class="form-group">
                                    <label for="type">Type</label>
                                    <select class="custom-select" v-model="dataSource.type">
                                        <option v-for="(sourceType, index) in dataSourceSelectOptions" :value="sourceType" :key="index">
                                            {{ sourceType }}
                                        </option>
                                    </select>
                                </div>
                                <div>
                                    <div v-if="dataSource.type == 'File'" class="form-group">
                                        <label for="import" class="col-form-label">Import File:</label>
                                        <input id="inputfile" @change="importDataSource($event)" type="file" multiple accept=".json, .xml, .csv" class="form-control">
                                    </div>
                                    <div v-if="dataSource.type != 'File'" class="form-group">
                                        <label for="urls" class="col-form-label">Urls</label>
                                        <textarea id="urls" v-model="dataSource.urls" class="form-control"></textarea>
                                    </div>
                                </div>
                                <SpecificSection :type="dataSource.type"
                                    @HEADERS_UPDATED="passedHeader => header=passedHeader"/>
                            </form> 

                        </div>
                    </div>
                    <div class="modal-footer">
                        <div v-if="editingDataSource">
                            <button type="submit" @click="editDataSource()" class="btn btn-primary">Edit</button>
                        </div>
                        <div v-else>
                            <button type="submit" @click="addDataSource()" class="btn btn-primary">Add</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>    
</template>


<script>

import SpecificSection from './SpecificSection';
import {Datasource} from "../../assets/js/Datasource";
import {fileFetcher} from "../../assets/js/Filefetcher";

export default {
    
    name: 'DatasourceModal',

    components: {
        SpecificSection
    },

    data() {
        return {
            
            dataSource: new Datasource(),
           
            dataSourceSelectOptions: ['JSON', 'XML', 'CSV', 'File'],

            httpDataFetcher: {},

            header: ''

        }
    },

    computed: {
        editingDataSource() {
            return this.$store.state.editingDataSource;
        }
    },

    created() {
        this.$bus.$on('FILL_DS_MODEL', this.fillDataSourceModal);
    },

    methods: {                

        async addDataSource(){

            document.getElementById("add-datasource-close-btn").click();        

            if(this.dataSource.type.toLowerCase() != 'file') {
                this.dataSource.jsonDataArray = [];
            } 

            let dataSource = new Datasource();
            const id = dataSource.id;
            dataSource = Object.assign({}, this.dataSource); //Clone
            dataSource.id = id;

            let headerObj;

            try {
                headerObj = JSON.parse(this.header);
                dataSource.header = headerObj;
            }
            catch(err) {
                console.log('Headers could not be parsed');
                dataSource.header = {'err': 'parsing error'};
            }

            

            this.$store.commit('addDataSource', dataSource);
            this.$emit('DATASOURCE_ADDED', dataSource);

        },

        async importDataSource(event) {
            
            this.dataSource.jsonDataArray = [];

            event.target.files.forEach(file => {
                
                let contentBuffer = fileFetcher(file);

                contentBuffer.then(value => {
                    this.dataSource.jsonDataArray.push(value); 
                });

            });

            document.getElementById('import-export-close-btn').click();
            
        },

        fillDataSourceModal(dataSource) {
            this.dataSource.name = dataSource.name;
            this.dataSource.type = dataSource.type;
            this.dataSource.urls = dataSource.urls;
        },

        async editDataSource() {

            if(this.dataSource.type.toLowerCase() != 'file') {
                this.dataSource.jsonDataArray = [];
            }     

            let dataSource = Object.assign({}, this.dataSource); //Clone
            this.$store.commit('editDataSource', dataSource);
            this.$emit('DATASOURCE_EDITED', dataSource);

            document.getElementById("add-datasource-close-btn").click();

        },

    },
}

</script>
