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
        <div class="input-container2">
          <p class="input-lable-p">Daily Task</p>
          <div class="two-cols">
            <div class="two-cols" v-bind:style="{justifyContent: 'space-between',alignItems: 'center', gridGap: '20px'}">
              <input type="number" v-model="hours" placeholder="00" />
              <p>Hours</p>
            </div>
            <div class="two-cols" v-bind:style="{justifyContent: 'space-between',alignItems: 'center', gridGap: '20px'}">
              <input type="number" v-model="minutes" placeholder="00" />
              <p>Minutes</p>
            </div>

          </div>

        </div>

      </div>
      <div class="input-container">
        <p class="input-lable-p">Name the task</p>
        <div class="seven-columns">
          <input type="text" v-model="tasks.monday" placeholder="Mon" />
          <input type="text" v-model="tasks.tuesday" placeholder="Tue" />
          <input type="text" v-model="tasks.wednesday" placeholder="Wed" />
          <input type="text" v-model="tasks.thursday" placeholder="Thu" />
          <input type="text" v-model="tasks.friday" placeholder="Fri" />
          <input type="text" v-model="tasks.saturday" placeholder="Sat" />
          <input type="text" v-model="tasks.sunday" placeholder="Sun" />
        </div>
      </div>
      <div class="input-container">
        <p class="input-lable-p">Task color</p>
        <select v-model="taskColor">
          <option class="option"><span></span> Pink</option>
          <option class="option"><span></span> Blue</option>
          <option class="option"><span></span> Red</option>
        </select>
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
  export default {
    name: 'AddTask',
    data() {
      return {
        taskName: '',
        hours: '',
        minutes: '',
        taskColor: 'Pink',
        tasks: {
          monday: '',
          tuesday: '',
          wednesday: '',
          thursday: '',
          friday: '',
          saturday: '',
          sunday: '',
        }
      };
    },
    methods: {
      handleAddTask(){
        this.$emit('handleAddTask', false)
      },
      saveTask(){

      },
      addTask(){

      }
    }
  };
</script>
