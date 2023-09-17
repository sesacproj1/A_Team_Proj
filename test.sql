-- Active: 1694234184412@@49.50.166.140@3306@miniproject
use miniproject

show tables;

select * from user;
select * from profile;

ALTER TABLE profile
ADD COLUMN userId VARCHAR(50);
desc profile

desc user;

select * from friend;
-- id:3
insert into friend values (1,3,'hb1234');
insert into friend values (2,3,'lobster100');