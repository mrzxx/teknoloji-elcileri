
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

/*
const Auth = async (req,res,next) => {

    try {
        const userDocRef = doc(db, 'userdata', req.headers['authorization']);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
            // Belge bulundu, belge verilerini alabiliriz
            next();
        } else {
            const error = new Error('Kullanıcı girişinde hata!');
            error.status = 404;  // İsteğe bağlı: Hata durumu kodunu belirtebiliriz
            throw error;
        }
    } catch (error) {
        next(error);
    }
};
*/
module.exports = Auth;