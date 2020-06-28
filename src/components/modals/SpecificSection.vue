<template>
    
    <div>
        <HttpFields 
            v-if="type=='JSON' || type=='CSV' || type=='XML'"
            @HEADERS_UPDATED="header => $emit('HEADERS_UPDATED', header)"/>
    </div>
    
</template>

<script>

import HttpFields from './modalfields/HttpFields';

export default {
    
    name: 'SpecificSection',

    components: {

        HttpFields,

    },

    props: {

        type: {
            type: String,
            required: true,
            default: '',
        },

    },

}
</script>