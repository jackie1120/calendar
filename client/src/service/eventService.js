import request from "./index";

export default {
  /**
   * 创建事件
   * @param {Object} data 事件参数
   */
  create(data) {
    return request.post("/events", data);
  }
};
