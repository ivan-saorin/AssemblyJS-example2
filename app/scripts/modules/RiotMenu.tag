<menu>

  <div class="collapse navbar-collapse" id={ menu.link.id }>
    <ul  class="nav navbar-nav">
      <li each={ item, i in menu.items } class={ active: item.active, dropdown: item.hasItems }>
        <a href={ item.link.href } class={ dropdown-toggle: item.hasItems } data-toggle={ dropdown: item.hasItems }>{ item.link.title } <span class={ caret: true } if={ item.hasItems }></span></a>
        <ul class="dropdown-menu" role="menu" if={ item.hasItems }></span>
          <menu menu={ item }></menu>
        </ul>
      </li>
    </ul>
  </div>

  this.menu = opts.menu

</menu>
