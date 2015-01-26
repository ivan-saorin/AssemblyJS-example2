define(["bower_components/riotjs/riot.min.js"],function(riot){

riot.tag('menu', '<div class="collapse navbar-collapse" id="{ menu.link.id }"> <ul class="nav navbar-nav"> <menu-item each="{ item, i in menu.items }" item="{ item }"></menu-item> </ul> </div>', function(opts) {
  this.menu = opts.menu

})

return this;

});
