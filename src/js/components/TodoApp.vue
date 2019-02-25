<template>
  <div>
    <div id="demo">
 
</div>
    <add-task v-if="modalOpen" @handleAddTask="handleAddTask"/>
    <section class="main-container">
      <div class="left-container" >
        <header>
          <div class="time-container">
            <div  id="week blue-p"  @click="Week">Week</div>
            <div id="month" :class="yearClass === 'month'? 'blue-p':'gray-p'" @click="Month">Month</div>
            <div  id="year" :class="yearClass === 'year'? 'blue-p':'gray-p'" @click="Year">Year</div>
            <div id="allTime" :class="yearClass === 'allTime'? 'blue-p':'gray-p'">All Time</div>
            <span class="absolute-span" id="absolute" v-bind:class="{month:this.month,week:this.week,year:this.year}"></span>
            <!-- <div v-for="(tab,index) in tabs" @click="tabsMethod(tab)">{{tab.val}}</div> -->
          </div>
          <div @click="handleAddTask(true)">
            <p class="addTask" id="task-btn"><span> + </span> Add Task</p>
          </div>
        </header>
        <div class="second-row">
          <p class="big-para">Mon, Feb 4 - Sun, Feb 10</p>
          <p class="bold-small-p">56% of weekly goal</p>
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
          <div class="calender-row2">
            <div class="spot-container"><span class="spot orange"></span>
              <p>Read</p>
            </div>
            <div v-if="alignMode === 'left'" class="chart-row">
              <div class="gray square hidden-square-gray" >
                <div class="orange square hidden-square-orange" style="width:45%"></div>
              </div>
              
            </div>
            <div v-else class="squares-row">
              <div class="gray square"></div>
              <div class="orange square"></div>
              <div class="orange square"></div>
              <div class="orange square"></div>
              <div class="orange square"></div>
              <div class=" square"></div>
              <div class="orange square"></div>
            </div>
          </div>
          <div class="calender-row2">
            <div class="spot-container"><span class="spot purple"></span>
              <p>Workout</p>
            </div>
            <div v-if="alignMode === 'left'" class="chart-row">
              <div class="gray square hidden-square-gray" >
                <div class="purple square hidden-square-orange" style="width:15%"></div>
              </div>
              
            </div>
            <div v-else class="squares-row">
              <div class="purple square"></div>
              <div class="purple square"></div>
              <div class="gray square"></div>
              <div class="gray square"></div>
              <div class="purple square"></div>
              <div class="purple square"></div>
              <div class=" square"></div>
            </div>
          </div>
          <div class="calender-row2">
            <div class="spot-container"><span class="spot sky"></span>
              <p>Meditate</p>
            </div>
            <div v-if="alignMode === 'left'" class="chart-row">
              <div class="gray square hidden-square-gray" >
                <div class="sky square hidden-square-orange" style="width:69%"></div>
              </div>
              
            </div>
            <div v-else class="squares-row">
              <div class="sky square"></div>
              <div class="sky square"></div>
              <div class=" square"></div>
              <div class="sky square"></div>
              <div class="sky square"></div>
              <div class=" square"></div>
              <div class="sky square"></div>
            </div>
          </div>
          <div class="calender-row2">
            <div class="spot-container"><span class="spot pink"></span>
              <p>Journal</p>
            </div>
            <div v-if="alignMode === 'left'" class="chart-row">
              <div class="gray square hidden-square-gray" >
                <div class="pink square hidden-square-orange" style="width:20%"></div>
              </div>
              
            </div>
            <div v-else class="squares-row">
              <div class="pink square"></div>
              <div class="pink square"></div>
              <div class="pink square"></div>
              <div class=" square"></div>
              <div class="pink square"></div>
              <div class="pink square"></div>
              <div class="gray square"></div>
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
              <div class="block orange-border">
                <div class="two-cols block-row1">
                  <p class="big-para">Read</p>
                  <p class="small-para">30m</p>
                </div>
                <div class="two-cols block-row1">
                  <p class="small-para"><span><img class="tick-img" src="../../assets/images/tick.png" />Complete</span></p>
                  <p class="small-para red" v-bind:style="{color: '#ECC4CA',cursor: 'pointer'}">Undo</p>
                </div>
              </div>
              <div class="block purple-border mark-complete-block">
                <div class="two-cols block-row1">
                  <p class="big-para">Read</p>
                  <p class="small-para">30m</p>
                </div>
                <div class="block-row1">
                  <div class="mark-complete center"> Mark Complete </div>
                </div>
              </div>
              <div class="block sky-border mark-complete-block">
                <div class="two-cols block-row1">
                  <p class="big-para">Read</p>
                  <p class="small-para">30m</p>
                </div>
                <div class="block-row1">
                  <div class="mark-complete center"> Mark Complete </div>
                </div>
              </div>
              <div class="block pink-border mark-complete-block">
                <div class="two-cols block-row1">
                  <p class="big-para">Read</p>
                  <p class="small-para">30m</p>
                </div>
                <div class="block-row1">
                  <div class="mark-complete center"> Mark Complete </div>
                </div>
              </div>
            </div>
          </div>

          <!-- //// -->

          <div class="right-container">
            <header>
              <!-- <div class="arrow-container center"> <i class="fa fa-angle-left gray "></i></div> -->
              <div class="double-rows">
                <p class="small-para ">Yesterday</p>
                <p class="big-para">Wed, Tue 22</p>
              </div>
              <!-- <div class="arrow-container center"> <i class="fa fa-angle-right gray "></i></div> -->
            </header>
            <div>
              <div class="block orange-border">
                <div class="two-cols block-row1">
                  <p class="big-para">Read</p>
                  <p class="small-para">30m</p>
                </div>
                <div class="two-cols block-row1">
                  <p class="small-para"><span><img class="tick-img" src="../../assets/images/tick.png" />Complete</span></p>
                  <p class="small-para red" v-bind:style="{color:' #ECC4CA', cursor: 'pointer'}">Undo</p>
                </div>
              </div>
              <div class="block purple-border mark-complete-block">
                <div class="two-cols block-row1">
                  <p class="big-para">Read</p>
                  <p class="small-para">30m</p>
                </div>
                <div class="block-row1">
                  <div class="mark-complete center"> Mark Complete </div>
                </div>
              </div>
              <div class="block sky-border mark-complete-block">
                <div class="two-cols block-row1">
                  <p class="big-para">Read</p>
                  <p class="small-para">30m</p>
                </div>
                <div class="block-row1">
                  <div class="mark-complete center"> Mark Complete </div>
                </div>
              </div>
              <div class="block pink-border mark-complete-block">
                <div class="two-cols block-row1">
                  <p class="big-para">Read</p>
                  <p class="small-para">30m</p>
                </div>
                <div class="block-row1">
                  <div class="mark-complete center"> Mark Complete </div>
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
export default {
  name: 'hello',
  // name: "my-component",
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      modalOpen: false,
      yearClass: 'week',
      alignMode: 'block',
      setopacity_block: '1',
      setopacity_left: '0.25',
      show:true,
      month:false,
      week:false,
      year:false,
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
    };
  },
  components:{
    'add-task': AddTask
  },
  created(){

  },
  methods: {
    handleyearTab(tabName){
      this.yearClass = tabName;
    },
    handleAddTask(action){
      this.modalOpen = action;
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
    Month(){
      this.month=true;
       this.week=false;
      console.log('jcjsj');
    },
    Week(){
      this.month=false;
      this.week=true;
      console.log('week');
    },
    Year(){
      this.month=false;
      this.week=false;
      this.year=true;
      console.log('year',this.year)
    }
    // tabsMethod(value){
    //   console.log(value)
    // },

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

a {
  color: #42b983;
}
</style>
