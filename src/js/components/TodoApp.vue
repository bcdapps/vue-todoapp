<template>
  <div>
    <add-task v-if="modalOpen" @handleAddTask="handleAddTask"/>
    <section class="main-container">
      <div class="left-container">
        <header>
          <div class="time-container ">
            <div  id="week" :class="yearClass === 'week'? 'blue-p':'gray-p'"  @click="handleyearTab(0, 'week')">Week</div>
            <div id="month" :class="yearClass === 'month'? 'blue-p':'gray-p'" @click="handleyearTab(1, 'month')">Month</div>
            <div  id="year" :class="yearClass === 'year'? 'blue-p':'gray-p'" @click="handleyearTab(2, 'year')">Year</div>
            <div id="allTime" :class="yearClass === 'allTime'? 'blue-p':'gray-p'" @click="handleyearTab(3, 'allTime')">All Time</div>
            <span id="absolute" class="absolute-span" :style="{width: `${tabWidth}px`,transform: `translate3d(${tabIndex * tabWidth}px, 0, 0)`,transition: 'transform .5s'}"></span>
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
          <p v-if="yearClass === 'allTime'" class="big-para">
            24 Hours
          </p>
          <p v-if="yearClass === 'allTime'" class="bold-small-p">{{goals[this.yearClass]}} of all time goal</p>
          <p v-else class="bold-small-p">{{goals[this.yearClass]}} of {{this.yearClass}}ly goal</p>
          <div @click="handleAlign('left')"><i class="fa fa-align-left" id="left-align" :style="{opacity: setopacity_left}"></i></div>
          <div @click="handleAlign('block')"><i class="fa fa-th" id="fa-th" :style="{opacity: setopacity_block}"></i></div>
        </div>

        <div class="calender-container">
          <div class="calender-row" id="calender-header" :style="{opacity: setopacity_block === 0.25? '0':'1'}">
            <div></div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
            <div>Sun</div>
          </div>
          <div class="calender-row2" v-for="task in tasks">
            <div class="spot-container"><span class="spot" v-bind:style="{background: task.color}"><img class="task-cancel" src="../../assets/images/cancel.png" /></span>
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
          <div @click="handlePrevious" class="arrow-container center" id="arrow-left"> <i class="fa fa-angle-left gray "></i></div>
          <div @click="handleNext" class="arrow-container center" id="arrow-right"> <i class="fa fa-angle-right gray "></i></div>
        </div>
        <div class="scroll-div" id="scrolling-div">
          <div class="right-container" v-for="(week, index) in weekday">
            <header>
              <div class="double-rows">
                <p class="small-para ">Yesterday</p>
                <p class="big-para">{{getYesterday()}}</p>
              </div>
            </header>
            <div>
              <div v-for="(task, index) in tasks" v-if="task.weektasks[week].task" v-bind:style="{borderLeft: `2px solid ${task.color}`}" class="block mark-complete-block">
                <div class="two-cols block-row1">
                  <p class="big-para">{{task.title}}</p>
                </div>
                <div v-if="task.weektasks[week].status === 'complete'"  class="two-cols block-row1">
                  <p class="small-para"><span><img class="tick-img" src="../../assets/images/tick.png" />Complete</span></p>
                  <p @click="handleUndo(index, week)"  class="small-para red" v-bind:style="{color: '#ECC4CA',cursor: 'pointer'}">Undo</p>
                </div>
                <div v-else class="block-row1">
                  <div @click="handleComplete(index, week)" class="mark-complete center"> Mark Complete </div>
                </div>
              </div>
            </div>
          </div>
          <!--<div class="right-container" v-if="daySlide === 'next'">-->
            <!--<header>-->
              <!--<div class="double-rows">-->
                <!--<p class="small-para ">Today</p>-->
                <!--<p class="big-para">{{getToday()}}</p>-->
              <!--</div>-->
            <!--</header>-->
            <!--<div>-->
              <!--<div v-for="(task, index) in tasks" v-if="task.weektasks[day].task" v-bind:style="{borderLeft: `2px solid ${task.color}`}" class="block mark-complete-block">-->
                <!--<div class="two-cols block-row1">-->
                  <!--<p class="big-para">{{task.title}}</p>-->
                <!--</div>-->
                <!--<div v-if="task.weektasks[day].status === 'complete'"  class="two-cols block-row1">-->
                  <!--<p class="small-para"><span><img class="tick-img" src="../../assets/images/tick.png" />Complete</span></p>-->
                  <!--<p @click="handleUndo(index, day)"  class="small-para red" v-bind:style="{color: '#ECC4CA',cursor: 'pointer'}">Undo</p>-->
                <!--</div>-->
                <!--<div v-else class="block-row1">-->
                  <!--<div @click="handleComplete(index, day)" class="mark-complete center"> Mark Complete </div>-->
                <!--</div>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
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
  data() {
    return {
      modalOpen: false,
      yearClass: 'week',
      alignMode: 'block',
      setopacity_block: '1',
      setopacity_left: '0.25',
      show: true,
      tasks: tasks,
      goals: goals,
      pendingColor: '#E0E7F4',
      dayIndex: 0,
      day: 0,
      yesday: 0,
      tabIndex: 0,
      tabWidth: 120,
      daySlide: '',
      weekday: [],
    };
  },
  components:{
    'add-task': AddTask
  },
  created() {
    this.getMonth();
    var d = new Date();
    var n = d.getDay();
    this.weekday = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
    this.dayIndex = n;
    this.daySlide = this.weekday[n];
    this.yesday = this.weekday[n-1];
  },
  methods: {
    handleyearTab(index, tabName){
      this.yearClass = tabName;
      this.tabIndex = index;
    },
    handleAddTask(action){
      this.modalOpen = action;
    },
    handlePrevious(){
      this.daySlide = this.weekday[this.daySlide - 1];
    },
    handleNext(){
      this.daySlide = this.weekday[this.daySlide + 1];
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
        diff = d.getDate() - day + (day == 0 ? -6 : 7);
      let date = new Date(d.setDate(diff));
      return date.toDateString().substring(0, date.toDateString().length-4);
    },
    getToday() {
      let d = new Date();
      return d.toDateString().substring(0, d.toDateString().length-4);
    },
    getMonth() {
      const date = new Date();  // 2009-11-10
      const month = date.toLocaleString('en-us', {month: 'long'});
      return month;
    },
    getYesterday(){
      let d = new Date();
      d.setDate(d.getDate() - 1);
      return d.toDateString().substring(0, d.toDateString().length-4);
    },
    handleComplete(id, day) {
      this.tasks[id].weektasks[day].status = 'complete';
    },
    handleUndo(id, day){
      this.tasks[id].weektasks[day].status = 'pending';
    }
  }

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
