<template>
    <div>
        
  <link rel="stylesheet" id="webcolor" v-bind:href="chooseWebcolor == 'color2' ? './color2.css' : './color1.css'">
        <div align='center'>
            <button  value="color1" name="color" v-on:click="takeWebcolor('color1')">Светлая</button>
                   <button  value="color2" name="color" v-on:click="takeWebcolor('color2')">Темная</button>
        </div>
     <center style="font-size:35px;"> 
     <br>  Количество студентов: {{studentsCount}}
     <br> ПІБ: {{student.name}} 
     <br> Оцінка: {{student.mark}} 
     <br> Залік: <input type="checkbox"  v-bind:checked="student.isDonePr">
     <br> Группа: {{student.group}}  </center> 
     
        <img  style = "display:flex;  font-size:25px; margin:auto ;" v-bind:src="student.photo">
  
    </div>

</template>

<script>
import Vue from 'vue'


export default {
      props: {
           id: '',
       },
       data: function() {
           return {
               student: {},
           }},
    
mounted: function (){
    Vue.axios.get("http://46.101.212.195:3000/students/"+this.id)
    .then( (response) => {
        console.log(response.data)
        this.student = response.data;
        
    })
    
},
computed: {
  studentsCount () {
    return this.$store.getters.getCount
  },
  chooseWebcolor () {
    return this.$store.getters.getWebcolor
  }
  
  
},
 methods: {
      takeWebcolor: function(webcolor) {
            this.$store.commit('setWebcolor', webcolor)
        },

},
}
</script>
