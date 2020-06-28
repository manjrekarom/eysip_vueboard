<template>
    <div class="widgetWrapper">
        <div v-if="widgetMetaData.formObject.widgetType === 'plotly'">
            <Plotly id="Plot" :data="widgetData" :layout="widgetLayout" :responsive="true"></Plotly>
        </div>
        <div v-else-if="widgetMetaData.formObject.widgetType === 'switch'">
            <SwitchWidget :widgetMetaData="widgetMetaData"/>
        </div>
        <div v-else-if="widgetMetaData.formObject.widgetType === 'map'">
            <div class="map-wrapper">
                <GmapMap
                :center="{lat: 0, lng: 0}"
                :zoom="1"
                map-type-id="terrain"
                :style="mapStyle"
                >
                <GmapMarker
                    :key="index"
                    v-for="(m, index) in mapPositionValues[0]"
                    :position="{lat: Number(m), lng: Number(mapPositionValues[1][index])}"
                    :clickable="m.clickable"
                    :draggable="m.draggable"
                    @click="center=m.position"
                />
                </GmapMap>
            </div>            
        </div>
        <div class="widget-manage-btn">
            <div class="btn-group dropright">
            <button type="button" class="btn btn-secondary dropdown-toggle-custom" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <svg width="1.2em" height="1.2em" viewBox="0 0 16 16" class="bi bi-three-dots-vertical" fill="rgba(0, 0, 0, 0.5)" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                </svg>
            </button>
            <div class="dropdown-menu">
                <button type="submit" @click="fillModal(index)" class="shadow-button"
                data-toggle="modal" data-target="#AddWidgetModal">Edit</button>
                <button type="submit" @click="deleteWidget(index)" class="shadow-button danger">Delete</button>
            </div>
            </div>
        </div>
    </div>
</template>


<script>

import SwitchWidget from './Widgets/Switch';
import { Plotly } from 'vue-plotly';
import {GenerateWidget} from "../../assets/js/WidgetGenerator";
import {retrieveFormData, getAllValues} from "../../assets/js/HelperFunctions";


export default {
    
    name: 'WidgetItem',

    props: ['widgetMetaData', 'index'],

    components: {
        Plotly,
        SwitchWidget
    },

    data() {
        return {
            widgetData: [],
            widgetLayout: {},
            mapStyle: "width: 100%; height: 300px",
            
            currentInterval: null,
            mapPositionValues: []
        }
    },

    methods: {

        fillModal(index)
        {
            this.$store.commit('setWidgetMode', index);
            this.$bus.$emit('FILL_Widget_MODEL', this.widgetMetaData);
        },

        deleteWidget(index){
            this.$emit('DELETE_WIDGET', index);
        },
        
        async updateWidgetData(updateOnlyWidgetLayout = false, dontUpdateWidgetLayout = false) {
            
            if(this.widgetMetaData.formObject.widgetType == 'plotly') {
                
                let data = await GenerateWidget(this.widgetMetaData, '', updateOnlyWidgetLayout);
            
                if (updateOnlyWidgetLayout == false) {
                    this.widgetData = [];
                    this.widgetData = data.widgetData;

                    if(this.currentInterval) {
                        clearInterval(this.currentInterval); 
                    }
                    
                    this.currentInterval = setInterval(() => { 
                        if (this.widgetMetaData.fetcher.policy == 'interval') {
                            this.updateWidgetData(false, true);             
                        }
                    }, this.widgetMetaData.fetcher.interval);
                    
                }

                if(dontUpdateWidgetLayout == false) {
                    this.widgetLayout = data.widgetLayout;
                }
            
            }
            else if (this.widgetMetaData.formObject.widgetType == 'map') {
                
                this.mapStyle = []; //mapStyles is made array to make propertly react

                let formValues = retrieveFormData({formValues: this.widgetMetaData.formObject}, {}).formValues;

                if(formValues.layout.height) {                
                    this.mapStyle = "height: " + formValues.layout.height + "px";                    
                }
                else {
                    this.mapStyle = "height: 400px";     
                }

                this.getMapPositions();
            }
            
        }, 

        async getMapPositions() {
            
            let formValues = retrieveFormData({formValues: this.widgetMetaData.formObject}, {}).formValues;

            let jsonDataArray = [];

            if (this.widgetMetaData.jsonDataArray.length) 
                jsonDataArray = this.widgetMetaData.jsonDataArray;
            else 
                jsonDataArray = await this.widgetMetaData.fetcher.fetch();

            for (let i = 0; i < jsonDataArray.length; i++) { //Note for myself - Cannot use foreach here as in Javascript: forEach : a return will not exit the calling function
        
                const jsonData = jsonDataArray[i];           

                let values;
            
                if (Object.keys(formValues).includes("sortX")) {
                    values  = getAllValues(jsonData, formValues.keys, formValues.sortX);                  
                } 
                else {
                    values  = getAllValues(jsonData, formValues.keys, false); 
                }

                this.mapPositionValues = values;

            }

        }

    },

    watch: {
        
        widgetMetaData: async function() {
            this.updateWidgetData();
        },

    },

    created() {

        this.updateWidgetData();
        this.$bus.$on('WIDGET_RESIZED', this.updateWidgetData, true);        

    },

}

</script>
