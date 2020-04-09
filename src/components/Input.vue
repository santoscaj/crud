<template>

    <div class="row"> 
        <div class="block label-area">
            <input 
            :readonly="!edit_label" 
            :value="label"
            :class="{'error-input': error_label, 'label':!edit_label}"
            >
            <p :v-if="error_label" class="error-message"> {{error_message_label}} </p>
        </div>

        <div class="block value-area">
            <input 
            :readonly="!edit_value" 
            :value="value"
            :class="{'error-input': error_value, 'label':!edit_value}"
            >
            <p :v-if="error_value" class="error-message"> {{error_message_value}} </p>
        </div>
    </div>

</template>

<script lang="ts">
import Vue from 'vue';
import Sidebar from '@/components/Sidebar.vue';
import Data from '@/components/Data.vue';

export default Vue.extend({
  name: 'Input',
  props: {
    label: String,
    value: String,
    error_label: Boolean,
    error_value: Boolean,
    edit_label: Boolean,
    edit_value: Boolean,
    error_message_label: String,
    error_message_value: String,
    placeholder_label: String,
    placeholder_value: String,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.row{
    display: flex;
}

.block{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.error-input{
    border: 1px solid salmon;
}

/* To make it look like a label at all times */
.label{

}

</style>
