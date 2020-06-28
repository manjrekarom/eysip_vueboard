<template>
    <div>
        <button type="button" class="shadow-button" @click="($store.commit('setWidgetMode', -1)); getAllDistinctKeys()"
        data-toggle="modal" data-target="#AddWidgetModal">Add Widget</button>

        <div  id="AddWidgetModal" class="modal fade" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <div v-if="editingWidget">
                            <h4 class="modal-title">Edit Widget</h4>
                        </div>
                        <h4 v-else class="modal-title">Add Widget</h4>
                        <button type="button" id="add-widget-close-btn" class="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div id="add-widget-form">
                            <form>
                                <div class="form-group">
                                    <label for="widgetName">Name</label>
                                    <input type="text" id="widgetName" v-model="widgetTitle" 
                                    class="form-control" placeholder="Enter Name">
                                </div>
                                <div class="form-group">
                                    <label for="xKey">Datasource</label>
                                    <select class="custom-select" @change="getAllDistinctKeys" v-model="selectedDataSource">
                                        <option selected v-if="dataSourceArray.length == 0">Datasource Required</option>
                                        <option v-for="(dataSource, index) in dataSourceArray" :value="index" :key="index">
                                            {{ dataSource.name }}
                                        </option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="xKey">Widget Type</label>
                                    <select class="custom-select" @change="setFormObject(selectedWidgetType)" v-model="selectedWidgetType">
                                        <option v-for="(widgetType, index) in widgetTypes" :value="widgetType" :key="index">
                                            {{ widgetType }}
                                        </option>
                                    </select>
                                </div>                               
                                <div class="form-group">
                                    <label for="policy">Widget Policy</label>
                                    <select class="custom-select" v-model="selectedPolicy">
                                        <option v-for="(option, index) in policyOptions" :value="option" :key="index">
                                            {{ option }}
                                        </option>
                                    </select>
                                </div>
                                <div v-if="selectedPolicy === 'interval'" class="form-group">
                                    <label for="policyInterval">Enter Policy Interval</label>
                                    <input type="number" id="policy" v-model="policyInterval" 
                                    class="form-control" placeholder="Enter Name">
                                </div>
                                <GenerateModal 
                                :formObject="formObject"/>
                            </form>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="submit" @click="addWidget(selectedDataSource)" class="btn btn-primary">
                            <span v-if="!editingWidget">Add</span>
                            <span v-if="editingWidget">Save</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>    
</template>


<script>

import GenerateModal from '../modals/GenerateModal';

import {getAllDistinctKeys} from "../../assets/js/HelperFunctions";
import {GridItem} from "../../assets/js/GridItem";
import {HTTPDatafetcher} from "../../assets/js/HTTPDatafetcher";
import {WidgetMetaData} from "../../assets/js/WidgetMeta";
import {lineCustomizationFields} from "../../assets/js/WidgetCustomization/LineCustomizationObject";
import {barCustomizationFields} from "../../assets/js/WidgetCustomization/BarCustomizationObject";
import {pieCustomizationFields} from "../../assets/js/WidgetCustomization/PieCustomizationObject";
import {tableCustomizationFields} from "../../assets/js/WidgetCustomization/TableCustomizationObject";
import {switchCustomizationFields} from "../../assets/js/WidgetCustomization/SwitchCustomizationObject";
import {mapCustomizationFields} from "../../assets/js/WidgetCustomization/mapCustomizationObject";


export default {
    
    name: 'WidgetModal',

    components: {
        GenerateModal,
    },

    created() {
        this.$bus.$on('FILL_Widget_MODEL', this.fillWidgetModal);

        this.selectedPolicy = this.policyOptions[0];

        this.selectedWidgetType = this.widgetTypes[0];
        this.setFormObject(this.selectedWidgetType);        
    },    

    data() {
        return {
            
            dataSourceArray: this.$store.state.dataSourceArray,
            selectedDataSource: 0,

            widgetTitle: 'Default',
            selectedWidgetType: '',
            widgetTypes: ['line', 'scattergl', 'bar', 'pie', 'table', 'map', 'switch'],

            formObject: Object.assign({}, lineCustomizationFields),
            editingFormObject: {},

            policyOptions: ['once', 'interval'],
            policyInterval: 1,
            selectedPolicy: '',

        }
    },

    computed: {
        editingWidget() {
            return this.$store.state.editingWidget;
        },        
    },

    methods: {
        
        addWidget(dataSourceIndex) {

            let dataFetcher;

            let formObject = Object.assign({}, this.formObject);
            formObject.layout.title = this.widgetTitle;
            formObject.type = this.selectedWidgetType;

            let dataSource = this.dataSourceArray[dataSourceIndex];

            if (dataSource.type != 'File') {

                dataFetcher = new HTTPDatafetcher(Object.assign({}, dataSource), this.selectedPolicy, this.policyInterval * 1000);
                
            }

            if (this.editingWidget == true) {
                // widgetLayout.width = undefined; //Seeting Width to undefined, to maintain grid layout.
                let widgetMetaData = new WidgetMetaData(this._.cloneDeep(formObject), dataFetcher, dataSource.jsonDataArray);

                this.$store.commit('editWidgetMetaData', widgetMetaData);
                // this.$emit('WIDGET_EDITED', widgetData);
            }
            else {            
                const length = this.$store.state.widgetMetaDataArray.length;

                let gridItem = new GridItem();
                gridItem.y = 6 * length;

                if(this.selectedWidgetType == 'switch') {
                    gridItem.minW = 5;
                    gridItem.minH = 4;
                }

                this.formObject.layout.widgetOptions.width.initialValue = gridItem.w * 100;

                let widgetMetaData = new WidgetMetaData(this._.cloneDeep(formObject), dataFetcher,  dataSource.jsonDataArray, gridItem);

                this.$store.commit('addWidgetMetaData', widgetMetaData);

                // this.$emit('WIDGET_ADDED', widgetData);
            }
            
            document.getElementById("add-widget-close-btn").click();
        },        

        async fillWidgetModal(widgetMetaData) {
            
            console.log(this.dataSourceArray);
            console.log(widgetMetaData);

            //Below getAllDistinctKeys can be removed. I'm not removing now, as today is presentation.
            await this.getAllDistinctKeys(); //To retrieve keys for datasource that was added after this widget was added.
           
            this.formObject = this._.cloneDeep(widgetMetaData.formObject);
            this.editingFormObject = this._.cloneDeep(widgetMetaData.formObject);

            this.widgetTitle = widgetMetaData.formObject.layout.title;
            this.selectedWidgetType = widgetMetaData.formObject.type;
            
            this.selectedPolicy = widgetMetaData.fetcher.policy;
            this.policyInterval = widgetMetaData.fetcher.interval / 1000;

            this.dataSourceArray.forEach((dataSource, index) => {
                if(dataSource.id == widgetMetaData.fetcher.dataSource.id) {
                    this.selectedDataSource = index;
                }
            });
            
        },

        async getAllDistinctKeys() {
            
            if (this.dataSourceArray.length <= 0)
                return;

            let distinctKeysArray =[];

            let selectedDataSource = this.dataSourceArray[this.selectedDataSource];
            let jsonDataArray;

            if (selectedDataSource.type.toLowerCase() != 'file') {
                jsonDataArray = await new HTTPDatafetcher(selectedDataSource).fetch();
            }
            else {
                jsonDataArray = selectedDataSource.jsonDataArray;
            }

            jsonDataArray.forEach(jsonData => {
                distinctKeysArray.push(getAllDistinctKeys(jsonData));
            });

            if("keys" in this.formObject) {
                this.formObject.keys.selectOptions = [...distinctKeysArray.reduce((a, b) => a.filter(c => b.includes(c)))]; //Intersection of all distinct keys
                this.formObject.keys.initialValue = []
            }

        },

        async setFormObject(selectedWidgetType) {

            let selectedKeys = [];
            let selectOptions = [];
            let maxFields = 0;

            let needToRetrieveKeys = false;

            if('keys' in this.formObject) {
                selectedKeys = this._.cloneDeep(this.formObject.keys.initialValue);
                selectOptions = this._.cloneDeep(this.formObject.keys.selectOptions);
                maxFields = this.formObject.keys.maxFields;
            }
            else {
                needToRetrieveKeys = true; //Select options i.e keys in json has to fetched again if user has selected switch which does not have keys slection option
            }
        
            //While editing widget if user changes widget type to line from bar and then again switch to line return editing widget.
            if (this.editingWidget == true && this.selectedWidgetType == this.editingFormObject.type) { 
                this.formObject = this._.cloneDeep(this.editingFormObject);
            }
            else {
                if(selectedWidgetType == 'line') {
                    this.formObject = Object.assign({}, lineCustomizationFields);                    
                }
                else if(selectedWidgetType == 'scattergl') {
                    this.formObject = Object.assign({}, lineCustomizationFields);                    
                }
                else if(selectedWidgetType == 'bar') {
                    this.formObject = Object.assign({}, barCustomizationFields);
                }
                else if(selectedWidgetType == 'pie') {
                    this.formObject = Object.assign({}, pieCustomizationFields);
                }
                else if(selectedWidgetType == 'switch') {
                    this.formObject = Object.assign({}, switchCustomizationFields);
                }
                else if(selectedWidgetType == 'map') {
                    this.formObject = Object.assign({}, mapCustomizationFields);
                }
                else {
                    this.formObject = Object.assign({}, tableCustomizationFields);
                }
            }
            
            if (this.formObject.widgetType === 'plotly' || this.formObject.widgetType === 'map') {   
                if (this.formObject.keys.maxFields ==  maxFields) {
                    this.formObject.keys.initialValue = this._.cloneDeep(selectedKeys);
                }
                this.formObject.keys.selectOptions = this._.cloneDeep(selectOptions);

                if (needToRetrieveKeys) {
                    await this.getAllDistinctKeys();
                }
            }
        }
    },

}

</script>


<style lang="less">
    
    #AddWidgetModal {

        .widget-variable-field {
            display: flex;
            flex-wrap: nowrap;

            .form-group {
                flex-grow: 1;
            }

            button {
                flex-grow: 0;
                min-width: 40px;
                margin: 0;
                margin-bottom: 16px;
            }
        }

        .generated-form .add-widget-button {
            margin: 0px;
            margin-bottom: 16px;
        }

        .custom-line-break {
            border-top: 1px solid #adadac;
            margin-bottom: 16px;
            margin-top: 16px;
        }

        input[type=checkbox] {
            width: auto;
            height: 40px;
            width: 40px;            
        }

    } 

</style>