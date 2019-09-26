const allFn = {
  //計算總支出
  totalAmount: function(recordsData) {
    let result = 0;
    recordsData.forEach(record => (result += record.amount));
    return result;
  },
  icons: function(recordsData) {
    for (let i = 0; i < recordsData.length; i++) {
      switch (recordsData[i].category) {
        case "家居物業":
          recordsData[i].icon = "fas fa-home";
          break;
        case "交通出行":
          recordsData[i].icon = "fas fa-shuttle-van";
          break;
        case "休閒娛樂":
          recordsData[i].icon = "fas fa-grin-beam";
          break;
        case "餐飲食品":
          recordsData[i].icon = "fas fa-utensils";
          break;
        case "其他":
          recordsData[i].icon = "fas fa-pen";
          break;
        default:
          console.log("沒有此類別");
          break;
      }
    }
  }
};

module.exports = allFn;
