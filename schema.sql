create table contactMe (
    title text not null,
    email text not null,
    username text not null,
    link text,
    category text not null,
    message text not null,
    contact_id int auto_increment,
    primary key(contact_id)
);