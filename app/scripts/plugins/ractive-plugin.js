define([
  'bower_components/ractive/ractive.js',
  'text!partials/ractive/components/bootstrap/table/bootstrap-table.tpl',
  'text!partials/ractive/components/bootstrap/navbar/bootstrap-navbar-ul.tpl',
], function( Ractive, bootstrapTableTemplate, bootstrapNavbarUl ) {

  Ractive.components['bootstrap-table'] = Ractive.extend({
    template: bootstrapTableTemplate
  });

  Ractive.components['bootstrap-navbar-ul'] = Ractive.extend({
    template: bootstrapNavbarUl
  });

  return Ractive;
});
