<template>
  <section class="modal-body" id="modal-body">
    <div class="modal" id="modal">
      <div class="right">
        <div @click="handleAddTask" class="close-container center gray" id="close">
          <img src="../../assets/images/cancel.png" />
        </div>
      </div>
      <div>
        <h1 class="modal-heading">Add Task</h1>
        <p class="gray-p">Tackle your goals in daily doses</p>

        <div class="input-container">
          <p class="input-lable-p">Name the task</p>
          <input type="text" v-model="taskName" placeholder="e.g. Study Spanish" />
        </div>
      </div>
      <div class="input-container">
        <p class="input-lable-p">Name the task</p>
        <div class="seven-columns">
          <div @click="handleclick('monday')" class="active-day">Mon</div>
          <div @click="handleclick('tuesday')" class="active-day">Tue</div>
          <div @click="handleclick('wednesday')">Wed</div>
          <div @click="handleclick('thursday')" >Thu</div>
          <div @click="handleclick('friday')" class="unactive-day">Fri</div>
          <div @click="handleclick('saturay')">Sat</div>
          <div @click="handleclick('sunday')" >Sun</div>
        </div>
      </div>
      <div class="input-container">
        <p class="input-lable-p">Task color</p>
        <div id="color-picker">
          <div class="wrapper-dropdown">
            <span @click="toggleDropdown()" v-html="selector"></span>
            <ul class="dropdown" v-show="active">
              <li v-for="color in colors" @click="setColor(color.hex, color.name)"><span :style="{background: color.hex}"></span> {{color.name}}</li>
            </ul>
          </div>
        </div>
        <div class="two-cols" v-bind:style="{paddingTop: '20px'}">
          <button @click="saveTask" class="save-btn">Save Task</button>
          <div class="center">
            <p @click="addTask" class="addTask"><span> + </span> Add Another</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import {tasks, colors} from '../TaskDB/db';
  export default {
    name: 'AddTask',
    data() {
      return {
        active: false,
        taskName: '',
        tasks: tasks,
        colors: colors,
        taskcolorhex: '',
        taskcolorName: 'Pink',
        weektask: {
          monday: {
            status: '',
            task: false,
          },
          tuesday: {
            status: '',
            task: false,
          },
          wednesday: {
            status: '',
            task: false,
          },
          thursday: {
            status: '',
            task: false,
          },
          friday: {
            status: '',
            task: false,
          },
          saturday: {
            status: '',
            task: false,
          },
          sunday: {
            status: '',
            task: false,
          },
        },
      };
    },
    computed: {
      selector: function() {
        if(!this.taskcolorhex) {
          return 'Select Color';
        }
        else {
          return '<span style="background: ' + this.taskcolorhex + '"></span> ' + this.taskcolorName;
        }
      }
    },
    methods: {
      handleAddTask(){
        this.$emit('handleAddTask', false)
      },
      setColor(hex, name){
        this.taskcolorhex = hex;
        this.taskcolorName = name;
        this.active = false;
      },
      toggleDropdown() {
        this.active = !this.active;
      },
      handleclick(weekday){
        this.weektask[weekday].status = 'pending';
        this.weektask[weekday].task = true;
      },
      saveTask(){
        var ID = Math.random().toString().substring(3,6);
        console.log(this.weektask)
        if(tasks.filter(task => task.id === ID).length === 0) {
          if(this.taskName && this.taskcolorhex){
            tasks.push({
              id: ID,
              color: this.taskcolorhex,
              title: this.taskName,
              percent: '',
              weektasks: this.weektask
            })
          }
        }
      },
      addTask(){
        this.taskName = '';
        this.taskcolorhex = '';
        this.weektask = {
          monday: {
            status: '',
            task: false,
          },
          tuesday: {
            status: '',
            task: false,
          },
          wednesday: {
            status: '',
            task: false,
          },
          thursday: {
            status: '',
            task: false,
          },
          friday: {
            status: '',
            task: false,
          },
          saturday: {
            status: '',
            task: false,
          },
          sunday: {
            status: '',
            task: false,
          },
        },;
      }
    }
  };
</script>
