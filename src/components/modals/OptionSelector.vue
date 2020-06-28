<template>
    <div>

        <div class="form-group">
            <label for="widgetType">{{formObject.generateSelector}}</label>
            <select class="custom-select" v-model="selectedOption">
                <option v-for="(key, index) in Object.keys(formObject).filter(e => typeof( formObject[e]) == 'object')" 
                        :value="key" :key="index">
                    {{ key }}
                </option>
            </select>
        </div>

        <GenerateModal 
        :formObject="formObject[selectedOption]"/>

    </div>     
</template>


<script>

import GenerateModal from '../modals/GenerateModal';

export default {
    
    name: 'OptionSelector',

    components: {
        GenerateModal
    },

    props: [
        'formObject',
        'widgetLayout'
    ],

    data() {
        return {
            selectedOption: Object.keys(this.formObject).filter(e => typeof(this.formObject[e]) == 'object')[0]
        }
    },

    created() {
        this.selectedOption = Object.keys(this.formObject).filter(e => typeof(this.formObject[e]) == 'object')[0]
    },

}
</script>