// Örneğin yetki kontrolünü sağlayan bir middleware

const Role = require('../models/roles');
const User = require('../models/users');
const Permission = require('../models/permissions');
const RoleHasPermission = require('../models/role_has_permissions');

const permissionControl = (permID) => {
    return async (req,res,next) => {
        try {
            const user = await User.findOne({
                where: { id: 1 },
                include: [Role]  // User modeli ile Role modelini ilişkilendir
            });
            const roleId = 1;//İSTEĞE ERİŞEBİLMEK İÇİN GEREKLİ ROL KODU
            let perm = await Role.findOne({where: { id: user.role.id },
                include: [
                    {
                    model: Permission,
                    through: RoleHasPermission,
                    attributes: ['id','name'] // İhtiyaca göre yetki özelliklerini belirtebilirsiniz
                    }
                ]
                });
                for (let index = 0; index < perm.permissions.length; index++) {
                    const element = perm.permissions[index];
                    if(element.id == permID){
                        next();
                        break;
                    }else{
                        res.status(401).json({message:"Unauthorized proccess.You have been blocked by the server."})
                        break;
                    }
                }
        } catch (error) {
            next(error);
        }
    }
};

module.exports = permissionControl;