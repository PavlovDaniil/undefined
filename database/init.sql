Table users [headercolor: #175e7a] {
	id integer [ pk, increment, not null, unique ]
	login text [ not null, unique ]
	name text [ not null ]
	surname text
	password text [ not null ]
	role integer [ not null ]
}

Table roles [headercolor: #175e7a] {
	id integer [ pk, increment, not null, unique ]
	role text [ not null, unique ]
}

Table services [headercolor: #175e7a] {
	id integer [ pk, increment, not null, unique ]
	name text [ not null ]
}

Table orders [headercolor: #175e7a] {
	id integer [ pk, increment, not null, unique ]
	user_id integer [ not null ]
	service_id integer [ not null ]
}

Table posts [headercolor: #175e7a] {
	id integer [ pk, increment, not null, unique ]
	title text [ not null, unique ]
	text text [ not null ]
	image_id integer
	editor_id integer
}

Ref fk_roles_id_users {
	roles.id < users.role [ delete: no action, update: no action ]
}

Ref fk_users_id_orders {
	users.id < orders.user_id [ delete: no action, update: no action ]
}

Ref fk_services_id_orders {
	services.id < orders.service_id [ delete: no action, update: no action ]
}

Ref fk_users_id_posts {
	users.id < posts.editor_id [ delete: no action, update: no action ]
}