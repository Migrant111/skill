/**
 * Created by wuyi on 2017/10/27.
 */
/*
* 使用方法
*
* 首先下载模块
* npm install async --save
*
* 然后引用
* var async=require('async');
*
*
* */


//例子
//并行
async.parallel({
  list1: function (callback) {
    DB.find('pic_cate',{},{"_id":1}, function (err,data) {
      // console.log(typeof(toString(toID)));
      //   console.log(typeof(toID));
      // console.log(JSON.stringify({"cid":toID}));
      var fiID=data[0]._id;

      //将对象转换成字符串
      var json=JSON.parse(JSON.stringify({"cid":fiID}));

      DB.find('pictures',json, function (err,data1) {
        callback(err,data1);
      })

    })
  },
  list2: function (callback) {
    DB.find('pic_cate',{},{"_id":1}, function (err,data) {
      // console.log(typeof(toString(toID)));
      //   console.log(typeof(toID));
      // console.log(JSON.stringify({"cid":toID}));
      var seID=data[1]._id;

      var json2=JSON.parse(JSON.stringify({"cid":seID}));

      DB.find('pictures',json2, function (err,data2) {
        callback(err,data2);
      })

    })
  }
}, function (err,results) {
  res.render('default/index',{
    selist:results.list2,
    list:results.list1
  });
})




//例子2
//并行
async.parallel({
  count: function (callback) {
    DB.count('news',{},function(err,countNum){
      callback(err,countNum);

    })
  },
  list: function (callback) {
    DB.find('news',{},{"_id":1,'title':1},{
      page:page,
      pageSize:pageSize
    },function(err,data){
      callback(err,data)
    })
  }
}, function(err, results){

  res.render('admin/news/index',{
    list:results.list,
    page:page,
    totalPage:Math.ceil(results.count/pageSize)
  })


})
