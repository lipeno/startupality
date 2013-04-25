var app = angular.module("Scriptecology", ["ngResource","uploaderModule","ratyModule","ui.bootstrap","ui"]);
app.config(["$httpProvider", function(provider) {
  provider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
}]);

app.value('ui.config', {
   select2: {
      allowClear: true,
       minimumInputLength: 1
   }
});