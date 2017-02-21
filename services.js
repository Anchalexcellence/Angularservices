var app = angular.module("myApp", []);

app.controller('Ctrl1', function($scope, $rootScope, broadcastfactory) {
    $scope.check = function(modeldata) {
        broadcastfactory.send(modeldata);
        $rootScope.$broadcast("toptobottam")
    }
    $rootScope.$on('bottamtotop', function() {

        $scope.data = broadcastfactory.send();
    });

});
app.controller('Ctrl2', function($scope, $rootScope, broadcastfactory) {
    $scope.check = function(modeldata) {
        broadcastfactory.send(modeldata);
        $rootScope.$emit("bottamtotop")
    }
    $scope.$on('toptobottam', function() {

        $scope.data = broadcastfactory.send();
    });

});
app.factory('broadcastfactory', function($rootScope) {
    var updateddata
    return {
        send: function(data) {
            if (data) {
                updateddata = data;
            }
            return updateddata;

        }

    }

});

app.controller("controller3", function($scope, $rootScope, dataservice) {
    $scope.docheck = function(modeldata) {
        dataservice.senddata(modeldata);
        $rootScope.$broadcast("toptobottam");
    };
    $rootScope.$on("bottamtotop", function() {
        $scope.value = dataservice.senddata();

    });
});
app.controller("controller4", function($scope, $rootScope, dataservice) {
    $scope.docheck = function(data) {
        dataservice.senddata(data);

        $rootScope.$emit("bottamtotop");
    };
    $scope.$on("toptobottam", function() {
        $scope.value = dataservice.senddata()
    });
});
app.service("dataservice", function() {
    var output;
    this.senddata = function(modeldata) {
        if (modeldata) {
            output = modeldata;
        }
        return output;
    };

});