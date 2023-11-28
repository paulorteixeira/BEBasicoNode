import 'dotenv/config';
import 'module-alias/register';
import App from './app';
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
    [
        systemController,
        userController,
        loginController,

    ],
    process.env.PORT as any,
);

app.start();

app.listen(true);
