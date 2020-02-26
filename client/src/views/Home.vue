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
        <calendar-day
          v-for="item in days"
          @create="createEvent(item)"
          @edit="editEvent"
          :key="item.formatDate"
          :item="item"
          :events="events"
        ></calendar-day>
      </div>
    </main>
    <el-dialog title="事件" :visible.sync="eventDialogShown" width="60%">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="标题" label-width="120px" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="描述" label-width="120px" prop="description">
          <el-input
            type="textarea"
            :rows="3"
            v-model="form.description"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="eventDialogShown = false">取 消</el-button>
        <el-button type="primary" @click="saveEvent()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import eventService from "@/service/eventService";
import CalendarDay from "./components/CalendarDay";

export default {
  name: "home",
  data() {
    return {
      days: [],
      events: {},
      formatter: "M-D",
      selectedDate: "",
      eventDialogShown: false,
      eventDialogType: "",
      form: {
        id: "",
        title: "",
        description: "",
        date: ""
      },
      rules: {
        title: { required: true, message: "请输入活动名称", trigger: "blur" },
        description: {
          required: true,
          message: "请输入活动描述",
          trigger: "blur"
        }
      },
      search: {
        starDate: "",
        endDate: ""
      }
    };
  },
  components: {
    CalendarDay
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
    editEvent(event) {
      this.eventDialogShown = true;
      this.eventDialogType = "edit";
      this.form.title = event.title;
      this.form.description = event.description;
      this.form.id = event.id;
      this.form.date = event.date;
    },
    createEvent(date) {
      this.form.date = date.date;
      this.eventDialogShown = true;
      this.eventDialogType = "create";
    },
    saveEvent() {
      this.$refs["form"].validate(async valid => {
        if (valid) {
          try {
            let event;
            this.eventDialogType === "create" &&
              (event = await eventService.create(this.form));
            this.eventDialogType === "edit" &&
              (event = await eventService.update(this.form));
            this.form.title = "";
            this.form.description = "";
            this.refreshEvent(event.data);
            this.eventDialogShown = false;
          } catch (e) {
            this.$message.error(e.message);
          }
        } else {
          return false;
        }
      });
    },
    refreshEvent(event) {
      let date = this.$moment(this.form.date).format("YYYY-MM-DD");
      if (this.eventDialogType === "create") {
        if (typeof this.events[date] === "undefined")
          this.events = Object.assign({}, this.events, { [date]: [event] });
        else {
          this.events[date].push(event);
        }
      } else {
        this.events[date] = this.events[date].map(item => {
          if (item.id === event.id) {
            item = Object.assign({}, item, {
              title: event.title,
              description: event.description
            });
          }
          return item;
        });
      }
    },
    async getEvents() {
      try {
        const result = await eventService.getEvents(
          this.search.starDate,
          this.search.endDate
        );
        this.events = Object.assign({}, result.data);
      } catch (e) {
        this.$message.error(e.message);
      }
    },
    initDays() {
      this.days = [];
      let daysInMonth = this.$moment(this.selectedDate).daysInMonth();
      for (let i = 1; i <= daysInMonth; i++) {
        this.days.push({
          date: this.$moment(this.selectedDate).date(i),
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
          date: firstDate.subtract(1, "days"),
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
          date: lastDate.add(1, "days"),
          formatDate: lastDate.format(this.formatter),
          num: lastDate.date(),
          type: "next"
        });
      }
      let starDate = this.days[0];
      let endDate = this.days[this.days.length - 1];
      this.search.starDate = starDate.date.format("YYYY-MM-DD");
      this.search.endDate = endDate.date.format("YYYY-MM-DD");
      this.getEvents();
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
  padding: 8px;
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
  }
}
</style>
