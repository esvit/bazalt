define(['angular', 'angular-mocks', 'bz/directives/bzThumb'], function (angular) {

describe('bzThumb', function () {
  var elm, $scope, $timeout,
      viewportWidth, viewportHeight,
      image = {
        'url': 'orig.jpg'
      };

  beforeEach(module('bz'));

  beforeEach(inject(function ($rootScope, $compile) {
    $scope = $rootScope;

    $scope.image = image;
    elm = angular.element('<img ng-src="{{image.url}}" bz-thumb="image.thumbnails" presets="{\'default\': { \'size\': \'100x100\' }}" />');

    $compile(elm)($scope);

    viewportWidth = window.innerWidth;
    viewportHeight = window.innerHeight;
  }));

  describe('when the directive does not evaluate to an array', function() {
    it('should throw an exception', function() {
      expect(function(){
        $scope.image.thumbnails = [];
        $scope.$apply();
        $timeout.flush();
      }).toThrow();
    });
  });

  describe('with a single query of min-width: 0', function() {
    describe('and one responsive source and a global media query', function() {
      it('should set the src to the only available image', inject(function($timeout) {
          $scope.image.thumbnails = {
            '(min-width: 0px)': 'default.jpg'
          };
          $scope.$apply();
        $timeout.flush();
        expect(elm.attr('src')).toEqual('default.jpg');
      }));
    });
  });

  describe('with two responsive sources where the final one is innerWidth+1', function() {
    it('should choose the first (smaller) one', inject(function($timeout) {
      var thumbs = {
        '(min-width: 10px)': 'default1.jpg'
      };
      thumbs['(min-width: ' + (viewportWidth+1) + 'px)'] = 'default2.jpg';
      $scope.image.thumbnails = thumbs;
      $scope.$apply();
        $timeout.flush();
      expect(elm.attr('src')).toEqual('default1.jpg');
    }));
  });

    describe('with two responsive sources where the final one is innerWidth-1', function() {
        it('should choose the second (larger) one', inject(function($timeout) {
            var thumbs = {
                '(min-width: 10px)': 'default1.jpg'
            };
            thumbs['(min-width: ' + (viewportWidth-1) + 'px)'] = 'default2.jpg';
            $scope.image.thumbnails = thumbs;
            $scope.$apply();
            $timeout.flush();
            expect(elm.attr('src')).toEqual('default2.jpg');
        }));
    });
});

});