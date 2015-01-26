<menu>

  <div class="collapse navbar-collapse" id={ menu.link.id }>
    <ul  class="nav navbar-nav">
      <menu-item each={ item, i in menu.items } item={ item }></menu-item>
    </ul>
  </div>

  this.menu = opts.menu

</menu>
