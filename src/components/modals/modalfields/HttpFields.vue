<template>
    <div>        
        <div class="form-group">
            <label for="Headers" class="col-form-label">Headers</label>
            <textarea id="Headers" v-model="headers" class="form-control"></textarea>
        </div>
    </div>
</template>


<script>
export default {
    
    name: 'HttpFields',

    data() {
        return {
            headers: ''
        }
    },   
    
    updated() {
        this.$emit('HEADERS_UPDATED', this.headers);
    }

}
</script>