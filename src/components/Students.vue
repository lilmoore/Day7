<template>
   <div>
        <link rel="stylesheet" id="webcolor" v-bind:href="chooseWebcolor == 'color2' ? './color2.css' : './color1.css'">
        <div align='center'>
            <button  value="color1" name="color" v-on:click="takeWebcolor('color1')">Светлая</button>
                   <button  value="color2" name="color" v-on:click="takeWebcolor('color2')">Темная</button>
        </div>
  <div>	<table class="table table-dark">
				<tr v-for="item in students"  v-bind:key="item.id"> 
                    
                    <td>
                        <img v-bind:src="item.photo" width="70px">
                    </td>
                    <td>  
                        {{item.mark}}
                        
                    </td>
                    <td>
                        <input type="checkbox" v-bind:checked="item.isDonePr"> 
                        
                    </td>
                    
                    <td>

                    <router-link v-bind:to="'/student-info/'+item._id"> {{item.name}} </router-link>
                    </td>
                    <td>
                      {{item.group}} 
                  
                    </td>
                    <td> 
                        <a href="#" v-on:click.prevent ="deleteStudent(item._id)" v-show="item.group==getCurrentUser.group">Видалити</a>
                    </td>
                    <td>
                        <button v-on:click="getData(item._id,item.mark,item.isDonePr,item.name,item.group)"><img src="components/Black_pencil.svg" width="20px"></button>
                    </td>
			    </tr>
		</table>
                 
                <h3> Количество студентов: {{studentsCount}} </h3>
                <h3>Добавление студента:</h3>
                  <input type="text" placeholder="Оценка" v-model="mark">  <input type="checkbox" v-model="isDonePr">   <input type="text" placeholder="Имя студента" v-model="name">       <input  placeholder="Группа" type="text" v-model="group"> 
                  <button  v-on:click="addStudent()"> Добавить студента</button>
                      <p><h3>Обновить студента </h3>
                 <br>Оценка : <input type="number" v-model="mark1">
                 <br>Введите сдана ли Практическая : <input type="checkbox" v-model="isDonePr1">
                 <br>Введите имя: <input v-model="name1">
                 <br>Введите группу: <input v-model="group1">
                <br><button v-on:click="updateStudent()">Обновить студента</button>
				<h1>Currency Converter</h1>
				<span>Enter Amount:</span><input type = "number" v-model.number = "start_value" placeholder = "Enter Amount"  /><br/><br/>
				<span>Convert From:</span>
				<input  placeholder="EUR, RUR, USD" v-model="start_ccy" style = "width:300px;font-size:25px;">
			
				<span>Convert To:</span>
				<input   placeholder="EUR, RUR, USD" v-model="end_ccy" style = "width:300px;font-size:25px;">
				<button v-on:click="convert" >Convert</button>
                <br>{{result}}{{end_value | roundValue}}{{end_ccy}}
                </div>  
   </div>
</template>

<script>
  
var students = [{
    "id" : 1,
    "pib" : "Sladkova Olga",
    "zdav" : true,
    "group" : "RPZ 17 2/9",
    "src": "https://orig00.deviantart.net/ee08/f/2009/073/e/d/free_red_panda_icon_100x100_by_supertuffpinkpuff.png"
},
{
    "id" : 2,
    "pib" : "Dragan Olga",
    "zdav" : false,
    "group" : "RPZ 17 1/9",
    "src": "https://cdn-learn.adafruit.com/assets/assets/000/012/878/thumb100/led_strips_doge.bmp?1386611464"
},
{
    "id" : 3,
    "pib" : "Buro Olga",
    "zdav" : true,
    "group" : "RPZ 17 2/9",
    "src": "https://vignette.wikia.nocookie.net/adventuretime/images/9/99/AT_Icons_100x100_Jake.jpg/revision/latest?cb=20120919222926&path-prefix=ar"
}
]
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'


   export default {
            
      data: function() {
           return {
            mark: "",
            name:"",
            group:"",
            isDonePr:false,
            mark1: "",
            name1:"",
            group1:"",
            isDonePr1:false,
            studId:"",
            showInput:false,
            students: [],
            newStudent: {},
            currency:[],
            search:"",
            start_ccy:"",
            start_ccy_r:false,
            start_ccy_u:false,
            start_ccy_e:false,
            end_ccy:"",
            end_ccy_r:false,
            end_ccy_u:false,
            end_ccy_e:false,
            sell:0,
            buy:0,
            start_value:0,
            end_value:0,
            result:"",
           

       
        }},
     mounted: function(){
         this.students = students;
     },
     mounted: function(){
         axios.get("http://46.101.212.195:3000/students").then((response) => {
         console.log(response.data);
         this.students = response.data;
         this.$store.commit('setCount', this.students.length); }) 
         axios.get("https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5").then((response)=>{
            console.log(response.data);
            this.currency = response.data;
        })
    },
   
   
    computed: {
        studentsCount () {
            return this.$store.getters.getCount
        },
         chooseWebcolor () {
            return this.$store.getters.getWebcolor
        },
        getCurrentUser() {
            return this.$store.getters.getUser
        },
       
},
     
     methods: {
         
          takeWebcolor: function(webcolor) {
            this.$store.commit('setWebcolor', webcolor)
        },
     
        addStudent:function(){
            Vue.axios.post("http://46.101.212.195:3000/students", {
                mark: this.mark,
              isDonePr: this.isDonePr,
                   name: this.name,
                group: this.group,

            }).then((response)=>{
                axios.get("http://46.101.212.195:3000/students")
            .then((response) => {
                this.students = response.data;
                 this.$store.commit('setCount', this.students.length); }) 
            })      
            
            
        },
           deleteStudent:function(id){
            Vue.axios.delete("http://46.101.212.195:3000/students/"+id).then(()=>{
                  this.students = this.students.filter((element) => {
                        return element._id !== id;
                    });
                     this.$store.commit('setCount', this.students.length); }) 
           
        },
         getData: function(id,mark, isDone,name,group){
            this.studId = id;
            this.mark1 = mark;
           this.isDonePr1 = isDone;
            this.name1 = name;
            this.group1 = group;
      
            this.showInput = true;
        },
        updateStudent:function(){
            Vue.axios.put("http://46.101.212.195:3000/students/"+this.studId, {
               mark: this.mark1,
                isDonePr: this.isDonePr1,
                  name: this.name1,
                group: this.group1,
            })
            axios.get("http://46.101.212.195:3000/students").then((response)=>{
                this.students = response.data;
            })
            this.studId = "";
        },
      
        convert:function(){
            for(let i=0; i<this.currency.length; i++){
                if (this.currency[i].ccy==this.start_ccy)
                      this.sell=this.currency[i].sale;
                if (this.currency[i].ccy==this.end_ccy)
                      this.buy=this.currency[i].buy;
            }
            this.end_value=(this.start_value*this.sell)/this.buy;
            this.result = this.start_value + " " + this.start_ccy + " --> ";
            
        },
        
   
     },
     filters:{
            roundValue: function(value){
                return parseFloat(value.toFixed(2));
            },
        }
        

    }
</script>
<style scoped> 
</style>