import Vue from 'vue';
import Router from 'vue-router';
import TodoApp from '../components/TodoApp';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      name: 'Todo App',
      component: TodoApp,
    },
  ],
});
