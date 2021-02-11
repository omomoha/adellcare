"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthorized = exports.hasRole = void 0;
function hasRole(roles) {
    return (req, res, next) => {
        const { role, email } = res.locals;
        if (email === 'admin@adell.care')
            return next();
        if (!role)
            return res.status(403).send();
        if (roles.includes(role)) {
            return next();
        }
        else {
            return res.status(403).send();
        }
    };
}
exports.hasRole = hasRole;
function isAuthorized(opts) {
    return (req, res, next) => {
        const { role, email, uid } = res.locals;
        const { id } = req.params;
        if (email === 'admin@adell.care')
            return next();
        if (opts.allowSameUser && id && uid === id)
            return next();
        if (!role)
            return res.status(403).send();
        if (opts.hasRole.includes(role))
            return next();
        return res.status(403).send();
    };
}
exports.isAuthorized = isAuthorized;
//# sourceMappingURL=authorized.js.map