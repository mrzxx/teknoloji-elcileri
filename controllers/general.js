const bcrypt = require('bcrypt');

exports.test = async (req,res,next) => {
    try {
        const hashedPassword = await bcrypt.hash('123', 10);
        res.json({hashedPassword});
    } catch (error) {
        next(error);
    }
    
}