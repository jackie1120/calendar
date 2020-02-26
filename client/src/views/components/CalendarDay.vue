<template>
  <div
    class="calendar__date"
    @click="$emit('create')"
    :class="{
      'calendar__date--pre': item.type === 'pre',
      'calendar__date--next': item.type === 'next'
    }"
  >
    <span
      class="calendar__date-title"
      :class="currentDate === item.formatDate ? 'calendar__date--current' : ''"
      >{{ item.formatDate }}</span
    >
    <ul class="calendar__event">
      <li
        class="calendar__event-item"
        v-for="event in currentEvents"
        :key="event.id"
        @click.stop="editEvent(event)"
      >
        {{ event.title }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "CalendarDay",
  props: {
    item: Object,
    events: Object
  },
  data() {
    return {
      formatter: "M-D"
    };
  },
  computed: {
    currentDate() {
      return this.$moment().format(this.formatter);
    },
    currentEvents() {
      let currentDate = this.item.date.format("YYYY-MM-DD");
      return this.events[currentDate];
    }
  },
  methods: {
    editEvent(event) {
      this.$emit("edit", event);
    }
  }
};
</script>

<style lang="scss" scoped>
.calendar__date {
  flex: 0 1 14.28%;
  border: 1px solid #ccc;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  .calendar__date-title {
    padding: 8px;
  }
  .calendar__event {
    margin: 0;
    padding: 0 3px;
    list-style: none;
  }
  .calendar__event-item {
    padding: 2px;
    box-shadow: 2px 2px 5px #ccc;
    margin-bottom: 4px;
    cursor: pointer;
  }
}
.calendar__date--current {
  color: #409eff;
}
.calendar__date--next,
.calendar__date--pre {
  background-color: #dcdfe6;
}
</style>
