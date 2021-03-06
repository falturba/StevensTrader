import getProduct from './getProduct'
import getProducts from './getProducts'
import login from './login'
import postProduct from './postProduct'
import signup from './signup'
import getProductsForIOS from './getProductsForIOS'
import getUserProductsForIOS from './getUserProductsForIOS'
import changePassword from './changePassword'
import userManagment from './UserManagment'
import auction from './auction'
import itemsManagment from './itemsmanagment'
export function initServices(app){
  console.log("init service...")
  app.use('/services',getProduct)
  app.use('/services',getProducts)
  app.use('/services',login)
  app.use('/services',postProduct)
  app.use('/services',signup)
  app.use('/services',getProductsForIOS)
  app.use('/services',getUserProductsForIOS)
  app.use('/services',changePassword)
  app.use('/services',userManagment)
  app.use('/services',auction)
  app.use('/services',itemsManagment)
}


