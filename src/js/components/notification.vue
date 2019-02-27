<template>
  <div class="notification">
    <div>
      <h1 class="notification-h1">Notification</h1>
      <p>{{notification_msg}}</p>
    </div>
    <div><img class="notification-cancel-icon" src="../../assets/images/cancel.png"/></div>
  </div>
</template>

<script>
  export default {
    name: 'Notification',
    props: ['notification_msg'],
    data() {
      return {
        shownoti: false,
        notification_msg,
      };
    },
    computed: {

    },
    methods: {
    }
  }
</script>
