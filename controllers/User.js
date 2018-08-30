module.exports = {
    create:function(req, res, next){
        console.log("came to create user");
        console.log("req.body", req.body);
        res.json(req.body);
    }
}