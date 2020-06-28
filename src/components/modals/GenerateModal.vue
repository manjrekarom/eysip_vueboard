<template>
    <div class="generated-form">
        <div v-if="formObject == undefined">
            <!-- formObject will become undefined when selected a property in lineCustomizationObject which is not available in barCustomizationObject and then selects barCustomizationObject -->
            <!-- example if user select 'line' property in a html select while customizing line type widget and then select bar type widget which does not contain 'line' in html select options, formObject will become undefined -->
        </div>
        <div v-else-if="'lineBreak' in formObject">
            <div class="custom-line-break"></div>
        </div>        
        <div v-if="formObject == undefined"> 
            <!-- Do not remove this from here -->
        </div>
        <div v-else-if="'initialFields' in formObject">
            <div v-if="formObject.inputType == 'hidden'">

            </div>
            <div v-else-if="formObject.fieldsType == 'fixed' || formObject.maxFields == 1">
                <div v-if="formObject.inputType == 'select'">
                    <label for="label">{{formObject.placeholder}}</label>
                    <select class="custom-select" v-model="formObject.initialValue">
                        <option v-for="(option, index) in formObject.selectOptions" :value="option" :key="index">
                            {{ option }}
                        </option>
                    </select>
                </div>
                <div v-else-if="formObject.inputType == 'treeSelect'" :id="uuid">
                    <label for="label">{{formObject.placeholder}}</label>
                    <div v-if="formObject.multiple == true">
                        <treeselect v-model="formObject.initialValue" :flat="formObject.flat" :multiple="true" :options="formObject.selectOptions" />
                    </div>
                    <div v-else>
                        <treeselect v-model="formObject.initialValue" :multiple="false" :options="formObject.selectOptions" />
                    </div>
                </div>
                <div v-else class="form-group">
                    <label for="label">{{formObject.placeholder}}</label>
                    <input :type="formObject.inputType" 
                    v-model="formObject.initialValue" 
                    class="form-control" :placeholder="formObject.placeholder">
                </div>                
            </div>
            <div v-else>
                <div v-for="i in formObject.initialFields" :key="i">
                    <div>
                        <div v-if="i <= formObject.placeholder.length">
                            <label for="xKey">{{formObject.placeholder[i - 1]}}</label>
                        </div>
                        <div v-else>
                            <label for="xKey">{{formObject.placeholder[formObject.placeholder.length - 1]}} {{i}}</label>
                        </div>

                        <div class="widget-variable-field">
                            <div class="form-group">
                                <select v-if="formObject.inputType == 'select'" 
                                    class="custom-select" v-model="formObject.initialValue[i - 1]">
                                    <option v-for="(option, index) in formObject.selectOptions" :value="option" :key="index">
                                        {{ option }}
                                    </option>
                                </select>
                                <div v-else-if="formObject.inputType == 'treeSelect'" :id="uuid">
                                    <div v-if="formObject.multiple[i - 1] == true">
                                        <treeselect v-model="formObject.initialValue[i - 1]" :flat="formObject.flat[i - 1]" :multiple="true" :options="formObject.selectOptions" />
                                    </div>
                                    <div v-else>
                                        <treeselect v-model="formObject.initialValue[i - 1]" :multiple="false" :options="formObject.selectOptions" />
                                    </div>
                                </div>
                                <input v-else :type="formObject.inputType"
                                v-model="formObject.initialValue[i - 1]" 
                                class="form-control" :placeholder="formObject.placeholder">
                            </div>
                            <button v-if="formObject.fieldsType == 'variable' 
                                && formObject.initialFields > formObject.minFields" 
                                type="button" class="btn btn-danger delete-prop" 
                                @click="removeField(i - 1)">X
                            </button>  
                        </div>
                    </div>
                </div>
                <button v-if="formObject.fieldsType == 'variable' && formObject.initialFields < formObject.maxFields" 
                    type="button" class="btn btn-primary add-widget-button" 
                    @click="addField">Add {{formObject.placeholder[0].split(" ").pop()}}
                </button>
            </div>
        </div>
        <div v-else>
            <div v-if="'generateSelector' in formObject">
                <OptionSelector 
                :formObject="formObject"/>
            </div>
            <div v-else>
                <div v-for="(key, index) in Object.keys(formObject)" :value="key" :key="index">
                    <div v-if="typeof(formObject[key]) == 'object'">
                        <GenerateModal 
                        :formObject="formObject[key]"/>
                    </div>                    
                </div>
            </div>
        </div>
    </div>
</template>


<script>

import Treeselect from '@riophae/vue-treeselect'
import {uuidGenerator} from '../../assets/js/HelperFunctions'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

export default {
    
    name: 'GenerateModal', 

    components: {
        OptionSelector: () => import('./OptionSelector'),
        Treeselect
    },

    props: ['formObject'],   

    methods: {

        addField() {
            this.formObject.initialFields++;
        },

        removeField(index) {
            this.formObject.initialFields--;
            this.formObject.initialValue.splice(index, 1)
        },

    },

    computed: {
        uuid() {
            return uuidGenerator();
        }
    }

}
</script>


<style lang="stylus" scoped>

</style>