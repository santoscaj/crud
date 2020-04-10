<template>
    <div v-if="show" class="my-modal">
        <div class="confirmation-box">
            <div class="header-area">
                <p>{{title}}</p>
            </div>
            <div class="message-area">{{message}}</div>
            <div class="confirmation-area">
                <button v-if="type==='confirmation'" class="confirmation-btn red" @click="confirmation(false)">No</button>
                <button v-if="type==='confirmation'" class="confirmation-btn blue" @click="confirmation(true)">Yes</button>
                <button v-if="type==='information'" class="confirmation-btn white" @click="confirmation(true)">Ok</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

type ConfirmationType = "information" | "confirmation"

export default Vue.extend({
    name: 'Modal',
    data: () => ({
        show: false
    }),
    props:{
        type:{
            type: String,
            default: "confirmation"
        }
        ,
        title: {
            required: true,
            default: 'Confirmation box'
        },
        message: {
            required: true,
            default: 'Do you really want to delete the user?'
        },
        value: {
            required:true,
            default: false,
        },
        callback:{
            type: Function,
            default: ()=> ()=>{}
        }
    },
    watch:{
        value:{
            immediate: true, 
            handler(newValue){
            if(this.show!==newValue)
                this.show = newValue
        } 
        },
        show(newValue){
            this.$emit('input',this.show)
        }
    },
    methods:{
        confirmation(confirmation: boolean){
            this.show = false;
            this.callback(confirmation)
            // this.$emit('confirm', confirmation)
        }
    }

})

</script>

<style scoped>
.my-modal{
    background: rgb(0,0,0,0.4);
    position: absolute;
    z-index: 1;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items:center;
}

.confirmation-box{
    background: white;
    /* border: 1px solid black; */
    width: 24vw;
    height: 18vh;
    margin-bottom: 10em;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.header-area{
    background: lightgray;
    margin: 0;
    border-radius:5px 5px 0 0;;
    height: auto;
    padding: 3px;
    font-size: 12px;

    /* border: 1px solid red; */
}

.message-area{
    padding: 10px;
    font-size: 13px;
    text-align: center;
    /* border: 1px solid blue; */
}
.confirmation-area{
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    flex: 1 1 40px;

    /* border: 1px solid green; */
}

.confirmation-btn{
    color: black;
    font-size:12px;
    background: white;
    border: 1px solid black;
    margin: 5px;
    padding: 2px 4px;
    border-radius: 2px;
    height: auto;
    width: 50px;
    width: 15%;
    height: 75%;
}

.confirmation-btn:hover{
    cursor: pointer;
}

.blue:hover{
    border: 1px solid blue;
    background: cornflowerblue;
    color: white;
}

.blue:hover{
    border: 1px solid blue;
    background: white;
    color: black;
}

.red:hover{
    background: salmon;
    border: 1px solid red;
    color: white;
}


</style>