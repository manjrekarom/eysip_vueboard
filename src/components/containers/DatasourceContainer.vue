<template>
    <div id="dataSourceContainer">
        <table class="tbl-header" v-if="dataSourceArray.length">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>URL</th>
                    <th rowspan="2">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(dataSource, index) in dataSourceArray" :key="index">
                    <td class="datasource-name">{{dataSource.name}}</td>
                    <td>{{dataSource.type}}</td>
                    <td>{{dataSource.urls}}</td>
                    <td class="action">
                        <button type="submit" @click="fillModal(index)" class="shadow-button"
                        data-toggle="modal" data-target="#AddDataSourceModal">Edit</button>
                        
                        <button type="submit" @click="deleteDataSource(index)" 
                        class="shadow-button danger">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>


<script>

export default {
    
    name: 'DatasourceContainer',

    data() {
        return {
            editIndex: 0,
        }
    },

    methods: {
     
        deleteDataSource(index) {
            this.$emit('DATASOURCE_DELETED', this.dataSourceArray[index]);
            this.$store.commit('deleteDataSource', index);
        },

        fillModal(index) {
            this.$bus.$emit('FILL_DS_MODEL', this.dataSourceArray[index]);
            this.$store.commit('setDataSourceMode', index);
        }

    },

    computed: {
        dataSourceArray() {
            return this.$store.state.dataSourceArray;
        }
    },

}

</script>


<style lang="less" scoped>   
    
    .datasource-name {
        font-size: 20px;
    }    

    button{
        margin-top: 20px;
        margin-bottom: 20px;
        margin-left: 10px;
        margin-right: 10px;
    }
    
</style>