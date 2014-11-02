<div class="collapse navbar-collapse" id="{{id}}">
  <ul  class="nav navbar-nav">{{>ulpartial}}</ul>
</div>

<!-- {{>ulpartial}} -->

{{#items}}
<li class="{{#active}}active{{/active}} {{#hasItems}}dropdown{{/hasItems}}">
  <a href="{{link.href}}" class="{{#hasItems}}dropdown-toggle{{/hasItems}}" data-toggle="{{#hasItems}}dropdown{{/hasItems}}">{{link.title}} {{#hasItems}}<span class="caret"></span>{{/hasItems}}</a>
  {{#.items}}
  <ul class="dropdown-menu" role="menu">
	{{>ulpartial}}
	</ul>
  {{/.items}}
</li>
{{/items}}
<!-- {{/ulpartial}} -->
