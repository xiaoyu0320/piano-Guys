<template>
    <div>
        <van-nav-bar
        :title="name"
        left-arrow
        @click-left="onClickLeft"
        />
      
        <iframe id="x" :src="url"   frameborder="0" scrolling="no" ref="content" style="width:100%"></iframe>
    </div>
</template>

<script>
    import ScatterJS from 'scatterjs-core'
 
    import ScatterEOS from 'scatterjs-plugin-eosjs'
    export default {
    data () {
        return {
           url:this.$route.query.url,
           name:this.$route.query.name
        }
     },
     created() {
       
        
     },
     mounted() {
         window.scatter = ScatterJS
        
        this.$refs.content.style.minHeight= window.innerHeight+'px'
        //  console.log(document.querySelector('#x').contentWindow)
        // document.querySelector('#x').contentWindow.devicePixelRatio = 1
        // const script = document.createElement('div');
        // script.id = 'ggg'
        // document.querySelector('#x').onload  = function(){
        //     // if(document.querySelector('#x').readyState ===){}
        //     // console.log(document.querySelector('#x').contentDocument)
        //     console.log(1111)
        //     console.log(document.querySelector('#x').contentWindow) 
        // }
        

     },
     methods: {
        onClickLeft() {
            this.$router.back()
        },

     },
    }
</script>