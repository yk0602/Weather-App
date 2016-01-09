//应用
var app = angular.module('weatherApp', ['weatherApp.services']);
//控制器
app.controller('weatherController', function($scope, weatherService) {
    $scope.query = function() {
        $scope.cities = {shenzhen:'深圳', fuyang:'阜阳', shanghai:'上海'};
        $scope.data = weatherService.get($scope.city);
    };
});

//服务
angular.module('weatherApp.services', [])
.factory('weatherService', function($http) {
    var getWeather = function (city){
        var data = [];
        $http({
            method:'GET',
            url:'http://apis.baidu.com/heweather/weather/free?city=' + city,
            headers:{apikey:'d96f188bdf0e2f42a3b662b68806d7aa'},
        }).success(function(res) {
            var temp = res["HeWeather data service 3.0"][0].daily_forecast;
            for(var i = 0; i < temp.length; i++) {
                data.push({
                    date:temp[i].date, desciption:'白天' + temp[i].cond.txt_d + ', 夜间' + temp[i].cond.txt_n,
                    tmp:temp[i].tmp.min + '~' + temp[i].tmp.max, hum:temp[i].hum + '%',
                    vis:temp[i].vis, wind:temp[i].wind.dir + ' ' + temp[i].wind.sc + '级'
                });
            }
        });
        return data;
    }
    return {
        get: function(city) {
            return getWeather(city);
        }
    };
});