<template>

    <div class="row"> 
        <div class="block label-area">
            <input 
            :readonly="!editLabel" 
            :value="labelContent"
            :placeholder="labelPlaceholder"
            :class="{'error-input': showLabelError, 'label':!editLabel}"
            @input="e => onLabelValueChange(e.target.value)"
            >
            <p v-if="showLabelError" class="error-message"> {{error.label.message}} </p>
        </div>

        <div class="block value-area">
            <input
            v-if="type==='telephone'"
            v-mask="'(###) ###-####'"
            :readonly="!editValue" 
            v-model="valueContent"
            :placeholder="valuePlaceholder"
            :class="{'error-input': showValueError, 'label':!editValue}"
            >
            <input
            v-else
            :readonly="!editValue" 
            v-model="valueContent"
            :placeholder="valuePlaceholder"
            :class="{'error-input': showValueError, 'label':!editValue}"
            >
            <div  class="error-message">
                <p v-if="showValueError"> {{error.value.message}} </p>
            </div>
        </div>
    </div>

</template>

<script lang="ts">
import Vue from 'vue';
import _isEqual from 'lodash/isEqual'
import _get from 'lodash/get'
import _diff from  'lodash/difference'

class Error{
    label = {
        show: false,
        message: ''
    }
    value = {
        show: false,
        message: ''
    }
}

export default Vue.extend({
  name: 'DualInput',
  data(){
      return {
          telephoneFormat: '(***) ***-****',
          telephoneRegex: /^\([\d]{3}\) [\d]{3}-[\d]{4}/,
          labelContent: '',
          valueContent: '',
          cursorIndex : 1
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
    editLabel: {
        type:Boolean,
        default: false
    } ,
    editValue: {
        type:Boolean,
        default: true
    } ,
    error: {
        type: Object,
        default: ()=>{ return new Error()},
    },
    labelPlaceholder: {
        type:String,
        default: ''
    } ,
    valuePlaceholder: {
        type:String,
        default: ''
    } ,
    type: {
        type:String,
        // validator: (x:string) => ['telephone','text'].includes(x),
        default: 'text',
    } ,
  },
  computed:{
    showLabelError(){
        return this.error.label.show && this.editLabel
    },
    showValueError(){
        return this.error.value.show && this.editValue
    },
  },
  methods: {
    onFocus(){
        console.log('focused',(this.$refs.telephoneInput as HTMLInputElement).selectionStart )
        this.moveToPosition(this.cursorIndex,this.cursorIndex)
    },
    onLabelValueChange(newValue : string){
        this.labelContent = newValue;
    },
    moveToPosition(startPosition: number, endPosition: number){
        let inputComponent = (this.$refs.telephoneInput as HTMLInputElement)
        inputComponent.focus()
        inputComponent.setSelectionRange(startPosition, endPosition)
    },
  },
  watch:{
      label: {
            immediate: true,
            handler(newValue){
                if (this.labelContent !== newValue) 
                    this.labelContent = newValue
        }
      },
      value: {
            immediate: true,
            handler(newValue){
                if (this.valueContent !== newValue) 
                    this.valueContent = newValue
            }
      },
      labelContent(newValue){
        this.$emit('labelChanged', this.labelContent)
      },
      valueContent(newValue, oldValue){
          if (newValue!==oldValue)
            this.$emit('input', this.valueContent)
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
