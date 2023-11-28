import 'dotenv/config';
import 'module-alias/register';
import App from './app';

import SocketFactory from './utils/services/app-ws';
import UserController from './resources/controllers/user/userController';
import SystemStatusController from './resources/controllers/system/systemstatus';
import LoginController from './resources/controllers/login/loginController';

const userController = new UserController();
const systemController = new SystemStatusController();
const loginController = new LoginController();

userController.initialiseRoutes();
systemController.initialiseRoutes();
loginController.initialiseRoutes();

const app = new App(
    [systemController, userController, loginController],
    process.env.PORT as any,
);

app.start();

app.listen(false);

const server = require('http').createServer(app.express);
const sf = new SocketFactory(server);
sf.onConnection();

server.listen(process.env.PORT, () =>
    console.log(`WebSocket running on port :${process.env.PORT}`),
);
