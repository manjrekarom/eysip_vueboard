<template>
    <div>

        <WidgetModal 
            v-if="enableModal"
            @WIDGET_ADDED="widgetData => $emit('WIDGET_ADDED', widgetData)"
            @WIDGET_EDITED="widgetData => $emit('WIDGET_EDITED', widgetData)"/>

        <WidgetContainer 
            v-if="enableContainer"
            @WIDGET_DELETED="widgetData => $emit('WIDGET_DELETED', widgetData)"/>  
         
    </div>
</template>

<script>

import WidgetModal from '../modals/WidgetModal';
import WidgetContainer from '../containers/WidgetContainer';

export default {
    
    name: 'WidgetWrapper',

    components: {
        WidgetModal,
        WidgetContainer
    },

    props: {

        enableModal: {
            type: Boolean,
            default: true,
            required: false
        },
        enableContainer: {
            type: Boolean,
            default: true,
            required: false
        },
        widgetArray: {
            type: Array,
            required: false,
            default: () => [],
        },
        gridItemArray: {
            type: Array,
            required: false,
            default: () => [],
        }

    },

    created() {

        this.widgetArray.forEach(widget => {
            this.$store.commit('addWidget', widget);
        });

        this.gridItemArray.forEach(gridItem => {
            this.$store.commit('addGridItem', gridItem);
        });
        
    }

}
</script>