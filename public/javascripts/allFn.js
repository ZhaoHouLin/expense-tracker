const allFn = {
  //計算總支出
  totalAmount: function(recordsData) {
    let result = 0;
    recordsData.forEach(record => (result += record.amount));
    return result;
  },

  icon: function(recordsData, categories) {
    recordsData.forEach(record => {
      // return categories[record.category].icon;
    });
    // return recordsData;
  }
};

module.exports = allFn;
