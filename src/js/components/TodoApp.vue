<template>
  <div class="main-page">
    <section class="modal-body"  v-if="modalOpen" id="modal-body">
      <div v-bind:class="{modal:true,'modal-anime':modalAnime}" id="modal" >
        <add-task v-bind:class="{'modal-anime':modalAnime}" @handleAddTask="handleAddTask"/>
      </div>
    </section>
    <notification v-if="shownoti" :notification_msg="notification_msg" />
    <section class="main-container">
      <div class="left-container">
        <header>
          <div class="time-container ">
            <div  id="week" :class="yearClass === 'week'? 'blue-p':'gray-p'"  @click="handleyearTab(0, 'week')">Week</div>
            <div id="month" :class="yearClass === 'month'? 'blue-p':'gray-p'" @click="handleyearTab(1, 'month')">Month</div>
            <div  id="year" :class="yearClass === 'year'? 'blue-p':'gray-p'" @click="handleyearTab(2, 'year')">Year</div>
            <div id="allTime" :class="yearClass === 'allTime'? 'blue-p':'gray-p'" @click="handleyearTab(3, 'allTime')">All Time</div>
            <span id="absolute" class="absolute-span" :style="{width: `${tabWidth}%`,transform: `translate3d(${tabIndex * (tabWidth + 75)}%, 0, 0)`,transition: 'transform .5s'}"></span>
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
          <div class="calender-row2" v-for="(task, index) in tasks">
            <div class="spot-container"><span class="spot" v-bind:style="{background: task.color}"><img @click="handleDeletTask(index)" class="task-cancel" src="../../assets/images/cancel.png" /></span>
              <p>{{task.title}}</p>
            </div>
            <div v-if="alignMode === 'left'" class="chart-row">
              <div class="gray square hidden-square-gray">
                <div class="square hidden-square-orange" v-bind:style="{background: task.color, width: task.percent}"></div>
              </div>
            </div>
            <div v-else class="squares-row">
              <div v-for="(weektask, weekIndex) in task.weektasks">
                <div v-if="weektask.task" @click="handleblockTask(index, weekIndex)" class="square" v-bind:style="{background: weektask.status === 'complete'? task.color: pendingColor}"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="Right-container">
        <div class="arrows-div" >
          <div @click="handlePrevious" class="arrow-container center" id="arrow-left"> <i class="fa fa-angle-left gray "></i></div>
          <div @click="handleNext" class="arrow-container center" id="arrow-right"> <i class="fa fa-angle-right gray "></i></div>
        </div>
        <div class="main-div-right-container" :style="{width: `${divWidth}px`,transform: `translate3d(${divWidth - ( divWidth + (divIndex * daySlide))}px, 0, 0)`,transition: 'transform .9s'}">
          <div class="scroll-div" id="scrolling-div" v-for="(week, index) in weekday" >
            <div class="right-container">
              <header>
                <div class="double-rows">
                  <p class="small-para ">{{dayName}}</p>
                  <p class="big-para">{{getDay(index)}}</p>
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
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import AddTask from './AddTask';
  import {tasks, goals} from '../TaskDB/db';
  import Notification from "./notification";
  export default {
  name: 'TodoApp',
  data() {
    return {
      modalOpen: false,
      shownoti: false,
      notification_msg: "Task Add Successfully",
      yearClass: 'week',
      alignMode: 'block',
      setopacity_block: '1',
      setopacity_left: '0.25',
      modalAnime:false,
      tasks: tasks,
      goals: goals,
      pendingColor: '#E0E7F4',
      tabIndex: 0,
      tabWidth: 25,
      divWidth: 1660,
      divIndex: 256,
      daySlide: 0,
      dayName: 'Today',
      weekday: [],
    };
  },
  components:{
    'add-task': AddTask,
    'notification': Notification
  },
  created() {
    this.getMonth();
    this.weekday = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
    this.daySlide = new Date().getDay();
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
  },
  watch:{
    daySlide(){
      var today = new Date().getDay();
      var yesterday = new Date().getDay() - 1;
      var tomorrow = new Date().getDay() + 1;
      if(today === this.daySlide){
        this.dayName ='Today';
      }
      if(yesterday === this.daySlide){
        this.dayName ='Yesterday';
      }
      if(tomorrow === this.daySlide){
        this.dayName ='Tomorrow';
      }
    }
  },
  methods: {
    handleyearTab(index, tabName){
      this.yearClass = tabName;
      this.tabIndex = index;
    },
    handleAddTask(action){
      this.modalOpen = action;
      this.modalAnime=true;
    },
    handlePrevious(){
      if(this.daySlide >= 1) {
        this.daySlide = this.daySlide - 1;
      }
    },
    handleNext(){
      if(this.daySlide <=5) {
        this.daySlide = this.daySlide + 1;
      }
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
    getDay(num) {
      let d = new Date();
      var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6 : num);
      let date = new Date(d.setDate(diff));
      return date.toDateString().substring(0, date.toDateString().length-4);
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
      this.shownoti = true;
      this.notification_msg = "Task Completed!";
      setTimeout(()=>{
        this.shownoti = false;
      }, 3000)
    },
    handleUndo(id, day) {
      this.tasks[id].weektasks[day].status = 'pending';
      this.shownoti = true;
      this.notification_msg = "Task Undo!";
      setTimeout(()=>{
        this.shownoti = false;
      }, 3000)
    },
    handleClosenoti() {
      console.log("close");
      this.shownoti = false;
    },
    handleDeletTask(index){
      this.tasks.splice(index, 1);
      this.notification_msg = "Task Deleted!";
      setTimeout(()=>{
        this.shownoti = false;
      }, 3000)
    },
    handleblockTask(index, weekIndex){
      if(this.tasks[index].weektasks[weekIndex].status == 'pending'){
        this.tasks[index].weektasks[weekIndex].status = 'complete'
      } else {
        this.tasks[index].weektasks[weekIndex].status = 'pending'
      }
    }
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
