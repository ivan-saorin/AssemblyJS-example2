<menu-item>

  <li class={ active: item.active, dropdown: hasItems() }>
    <a href={ item.link.href } class={ dropdown-toggle: hasItems() } data-toggle={ dropdown: hasItems() }>{ item.link.title } <span class={ caret: true } if={ parent.hasNotItems }></span></a>
    <ul class="dropdown-menu" role="menu" if={ parent.hasNotItems }></span>
      <menu-item each={ item, i in item.items } item={ item }></menu-item>
    </ul>
  </li>

  this.item = opts.item

  hasNotItems() {
    return (typeof item.hasItem === 'undefined')
  }

  hasItems() {
    return (typeof item.hasItem !== 'undefined')
  }

</menu-item>
