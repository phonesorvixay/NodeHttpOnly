import express from 'express';
import { UserConroller } from '../controllers/user.controller';
import { AuthorizeController } from '../controllers/authorize.controller';
import { CategoryController } from '../controllers/category.controller';
import { EAuthorize, ECategory, EUser } from '../services/method';

const app = express();

//<=== Login ===>
app.post(EAuthorize.login, AuthorizeController.logIn);

//<=== User ===>
app.post(EUser.add, UserConroller.add);
app.post(EUser.active, AuthorizeController.checkAuthorize, UserConroller.active);
app.post(EUser.update, AuthorizeController.checkAuthorize, UserConroller.update);
app.post(EUser.changePassword, AuthorizeController.checkAuthorize, UserConroller.changePassword);
app.post(EUser.delete, AuthorizeController.checkAuthorize, UserConroller.delete);
app.post(EUser.listOne, AuthorizeController.checkAuthorize, UserConroller.listOne);
app.post(EUser.listAll, AuthorizeController.checkAuthorize, UserConroller.listAll);
app.post(EUser.listPage, AuthorizeController.checkAuthorize, UserConroller.listPage);

//<=== Category ===>
app.post(ECategory.add, AuthorizeController.checkAuthorize, CategoryController.add)
app.post(ECategory.update, AuthorizeController.checkAuthorize, CategoryController.update)
app.post(ECategory.delete, AuthorizeController.checkAuthorize, CategoryController.delete)
app.post(ECategory.listOne, AuthorizeController.checkAuthorize, CategoryController.listOne)
app.post(ECategory.listAll, AuthorizeController.checkAuthorize, CategoryController.listAll)
app.post(ECategory.listPage, AuthorizeController.checkAuthorize, CategoryController.listPage)

export = app;

