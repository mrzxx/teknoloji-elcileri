
const Auth = async (req,res,next) => {
    // Oturum kontrolü yapan middleware
   try {
       if (!req.session || !req.session.user) {
           const error = new Error('Unauthorized: No session found');
           error.status = 401;  // İsteğe bağlı: Hata durumu kodunu belirtebiliriz
           throw error;
       }
       next();
   } catch (error) {
       next(error);
   }
   
}

module.exports = Auth;