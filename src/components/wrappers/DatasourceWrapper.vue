<template>
    <div>

        <DatasourceModal v-if="enableModal"
            @DATASOURCE_ADDED="datasource => $emit('DATASOURCE_ADDED', datasource)"
            @DATASOURCE_EDITED="datasource => $emit('DATASOURCE_EDITED', datasource)"/>
            
        <DatasourceContainer 
            v-if="enableContainer"            
            @DATASOURCE_DELETED="datasource => $emit('DATASOURCE_DELETED', datasource)"
            />

    </div>
</template>

<script>

import DatasourceModal from '../modals/DatasourceModal';
import DatasourceContainer from '../containers/DatasourceContainer';

export default {
    
    name: 'DatasourceWrapper',

    components: {
        DatasourceModal,
        DatasourceContainer,
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
        dataSourceArray: {
            type: Array,
            default: () => [],
            required: false,
        }

    },

    created() {
        this.dataSourceArray.forEach(dataSource => {
            this.$store.commit('addDataSource', dataSource);
        });
    }

}
</script>