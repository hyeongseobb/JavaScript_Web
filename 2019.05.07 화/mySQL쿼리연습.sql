##전체 실행은 F9, 내가 원하는 부분만 실행 ctrl+shift+F9

insert seob_table
(title, text)
values
('뉴스3', '하하');

select * from seob_table where title != '뉴스3';
select * from seob_table where no = 1;

## title이 뉴스1인 것을 뉴스4로 변경
update seob_table set title = '뉴스4' where title = '뉴스1';

select * from seob_table;

## title의 데이터가 뉴스3인 데이터 지우기
delete from seob_table where title = '뉴스3';