import request from "./index";

export default {
  /**
   * 创建事件
   * @param {Object} data 事件参数
   */
  create(data) {
    delete data.id;
    return request.post("/events", data);
  },
  update(data) {
    return request.put(`/events/${data.id}`, data);
  },
  getEvents(startDate, endDate) {
    return request.get(`/events?startDate=${startDate}&endDate=${endDate}`);
  }
};
