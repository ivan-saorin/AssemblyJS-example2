<menu-item>

  <li class={ active: item.active, dropdown: hasItems() }>
    <a href={ item.link.href } class={ dropdown-toggle: hasItems() } data-toggle={ dropdown: hasItems() }>{ item.link.title } <span class={ caret: true, invisible: hasNotItems() }></span></a>
    <ul class="dropdown-menu" role="menu" class={ invisible: hasNotItems() }></span>
      <menu-item each={ item, i in item.items } item={ item }></menu-item>
    </ul>
  </li>

  console.log(opts)

  this.item = opts.item

  hasNotItems() {
    return (typeof this.item.hasItem === 'undefined')
  }

  hasItems() {
    return (typeof this.item.hasItem !== 'undefined')
  }

</menu-item>
