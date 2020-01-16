<template>
  <div class="calendar">
    <header class="calendar__header">
      <span class="calendar__title">{{ title }}</span>
      <div class="calendar__operation">
        <el-button-group>
          <el-button icon="el-icon-arrow-left" @click="preMonth"
            >上一月</el-button
          >
          <el-button @click="goToToday">今天</el-button>
          <el-button icon="el-icon-arrow-right" @click="nextMonth"
            >下一月</el-button
          >
        </el-button-group>
      </div>
    </header>
    <main class="calendar__body">
      <div class="calendar__weekday">
        <div class="calendar__weekday-title">周一</div>
        <div class="calendar__weekday-title">周二</div>
        <div class="calendar__weekday-title">周三</div>
        <div class="calendar__weekday-title">周四</div>
        <div class="calendar__weekday-title">周五</div>
        <div class="calendar__weekday-title">周六</div>
        <div class="calendar__weekday-title">周日</div>
      </div>
      <div class="calendar__table">
        <div
          class="calendar__date"
          v-for="item in days"
          :key="item.date"
          :class="{
            'calendar__date--pre': item.type === 'pre',
            'calendar__date--next': item.type === 'next'
          }"
        >
          <span
            class="calendar__date-title"
            :class="
              currentDate === item.formatDate ? 'calendar__date--current' : ''
            "
            >{{ item.formatDate }}</span
          >
          <ul class="calendar__event">
            <li class="calendar__event-item">测试</li>
          </ul>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      days: [],
      formatter: "M-D",
      selectedDate: ""
    };
  },
  computed: {
    title() {
      return this.$moment(this.selectedDate).format("Y年MM月");
    }
  },
  mounted() {
    this.selectedDate = this.$moment().format();
    this.currentDate = this.$moment().format(this.formatter);
    this.initDays();
  },
  methods: {
    initDays() {
      this.days = [];
      let daysInMonth = this.$moment(this.selectedDate).daysInMonth();
      for (let i = 1; i <= daysInMonth; i++) {
        this.days.push({
          date: this.$moment(this.selectedDate)
            .date(i)
            .format(),
          formatDate: this.$moment(this.selectedDate)
            .date(i)
            .format(this.formatter),
          num: i,
          type: "current"
        });
      }
      this.addExtralDays();
    },
    addExtralDays() {
      let firstDate = this.$moment(this.selectedDate).date(1);
      let i = firstDate.day();
      if (i === 0) i = 7;
      while (i > 1) {
        this.days.unshift({
          date: firstDate.subtract(1, "days").format(),
          formatDate: firstDate.format(this.formatter),
          num: firstDate.date(),
          type: "pre"
        });
        i--;
      }
      let lastDate = this.$moment(this.selectedDate).date(
        this.$moment(this.selectedDate).daysInMonth()
      );
      for (let i = lastDate.day(); i < 7; i++) {
        this.days.push({
          date: lastDate.add(1, "days").format(),
          formatDate: lastDate.format(this.formatter),
          num: lastDate.date(),
          type: "next"
        });
      }
    },
    nextMonth() {
      let currentDateObj = this.$moment(this.selectedDate);
      this.selectedDate = currentDateObj.add(1, "months").format();
      this.initDays();
    },
    preMonth() {
      let currentDateObj = this.$moment(this.selectedDate);
      this.selectedDate = currentDateObj.subtract(1, "months").format();
      this.initDays();
    },
    goToToday() {
      this.selectedDate = this.$moment().format();
      this.initDays();
    }
  }
};
</script>
<style lang="scss" scoped>
.calendar {
  margin: 8px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100%;
  .calendar__header {
    flex: 0 0 64px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .calendar__body {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .calendar__title {
    font-size: 20px;
    font-weight: bold;
  }
  .calendar__weekday {
    height: 30px;
    display: flex;
    .calendar__weekday-title {
      flex: 0 1 14.28%;
      text-align: center;
    }
  }
  .calendar__table {
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    flex: 1;
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
        padding: 0 8px;
        list-style: none;
      }
    }
    .calendar__date--current {
      color: #409eff;
    }
    .calendar__date--next,
    .calendar__date--pre {
      background-color: #dcdfe6;
    }
  }
}
</style>
