module.exports = {
    userprofileaccess: (req, res) => {
        var data = require('url').parse(req.url, true).query;
        res.render('userprofile',{uname1:data.username});
        res.redirect('userprofile.ejs');
         
    }
};