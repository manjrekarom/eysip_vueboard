<template>
    <div>
        <div id="widgetContainer" v-if="widgetMetaDataArray.length">
            <grid-layout
                    :layout.sync="gridItemArray"
                    :col-num="12"
                    :row-height="30"
                    :is-draggable="true"
                    :is-resizable="true"
                    :is-mirrored="false"
                    :vertical-compact="true"
                    :margin="[10, 67.5]"
                    :use-css-transforms="true"
            >
                <div class="widget" v-for="(widgetMetaData, i) in widgetMetaDataArray" :key="i">
                        
                    <grid-item 
                        :x="gridItemArray[i].x"
                        :y="gridItemArray[i].y"
                        :w="gridItemArray[i].w"
                        :h="gridItemArray[i].h"
                        :i="gridItemArray[i].i"
                        :min-w="gridItemArray[i].minW"
                        :min-h="gridItemArray[i].minH"
                        :max-h="gridItemArray[i].maxH"
                        :drag-ignore-from="gridItemArray[i].dragIgnoreFrom"
                        :key="gridItemArray[i].i"
                        @resized="resize">
                        
                            <WidgetItem :widgetMetaData="widgetMetaData" 
                                :index="i"
                                @EDIT_INDEX="passedEditIndex => editIndex=passedEditIndex"
                                @DELETE_WIDGET="deleteWidget"/>
                                
                    </grid-item>
                        
                </div>
            </grid-layout>
        </div>
    </div>
</template>


<script>

import VueGridLayout from 'vue-grid-layout';
import WidgetItem from '../items/WidgetItem';

export default {
    
    name: 'WidgetContainer',

    components: {
        GridLayout: VueGridLayout.GridLayout,
        GridItem: VueGridLayout.GridItem,
        WidgetItem
    },

    data() {
        return {

            editIndex: 0,
            widgetMetaDataArray: this.$store.state.widgetMetaDataArray  

        }
    },

    methods: {

        deleteWidget(index) {
            let deletedWidget = this.$store.state.widgetMetaDataArray[index];
            this.$store.commit('deleteWidgetMetaData', index);
            
            this.$emit('WIDGET_DELETED', deletedWidget);
        },  
        
        resize(i, newH, newW, newHPx, newWPx) {

            let index = 0;

            this.$store.state.widgetMetaDataArray.forEach(widgetMetaData => {
                
                if(widgetMetaData.gridData.i === i) {
                    this.$store.commit('editWidgetLayout', {index, newWPx, newHPx});
                }

                index++;
            });

            this.$bus.$emit('WIDGET_RESIZED');
        },

    },

    computed: {
        gridItemArray() {
            
            let _gridItemArray = [];

            this.$store.state.widgetMetaDataArray.forEach(widgetMetaData => {
                _gridItemArray.push(widgetMetaData.gridData);
            });

            return _gridItemArray;
        }
    },  
    
    created() {
        console.log(this.gridItemArray)
    }

}

</script>


<style lang="less">
    
    #widgetContainer .vue-grid-item{
        
        padding: 20px 20px;
        border: 1px solid grey;
        position: absolute;

        background-color: #fff;
        border: none;
        border-radius: 45px;
        box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
        outline: none;      

        .widget-manage-btn {
            position: absolute;
            top: 0px;
            left: 0px;

            .dropdown-toggle-custom {
                background-color: transparent;
                border: none;
                margin: 20px;
            }  

            .dropdown-menu.show {
                border: none;

                button {
                    margin-bottom: 20px;
                }

            }
        }
    }
       
</style>