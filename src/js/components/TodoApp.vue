<template>
  <div class="main-page"> 
    <section class="modal-body"  v-if="modalOpen" id="modal-body">
    <div v-bind:class="{modal:true,'modal-anime':modalAnime}" id="modal" >
    <add-task v-bind:class="{'modal-anime':modalAnime}" @handleAddTask="handleAddTask"/>
    </div>
    </section>
    <div class="notification">
      <div>
        <h1 class="notification-h1">Notification</h1>
        <p>Please wait..</p>
      </div>
      <div><img class="notification-cancel-icon" src="../../assets/images/cancel.png"/></div>
    </div>
    <section class="main-container">
      <div class="left-container">
        <header>
          <div class="time-container ">
            <!-- <div  id="week" :class="yearClass === 'week'? 'blue-p':'gray-p'"  @click="Week">Week</div>
            <div id="month" :class="yearClass === 'month'? 'blue-p':'gray-p'" @click="Month">Month</div>
            <div  id="year" :class="yearClass === 'year'? 'blue-p':'gray-p'" @click="Year">Year</div>
            <div id="allTime" :class="yearClass === 'allTime'? 'blue-p':'gray-p'" @click="all">All Time</div> -->
             <div  id="week" @click="Week" v-bind:style="{'color':color1}">Week</div>
            <div id="month" @click="Month" v-bind:style="{'color':color2}">Month</div>
            <div  id="year" @click="Year" v-bind:style="{'color':color3}">Year</div>
            <div id="allTime" @click="all" v-bind:style="{'color':color4}">All Time</div>
            <span class="absolute-span" id="absolute" v-bind:style="{'left':t,'transition':'.5s'}" ></span>
            <!-- <div v-for="(tab,index) in tabs" @click="tabsMethod(tab)">{{tab.val}}</div> -->
          </div>
          <div @click="handleAddTask(true)">
            <p class="addTask" id="task-btn"><span> + </span> Add Task</p>
          </div>
        </header>
        <div class="second-row">
          <p v-if="yearClass === 'week'" class="big-para">
            {{getMonday()}} - {{getSunday()}}
          </p>
          <p v-if="yearClass === 'month'" class="big-para">
            {{getMonth()}}
          </p>
          <p v-if="yearClass === 'year'" class="big-para">
            {{new Date().getFullYear()}}
          </p>
          <p v-if="yearClass === 'allTime'" class="bold-small-p">{{goals[this.yearClass]}} of all time goal</p>
          <p v-else class="bold-small-p">{{goals[this.yearClass]}} of {{this.yearClass}}ly goal</p>
          <div @click="handleAlign('left')"><i class="fa fa-align-left" id="left-align" :style="{opacity: setopacity_left}"></i></div>
          <div @click="handleAlign('block')"><i class="fa fa-th" id="fa-th" :style="{opacity: setopacity_block}"></i></div>
        </div>

        <div class="calender-container">
          <div class="calender-row2" id="calender-header" :style="{opacity: setopacity_block === 0.25? '0':'1'}">
            <div class="spot-container"></div>
            <div class="squares-row">
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
            <div>Sun</div>
            </div>
          </div>
          <div class="calender-row2" v-for="task in tasks">
            <div class="spot-container"><span class="spot" v-bind:style="{background: task.color}"></span>
              <p>{{task.title}}</p>
            </div>
            <div v-if="alignMode === 'left'" class="chart-row">
              <div class="gray square hidden-square-gray">
                <div class="square hidden-square-orange" v-bind:style="{background: task.color, width: task.percent}"></div>
              </div>
            </div>
            <div v-else class="squares-row">
              <div v-for="weektask in task.weektasks">
                <div v-if="weektask.task" class="square" v-bind:style="{background: weektask.status === 'complete'? task.color: pendingColor}"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="main-div-right-container">
        <div class="arrows-div" >
          <div class="arrow-container center" id="arrow-left"> <i class="fa fa-angle-left gray "></i></div>
          <div class="arrow-container center" id="arrow-right"> <i class="fa fa-angle-right gray "></i></div>
        </div>
        <div class="scroll-div" id="scrolling-div">
          <div class="right-container">
            <header>
              <!-- <div class="arrow-container center"> <i class="fa fa-angle-left gray "></i></div> -->
              <div class="double-rows">
                <p class="small-para ">Today</p>
                <p class="big-para">Mon, Feb 18</p>
              </div>
              <!-- <div class="arrow-container center"> <i class="fa fa-angle-right gray "></i></div> -->
            </header>
            <div>
              <div v-for="task in tasks" v-if="task.weektasks[day].task" v-bind:style="{borderLeft: `2px solid ${task.color}`}" class="block mark-complete-block">
                <div class="two-cols block-row1">
                  <p class="big-para">{{task.title}}</p>
                </div>
                <div v-if="task.weektasks[day].status === 'complete'"  class="two-cols block-row1">
                  <p class="small-para"><span><img class="tick-img" src="../../assets/images/tick.png" />Complete</span></p>
                  <p @click="handleUndo(task.id, day)"  class="small-para red" v-bind:style="{color: '#ECC4CA',cursor: 'pointer'}">Undo</p>
                </div>
                <div v-else class="block-row1">
                  <div @click="handleComplete(task.id, day)" class="mark-complete center"> Mark Complete </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  </div>


</template>

<script>

  import AddTask from './AddTask';
  import {tasks, goals} from '../TaskDB/db';
  export default {
  name: 'hello',
  // name: "my-component",
  data() {
    return {
      modalOpen: false,
      yearClass: 'week',
      alignMode: 'block',
      setopacity_block: '1',
      setopacity_left: '0.25',
      show:true,
      month:false,
      week:false,
      year:false,
      color1:'#deebfb',
      color2:'#C6CAD1',
      color3:'#C6CAD1',
      color4:'#C6CAD1',
      t: '0%',
      modalAnime:false,
      tabs:[
      {
        key:'week',
        val:'week'
      },
       {
        key:'month',
        val:'month'
      },
       {
        key:'year',
        val:'year'
      },
       {
        key:'all',
        val:'All times'
      },
      ],
      show: true,
      month: false,
      week: false,
      tasks: tasks,
      goals: goals,
      pendingColor: '#E0E7F4',
      dayIndex: 0,
      day: 0,
    };
  },
  components:{
    'add-task': AddTask
  },
  created() {
    var d = new Date();
    var n = d.getDay();
    var weekday = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
    this.dayIndex = n;
    this.day = weekday[n];
  },
  mounted() {
    const targets = this.$el;
    this
      .$anime
      .timeline()
      .add({
        targets,
        translateX: 0,
        easing: 'easeOutExpo',
      })
      .add({
        targets,
        translateX: 0,
        easing: 'easeOutExpo',
      });
      /* ... etc ... */
  },
  updated() {
    console.log("This is updated function", this.t)
  },
  methods: {
    handleyearTab(tabName){
      this.yearClass = tabName;
    },
    handleAddTask(action){
      this.modalOpen = action;
      this.modalAnime=true;
    },
    handleAlign(mode){
      if(mode === 'block'){
        this.setopacity_block = 1;
        this.setopacity_left = 0.25;
      } else {
        this.setopacity_block = 0.25;
        this.setopacity_left = 1;
      }
      this.alignMode = mode;
    },
    //  Week(){
    //   this.t='0%';
    //   this.color1:'#deebfb',
    //   this.color2:'#C6CAD1',
    //   this.color3:'#C6CAD1',
    //   this.color4:'#C6CAD1',
    // },
    // Month(){
    //   this.t='25%';
    //   this.color1:'#C6CAD1',
    //   this.color2:'#deebfb',
    //   this.color3:'#C6CAD1',
    //   this.color4:'#C6CAD1',
    // },
    // Year(){
    //   this.t='50%'
    //   this.color1:'#C6CAD1',
    //   this.color2:'#C6CAD1',
    //   this.color3:'#deebfb',
    //   this.color4:'#C6CAD1',
    // },
    // all(){
    //   this.t='75%'
    //   this.color1:'#C6CAD1',
    //   this.color2:'#C6CAD1',
    //   this.color3:'#C6CAD1',
    //   this.color4:'#deebfb',
    // },
    Week(){
      this.t='0%';
      this.color1='#deebfb'
      this.color2='#C6CAD1'
      this.color3='#C6CAD1'
      this.color4='#C6CAD1'
    },
    Month(){
      this.t='25%';
      this.color1='#C6CAD1'
      this.color2='#deebfb'
      this.color3='#C6CAD1'
      this.color4='#C6CAD1'
    },
    Year(){
      this.t='50%'
      this.color1='#C6CAD1'
      this.color2='#C6CAD1'
      this.color3='#deebfb'
      this.color4='#C6CAD1'
    },
    all(){
      this.t='75%'
      this.color1='#C6CAD1'
      this.color2='#C6CAD1'
      this.color3='#C6CAD1'
      this.color4='#deebfb'
    },
   
    // tabsMethod(value){
    //   console.log(value)
    // },

  
    getMonday() {
      let d = new Date();
      var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6 : 1);
      let date = new Date(d.setDate(diff));
      return date.toDateString().substring(0, date.toDateString().length-4);
    },
    getSunday() {
      let d = new Date();
      var day = d.getDay(),
        diff = d.getDate() - day;
      let date = new Date(d.setDate(diff));
      this.getMonth();
      return date.toDateString().substring(0, date.toDateString().length-4);
    },
    getMonth(){
      const date = new Date();  // 2009-11-10
      const month = date.toLocaleString('en-us', { month: 'long' });
      return month;
    },
    handleComplete(id, day) {
      this.tasks = this.tasks[id][day].status = 'complete';
    },
    handleUndo(id, day){
      this.tasks = this.tasks[id][day].status = 'pending';
    },
     a(){
      this.t  = '10%';
      this.$forceUpdate()
      console.log('hjgjhva',this.t);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

</style>
