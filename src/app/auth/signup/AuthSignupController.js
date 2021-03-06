'use strict';

angular.module('owm.auth.signup', [])

  .controller('AuthSignupController', function ($scope, $state, $stateParams, $translate, $q, authService, alertService) {

    $scope.auth = {};
    $scope.user = {};
    $scope.me = {};
    $scope.closeAlert = alertService.closeAlert;

    var initOptions = function () {
      $scope.preferenceOptions = [
        {label: $translate.instant('USER_PREFERENCE_RENTER'), value: 'renter'},
        {label: $translate.instant('USER_PREFERENCE_OWNER'),  value: 'owner'},
        {label: $translate.instant('USER_PREFERENCE_BOTH'),   value: 'both'}
      ];
    };
    $scope.$on('$translateChangeSuccess', function () {
      initOptions();
    });
    initOptions();


    if ($state.previous.name === 'owm.resource.create') {
      $scope.user.preference = 'owner';
    } else {
      $scope.user.preference = 'renter';
    }

    $scope.signup = function () {
      alertService.load();

      var email = $scope.auth.email.trim().toLowerCase();
      authService.subscribe({
        email: email,
        password: $scope.auth.password,
        other: $scope.user
      }).then(function () {

        alertService.add('info', 'Bedankt voor je aanmelding, je kunt nu inloggen', 10000);
        $state.go('home');

      })
      .catch(function (err) {
        alertService.add(err.level, err.message, 5000);
      })
      .finally(function () {
        alertService.loaded();
      });
    };

  })
;
