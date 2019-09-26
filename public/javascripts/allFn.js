const allFn = {
  //計算總支出
  totalAmount: function(recordsData) {
    let result = 0;
    recordsData.forEach(record => (result += record.amount));
    return result;
  },
  icons: function(recordsData) {
    recordsData.forEach(record => {
      switch (record.category) {
        case "家居物業":
          record.icon = "fas fa-home";
          break;
        case "交通出行":
          record.icon = "fas fa-shuttle-van";
          break;
        case "休閒娛樂":
          record.icon = "fas fa-grin-beam";
          break;
        case "餐飲食品":
          record.icon = "fas fa-utensils";
          break;
        case "其他":
          record.icon = "fas fa-pen";
          break;
        default:
          console.log("沒有此類別");
          break;
      }
    });
  },
  formatTime: function(recordsData) {
    recordsData.forEach(record => {
      record.formatDate = record.date.toISOString().slice(0, 10);
    });
  }
};

module.exports = allFn;
