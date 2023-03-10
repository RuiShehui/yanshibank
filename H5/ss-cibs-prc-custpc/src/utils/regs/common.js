/*
 * @Author: ZhangZhen
 * @Date: 2022-04-25 10:44:13
 * @LastEditTime: 2022-05-24 14:43:48
 * @LastEditors: ZhangZhen
 * @Description: 公共校验规则
 * @FilePath: \webbank-pc\src\utils\regs\common.js
 */
export default {
  /** 账户号码校验 */
  checkAcctNo: /^([a-z]|[A-Z]|[0-9]|\/|-|\?|:|\(|\)|\.|'|,|\+|\s){1,34}$/,
  /** 账户名称校验 */
  checkAcctName: /^(\w|\s|(_)){1,120}$/,
  /** 账户邮箱校验 */
  checkEmailAddress: /^(\w+)@((\w|-)+)\.(\w{2,4})$/,

  // 支持swift的格式
  swiftAcct: /^([a-zA-Z0-9_,/\.-\s()?:'\+])+$/,

  userName: /^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{8-12}$/,
  password: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6-14}$/,
  cmpnNm: /^([\u4e00-\u9fa5]|[a-zA-Z0-9()().]){1,50}$/,
  rgAdr: /^([\u4e00-\u9fa5-]|[a-zA-Z0-9-()()]){1,200}$/,
  idCard: /^([1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3})|([1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x))$/,
  passport: /^[a-zA-Z0-9]{5,17}$/,
  hkmakao: /^[HMhm]{1}([0-9]{10}|[0-9]{8})$/,
  lealPerson: /^([\u4e00-\u9fa5]){1,20}$/,//法人管理员名称
  phoneNum: /^(13|14|15|18|17)[0-9]{9}$/, //ok
  appAmt: /^(?=.*[0-9])\d+(\.\d+)?$/,
  num: /^(0|[1-9]\d*)$/, //非负整数

  loginName: /^(?!.*?_$)[a-zA-Z][a-zA-Z0-9_]{1,34}$/,
  pidCard: /^((1[1-5])|(2[1-3])|(3[1-7])|(4[1-6])|(5[0-4])|(6[1-5])|71|(8[12])|91)\d{4}(((19|20)\d{2}(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(19\d{2}(0[13578]|1[02])31)|(19\d{2}02(0[1-9]|1\d|2[0-8]))|(19([13579][26]|[2468][048]|0[48])0229))\d{3}(\d|X|x)?$/,
  phone: /^(1)[0-9]{10}$/,
  //password: /^((?=.*[0-9].*)(?=.*[A-Z].*)|(?=.*[0-9].*)(?=.*[a-z].*)|(?=.*[A-Z].*)(?=.*[a-z].*)).*$/,
  containsSpace: /^\s+|\s+$|\s/g,
  postId: /^\d{6}$/,
  kMsgCode: /^[0-9]{6}$/,
  viewCode: /[0-9a-zA-Z]{4}/,
  licNo: /^(\d{15}|\d{18})$/,
  cupShp: /^\d{15}$/,
  managementYear: /^[1-9]\d{0,1}$/,
  oprtnPrd: /^[1-9]\d{0,2}$/,

  msgNumber: /^\d{6}$/,
  qq: /\d{5,13}/,
  wechat: /^[a-zA-Z]{1}[a-zA-Z\d_-]{5,19}$/,
  // email:/^(([^<>()\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  email: /^([a-zA-Z0-9]+[_\-\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_\-\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/,
  nickNm: /^[a-zA-Z][0-9a-zA-Z]{5,19}$/,
  hmAdr: /^([\u4e00-\u9fa5]|[a-zA-Z0-9]){1,100}$/,
  fixedPhone: /^\d{3,4}-\d{7,8}$/,
  money: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^[0-9]\.[0-9]([0-9])?$)/, //(^(0){1}$)
  payPwd: /^[0-9]+$/,
  days: /(^[1-9]([0-9]+)?$)/,
  lPwd: /^([0-9]|[a-z]|[A-Z]){1,18}$/,
  mPwd: /^((?=.*[0-9].*)(?=.*[A-Z].*)|(?=.*[0-9].*)(?=.*[a-z].*)|(?=.*[A-Z].*)(?=.*[a-z].*)){1,18}.*}$/,
  hPwd: /^((?=.*[0-9].*)(?=.*[a-z].*)(?=.*[A-Z].*)){1,18}.*}$/,
  orgCode: /^[A-Z0-9\d]{8}\-[A-Z0-9\d]{1}$/, //组织机构代码
  orgCode1: /^[0-9\d]{8}[A-Z0-9\d]{10}$/, //统一社会信用证
  businessCode: /^\d{15}$/, //营业执照
  bankCode: /^(\d{5,21})$/,
  perBankCode: /^(\d{16,19})$/,
  bankNum: /^(\d{1,14})$/, //机构开户行行号
  bankName: /^[\u4e00-\u9fa5()（）]{1,200}$/, //机构开户行名称
  name: /^[\u4e00-\u9fa5]{1,20}$/,
  checkCode: /^\d{6}$/,//验证码6位,
  bank: /^[0-9]*$/,//银行账号
  // identity: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,//身份证
  identity: /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/
};
