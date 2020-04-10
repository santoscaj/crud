<template>

    <div class="row"> 
        <div class="block label-area">
            <input 
            :readonly="!label_is_editable" 
            :value="label_value"
            :placeholder="placeholder_label"
            :class="{'error-input': showLabelError, 'label':!label_is_editable}"
            @input="e => onLabelValueChange(e.target.value)"
            >
            <p v-if="showLabelError" class="error-message"> {{error_message_label}} </p>
        </div>

        <div class="block value-area">
            <input 
            :readonly="!value_is_editable" 
            :value="value_value"
            :placeholder="placeholder_value"
            :class="{'error-input': showValueError, 'label':!value_is_editable}"
            @input="e => onValueValueChange(e.target.value)"
            >
            <div  class="error-message">
                <p v-if="showValueError"> {{error_message_value}} </p>
            </div>
        </div>
    </div>

</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'DualInput',
  data(){
      return {
          label_value: 'testing',
          value_value: 'testin'
      }
  },
  props: {
    label: {
        type:String,
        default: ''
    } ,
    value: {
        type:String,
        default: ''
    } ,
    error_on_label: {
        type:Boolean,
        default: false
    } ,
    error_on_value: {
        type:Boolean,
        default: false
    } ,
    label_is_editable: {
        type:Boolean,
        default: false
    } ,
    value_is_editable: {
        type:Boolean,
        default: true
    } ,
    error_message_label: {
        type:String,
        default: ''
    } ,
    error_message_value: {
        type:String,
        default: ''
    } ,
    placeholder_label: {
        type:String,
        default: ''
    } ,
    placeholder_value: {
        type:String,
        default: ''
    } ,
  },
  computed:{
    showLabelError(){
        return this.error_on_label && this.label_is_editable
    },
    showValueError(){
        return this.error_on_value && this.value_is_editable
    }
  },
  methods: {
    onLabelValueChange(newValue : string){
        this.label_value = newValue;
    },
    onValueValueChange(newValue : string){
        this.value_value = newValue;
    }
  },
  watch:{
      label: {
            immediate: true,
            handler(newValue){
                if (this.label_value !== newValue) 
                    this.label_value = newValue
        }
      },
      value: {
            immediate: true,
            handler(newValue){
                if (this.value_value !== newValue) 
                    this.value_value = newValue
            }
      },
      label_value(newValue){
        this.$emit('labelChanged', this.label_value)
      },
      value_value(newValue){
        this.$emit('input', this.value_value)
      }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

*{
    font-family: 'Comic Neue', cursive;
    font-family: 'Major Mono Display', monospace;
    font-family: 'Advent Pro', sans-serif;
}

input{
    padding: 2px 5px;
    box-shadow: none;
    outline: none;
    height: 26px;
    line-height: 24px;
    background: white;
    border: 1px solid lightgray;
    border-radius: 3px;
    width: 100%
}

input:hover{
  border: 1px solid gray;
}

input:focus{
  border: 1px solid #42b983;
}

.row{
    display: flex;
    height: auto;
}

.block{
    margin: 1px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    height: auto;
}

.error-input{
    border: 1px solid salmon !important;
}

.error-message{
    font-size: 9px;
    font-weight: 500;
    height: 10px;
    line-height: 10px;
    color: salmon;
    width: auto;
    padding-left: 5px;
}

.label,.label:hover, .label:focus{
    background: rgba(255, 255, 255, 0);
    border: 1px solid rgba(255, 255, 255, 0);
    font-weight: 500;
    width: 100%;
    /* text-align: end; */
}

/* To make it look like a label at all times */
/* .label{

} */

</style>
