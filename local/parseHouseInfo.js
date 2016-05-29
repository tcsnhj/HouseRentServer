var AV = require('avoscloud-sdk');
var _ = require('underscore');
var configs = require('../configs.json').prod;
var utils = require('../utils');

AV.initialize(configs.APP_ID, configs.APP_KEY, configs.MASTER_KEY);
AV.setProduction(0);
AV.Cloud.useMasterKey();

var step = 200;
var start = 0;
var query = new AV.Query('House');
query.count()
.then(function(count) {
   // count = 20;
   var promise = AV.Promise.as();
   while(start < count) {
       (function(s, c){
           promise = promise.then(function(){
               var q  = new AV.Query('House');
               q.skip(s);
               q.limit(c);
               console.log("status: " + s + "/" + c);
               return q.find()
               .then(function(list) {
                   var promises = [];
                   _.each(list, function(item) {
                       if(!item.get('prices')) {
                           var info = utils.extractInfo(item.get('content'));
                           //console.log(info);
                           _.mapObject(info, function(val, key){
                               item.set(key, val);
                           })
                           var promise = item.save();
                           promises.push(promise);
                       }
                   })
                   return AV.Promise.when(promises);
               })
           });
       })(start, count);
       start += step;
   }
   return promise;
})
.then(function(){
    console.log("done");
})
