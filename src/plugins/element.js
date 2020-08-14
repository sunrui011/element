import Vue from 'vue'
import { Button,Form,FormItem,Input,Container,Header,Aside,Main } from 'element-ui'
import { Message } from 'element-ui'
import {Menu,Submenu,MenuItem,Breadcrumb,BreadcrumbItem,Card,
Row,Col,Table,TableColumn,Switch,Tooltip,Pagination,Dialog
} from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
// 挂载弹框组件   每一个组件都可以通过this.$message
Vue.prototype.$message = Message
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Dialog)


