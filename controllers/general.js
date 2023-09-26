exports.test = (req,res,next) => {
    res.json({message:req.sessionID});
}