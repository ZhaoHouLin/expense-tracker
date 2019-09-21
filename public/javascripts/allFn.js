const allFn = {
  //計算總支出
  totalAmount: function(recordsData) {
    let result = 0;
    recordsData.forEach(record => (result += record.amount));
    return result;
  }
};

module.exports = allFn;
