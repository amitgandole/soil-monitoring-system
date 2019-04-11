module.exports = {
    getHomePage: (req, res) => {
        let query = "SELECT data,DATE_FORMAT(time,'%r') AS time1,DAYNAME(time) AS day1, DATE_FORMAT(time, '%d-%m-%Y') AS date1 FROM `data` order by id desc"; // query database to get all the players

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('index.ejs', {
                title: "Welcome to Socka | View Players"
                ,data: result
            });
        });
    },
};