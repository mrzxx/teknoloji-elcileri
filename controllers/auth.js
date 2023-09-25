exports.get_register_page = async (req,res,next) => {
    try {
        req.session.user = 1;
        res.status(200).json({message:"Testing..."});
    } catch (error) {
        next(error);
    }
}

exports.test = async (req,res,next) => {
    try {
        res.status(200).json({message:"Testing..."});
    } catch (error) {
        next(error);
    }
}