var username="amit";
var password="amit";

module.exports = {


    //inserttest : (req,res) => {

        // let query = "SELECT * FROM `login` where username"; // query database to get all the players
       
           /*   var drink;
              var fruit;
            let query="SELECT * FROM login WHERE username = ? AND password = ?";
        db.query(query, [username, password],(error, result, fields)=> {
            drink=result;
        });
                let query1 = "SELECT * FROM usertest WHERE kitno IN(select kitno from login where username = ? AND password = ?)"; 
                db.query(query1, [username, password],(error, result1, fields)=> {
                    fruit=result1;
                }); 
                // var resource;
                    res.render('welcome.ejs',
                    {
                        data:drink,
                        data1:fruit,
                        //results2:result4,

                    });
            
            */  
      //          },  
inserttest : (req,res) => {

            let query="SELECT * FROM login WHERE username = ? AND password = ?";
        db.query(query, [username, password],(error, result, fields)=> {

          /*  var moisture=50;
            var ph=2;
            var ec=70;
            var date1=new Date();
            //insertion code start     
            const sqlq='insert into usertest values ?';
            var values = [
            [,result[0].kitno,moisture,ph,ec,date1]
            ];
            db.query(sqlq, [values], function(error, results, fields) {
            if(error)
            {
                console.log(error);
            }
            else{
                console.log("1 row inserted successfully");
              
            }
           });*/
    //insertion code ends
            
               // let query1 = "SELECT * FROM usertest WHERE kitno IN(select kitno from login where username = ? AND password = ?) ORDER BY testid DESC"; 
               let query1="select * from ph order by ph_id desc;"; 
               db.query(query1,(error, result2, fields)=> {
                           
                let query2="select * from moisture order by m_id desc;"; 
                db.query(query2,(error, result3, fields)=> {
                
                // var resource;
                    res.render('mytest.ejs',
                    {
                        url:"/mytest",
                        title: "Welcome",
                        username: "AMIT",
                        country:result[0].country,
                        showtests:true,
                        data1:result,
                        results2:result2,
                        results3:result3,
                        title:"WELCOMEE"

                        //results2:result4,

                    });
                });
            });   
        });
        
        },
            


    getlogindetails: (req, res) => {
        let query = "SELECT * FROM `login`"; // query database to get all the players

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/login');
            }
            res.render('login.ejs', {
                data: result
            });
        });
    },

    logincheck: (req, res) => {
     username=req.body.user;
     password=req.body.pwd;
        
	if (username && password) {
		db.query('SELECT * FROM login WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
           //     res.redirect('/userprofile',{url:"/userprofile",title:"WELCOME",uname:results[0].username,pwdd:results[0].password});
           let query1 = "SELECT * FROM usertest WHERE kitno IN(select kitno from login where username = ? AND password = ?)"; 
           db.query(query1, [username, password],(error, result1, fields)=> {
               
            let query2="select * from ph order by order by ph_id desc; ;"; 
               db.query(query2,(error, result2, fields)=> {
                           
                let query3="select * from moisture order by m_id desc;;"; 
                db.query(query3,(error, result3, fields)=> {
                
               
            res.render('mytest',{title:"WELCOME3",showtests:false,data1:results,results1:result1,results2:result2,results3:result3});
                });
            });
        });
                //app.route('/userprofile');
			} else {
				res.send('Incorrect Username and/or Password!');
			}			
        });
    } else {
		response.send('Please enter Username and Password!');
	}
},



mytestcheck: (req, res) => {
     
    db.query('SELECT * FROM login WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
        if (results.length > 0) {
       //     res.redirect('/userprofile',{url:"/userprofile",title:"WELCOME",uname:results[0].username,pwdd:results[0].password});
       let query1 = "SELECT * FROM usertest WHERE kitno IN(select kitno from login where username = ? AND password = ?)"; 
       db.query(query1, [username, password],(error, result1, fields)=> {
            //     res.redirect('/userprofile',{url:"/userprofile",title:"WELCOME",uname:results[0].username,pwdd:results[0].password});
    
             let query2="select * from ph order by ph_id desc;;"; 
                db.query(query2,(error, result2, fields)=> {
                            
                 let query3="select * from moisture order by m_id desc;;"; 
                 db.query(query3,(error, result3, fields)=> {
                 
           
        res.render('mytest',{title:"WELCOME3",showtests:true,data1:results,results1:result1,results2:result2,results3:result3});
    
    });   
       
});
       });   
            //app.route('/userprofile');
        } else {
            res.send('Incorrect Username and/or Password!');
        }			
    });
},



registerinsert: (req, res) => {
    
    var username = req.body.usernamesignup;
var emailsignup = req.body.emailsignup;
var kitsignup = req.body.kitsignup;
var password = req.body.passwordsignup;
var countrysignup = req.body.countrysignup;
var statesignup = req.body.statesignup;
var districtsignup = req.body.districtsignup;
//var a=document.getElementsByName(countrysignup);


    const sqlq='insert into login values ?';
    var values = [
        [username,password,kitsignup,emailsignup,countrysignup,statesignup,districtsignup]
    ];
    db.query(sqlq, [values], function(error, results, fields) {
        if(error)
        {
            console.log("error");
        }
        else{
            console.log("1 row inserted successfully");
            res.redirect('/login'); 
        }
        
                   
    });

},


farmerguide: (req, res) => {
     
    db.query('SELECT * FROM login WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
        if (results.length > 0) {
       //     res.redirect('/userprofile',{url:"/userprofile",title:"WELCOME",uname:results[0].username,pwdd:results[0].password});
       let query1 = "SELECT * FROM usertest WHERE kitno IN(select kitno from login where username = ? AND password = ?)"; 
       db.query(query1, [username, password],(error, result1, fields)=> {
        res.render('farmers_guide.ejs',{title:"WELCOME",showtests:true,data1:results,results1:result1});
    
    });
    
   
            //app.route('/userprofile');
        } else {
            res.send('Incorrect Username and/or Password!');
        }			
    });
},


allschemes: (req, res) => {
     
    db.query('SELECT * FROM login WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
        if (results.length > 0) {
       //     res.redirect('/userprofile',{url:"/userprofile",title:"WELCOME",uname:results[0].username,pwdd:results[0].password});
       let query1 = "SELECT * FROM usertest WHERE kitno IN(select kitno from login where username = ? AND password = ?)"; 
       db.query(query1, [username, password],(error, result1, fields)=> {
        res.render('schemes.ejs',{title:"WELCOME3",showtests:true,data1:results,results1:result1});
    
    });   
       
       
            //app.route('/userprofile');
        } else {
            res.send('Incorrect Username and/or Password!');
        }			
    });
},




flamedetector:(req, res)=>{


}    

};