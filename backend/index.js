var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');

var app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: false })

var connection = mysql.createConnection({
  host: 'localhost',
  user:'hbstudent',
  password:'hbstudent',
  database:'studentData'
});

app.use(bodyParser.json())

app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', '*');

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

connection.connect(function(error){
  if(error){
    console.log('error');
  } else {
    console.log('Connected');
  }
})

app.get('/', function(req, res, next){
  connection.query(`select student.sid, student.sname, course.cname, course.cid
  from student, course, enrollment
  where student.sid = enrollment.sid
  and course.cid = enrollment.cid;`,
  function(error,rows,fields){
    if(error){
      console.log('error in query');
    } else {
      res.send(rows);
    }
  })
});

app.post('/', function(req, res, next){

  let sname = req.body.name;
  let math = req.body.math;
  let data = req.body.dataStructure;
  let id = 0;
  console.log(sname);
  console.log(math);
  console.log(data);
  connection.query(`insert into student values (null, '${sname}');`,
  function(error,rows,fields){
    if(error){
      console.log('error in query!!!!');
    } else {
      //console.log(rows.insertId);
      res.send(rows);
      id = rows.insertId;
      if(math){
        connection.query(`insert into enrollment values (${id}, 1);`,
        function(error,rows,fields){
          if(error){
            console.log('error to insert enrollment values');
          } else {
            console.log('insert math success!');
          }
        });
      }

      if (data){
        connection.query(`insert into enrollment values (${id}, 2);`,
        function(error,rows,fields){
          if(error){
            console.log('error in query');
          } else {
            console.log('insert data structure success!');
          }
        });
      }
    }
  })

});

app.put('/:sid/:cid', function(req, res, next){
  console.log('inside');
  let sid = req.params.sid;
  let cid = req.params.cid;
  let sname = req.body.name;
  let newCourseName = req.body.course;
  if(newCourseName === 'math'){
    newCId = 1;
  } else {
    newCId = 2;
  }

  connection.query(`update enrollment set cid= ${newCId} where cid = ${cid} and sid =${sid};`,
  function(error,rows,fields){
    if(error){
      console.log('error in query!!!!');
    } else {
      console.log('student new name :' + sname);
      console.log('student id :' + sid);
      connection.query(`update student set sname= '${sname}' where sid = ${sid};`,
      function(error,rows,fields){
        if(error){
          console.log('error in query!!!!');
        } else {
          res.send(rows);
          console.log('update 2 success');
        }
      })
    }
  })

});

app.delete('/:id/:cid', function(req, res, next){
  let sid = req.params.id;
  let cid = req.params.cid;

  connection.query(`delete from enrollment where sid = ${sid} and cid = ${cid};`,
  function(error,rows,fields){
    if(error){
      console.log('error in query');
    } else {
      res.send(rows);

      let count = 0;
      connection.query(`select count(sid) as count from enrollment where sid = ${sid};`,
      function(error,rows,fields){
        if(error){
          console.log('error in query');
        } else {

          count = rows[0].count;

          if(count === 1){
            connection.query(`delete from student where student.sid = ${sid}`,
            function(error,rows,fields){
              if(error){
                console.log(' There is another reocrd for such student!');
              } else {
                console.log('delete student success!');
              }
            })

          }

        }
      })

    }
  })






});

app.listen(1337);
