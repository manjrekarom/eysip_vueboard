<template>
    <div id="app">
    <div>
        
        <h1 style="text-align:center; font-size: 56px; font-weight: 300; color: grey; margin-top: 20px;">Vue Board</h1>
        <h2 style="text-align:center; font-size: 22px; font-weight: 300; color: grey; margin-top: 10px;">
            -An Open Source Library to aggregate and visualize data from muliple datasources
        </h2>

        <div>
            <tabs>
                <tab name="Data Source">
                    <DatasourceWrapper />
                </tab>
                <tab name="Widgets">
                    <WidgetWrapper />    
                </tab>
                <tab name="Import/Export">
                    <ImportExportContainer />
                </tab>
            </tabs>
        </div>

    </div>
    </div>
</template>


<script>

import DatasourceWrapper from './components/wrappers/DatasourceWrapper';
import WidgetWrapper from './components/wrappers/WidgetWrapper';
import ImportExportContainer from './components/containers/ImportExportContainer';
import {Tabs, Tab} from 'vue-tabs-component';
import 'vue-tabs-component/docs/resources/tabs-component.css'

export default {

    name: 'App',

    components: {

        DatasourceWrapper,
        WidgetWrapper,
        ImportExportContainer,
        Tabs,
        Tab

    },
    
}

</script>


<style lang="less">

@greenTextColor: #00d1b2;
@greyTextColor: #3A3A3A;

#app {
    font-family:"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    color: #2c3e50;
    margin: 0px 50px;
    
    .btn{
        margin-top: 30px;
        margin-left: 20px;;
    }

    .btn:focus {
        box-shadow: none;
    }

    .shadow-button {
        min-width: 140px;
        padding: 10px 40px;
        height: 45px;
        font-family: 'Roboto', sans-serif;
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: 2.5px;
        font-weight: 300;
        font-size: 15px;
        color: #000;
        background-color: #fff;
        border: none;
        border-radius: 45px;
        box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease 0s;
        cursor: pointer;
        outline: none;
    }

    .shadow-button:hover {
        background-color: #2EE59D;
        box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
        color: #fff;
        // transform: translateY(-7px);
    }

    .shadow-button.danger:hover {
        background-color: #e52e2e;
        box-shadow: 0px 15px 20px rgba(229, 46, 46, 0.4);
    }
    
    .tabs-component {

        .tabs-component-tabs {

            padding: 0px;

            .tabs-component-tab {

                border: none;
                background-color: transparent;

                transform: none;
                transition: none;

                .tabs-component-tab-a {
                    color: @greyTextColor;
                    font-size: 20px;
                    font-weight: 300;
                    text-decoration: none;
                }
            }

            .tabs-component-tab.is-active {
                border: none;
                border-bottom: 1px solid #00d1b2;
                border-bottom-color: #00d1b2;
                background-color: transparent;

                .tabs-component-tab-a {
                    color: @greenTextColor;
                    font-weight: 400;
                    text-decoration: none;
                }
            }
           
        }

        .tabs-component-panels {
            padding: 2em 2em;
        }

    }    

    table{
        
        width:100%;
        table-layout: fixed;
        margin-top: 60px;

        h1{
            font-size: 30px;
            color: #3A3A3A;
            text-transform: uppercase;
            font-weight: 300;
            text-align: center;
            margin-bottom: 15px;
        }
    
        .tbl-header{
            background-color: rgba(255,255,255,1);
        }
        .tbl-content{
            height:300px;
            overflow-x:auto;
            margin-top: 0px;
            border: 1px solid rgba(0,0,0,1);
        }
        th{
            padding: 20px 15px;
            text-align: left;
            font-weight: 500;
            font-size: 20px;
            text-align: center;
            color: #3A3A3A;
            text-transform: uppercase;

            overflow: hidden;
            text-overflow: ellipsis;

            border-top: solid 1px rgba(0,0,0,0.1);
            border-bottom: solid 1px rgba(0,0,0,0.1);
        }
        td{
            padding: 15px;
            text-align: left;
            vertical-align:middle;
            font-weight: 300;
            font-size: 20px;
            text-align: center;

            overflow: hidden;
            text-overflow: ellipsis;

            color: #3A3A3A;
            border-top: solid 1px rgba(0,0,0,0.1);
            border-bottom: solid 1px rgba(0,0,0,0.1);
        }


        /* demo styles */

        @import url(https://fonts.googleapis.com/css?family=Roboto:400,500,300,700);
        body{
        background: -webkit-linear-gradient(left, #25c481, #25b7c4);
        background: linear-gradient(to right, #25c481, #25b7c4);
        font-family: 'Roboto', sans-serif;
        }
        section{
        margin: 50px;
        }


        /* follow me template */
        .made-with-love {
        margin-top: 40px;
        padding: 10px;
        clear: left;
        text-align: center;
        font-size: 10px;
        font-family: arial;
        color: #3A3A3A;
        }
        .made-with-love i {
        font-style: normal;
        color: #F50057;
        font-size: 14px;
        position: relative;
        top: 2px;
        }
        .made-with-love a {
        color: #3A3A3A;
        text-decoration: none;
        }
        .made-with-love a:hover {
        text-decoration: underline;
        }


        /* for custom scrollbar for webkit browser*/

        ::-webkit-scrollbar {
            width: 6px;
        } 
        ::-webkit-scrollbar-track {
            -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
        } 
        ::-webkit-scrollbar-thumb {
            -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
        }

    }

    .modal-title {
        font-size: 30px;
        font-weight: 300;
    }
    
}
</style>
