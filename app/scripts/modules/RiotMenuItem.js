define(["bower_components/riotjs/riot.min.js"],function(riot){

riot.tag('menu-item', '<li class="{ active: item.active, dropdown: hasItems() }"> <a href="{ item.link.href }" class="{ dropdown-toggle: hasItems() }" data-toggle="{ dropdown: hasItems() }">{ item.link.title } <span class="{ caret: true, invisible: hasNotItems() }"></span></a> <ul class="dropdown-menu" role="menu" class="{ invisible: hasNotItems() }"></span> <menu-item each="{ item, i in item.items }" item="{ item }"></menu-item> </ul> </li>', function(opts) {
  console.log(opts)

  this.item = opts.item

  this.hasNotItems = function() {
    return (typeof this.item.hasItem === 'undefined')
  }.bind(this)

  this.hasItems = function() {
    return (typeof this.item.hasItem !== 'undefined')
  }.bind(this)

})

return this;

});
