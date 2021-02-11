"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routesConfig = void 0;
const controller_1 = require("./controller");
const authenticated_1 = require("../auth/authenticated");
const authorized_1 = require("../auth/authorized");
function routesConfig(app) {
    app.post('/users', authenticated_1.isAuthenticated, authorized_1.isAuthorized({ hasRole: ['admin', 'manager'] }), controller_1.create);
    app.get('/users', [
        authenticated_1.isAuthenticated,
        authorized_1.isAuthorized({ hasRole: ['admin', 'manager'] }),
        controller_1.all
    ]);
    app.get('/users/:id', [
        authenticated_1.isAuthenticated,
        authorized_1.isAuthorized({ hasRole: ['admin', 'manager'], allowSameUser: true }),
        controller_1.get
    ]);
    app.patch('/users/:id', [
        authenticated_1.isAuthenticated,
        authorized_1.isAuthorized({ hasRole: ['admin', 'manager'], allowSameUser: true }),
        controller_1.patch
    ]);
    app.delete('/users/:id', [
        authenticated_1.isAuthenticated,
        authorized_1.isAuthorized({ hasRole: ['admin', 'manager'], allowSameUser: true }),
        controller_1.remove
    ]);
}
exports.routesConfig = routesConfig;
//# sourceMappingURL=routes-config.js.map