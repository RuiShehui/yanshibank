/**
 * route-info-map-list
 */
const routeInfoList = [{
    url: '/customerManagement/customerQueryTrsSet',
    urlMap: [
      '/customerManagement/customerQueryTrsSet',
      '/customerManagement/trsAuSettings',
      '/customerManagement/trsAuSettings/detail',
    ]
  },
  {
    url: '/businessMangament/epsbusiness',
    urlMap: [
      '/businessMangament/epsbusiness',
      '/epsbusiness/add',
      '/epsbusiness/edit',
      '/epsbusiness/modify',
      '/businessMangament/epsbusiness/add',
      '/businessMangament/epsbusiness/edit',
      '/businessMangament/epsbusiness/detail',
    ]
  },
  {
    url: '/businessMangament/exception',
    urlMap: [
      '/businessMangament/exception',
    ],
  },
  {
    url: '/customerManagement/customerQueryTemMain',
    urlMap: [
      '/customerManagement/customerQueryTemMain',
      '/customerManagement/authTemplateMaintain',
      '/customerManagement/authTemplateMaintain/add',
      '/customerManagement/authTemplateMaintain/addConfirm',
      '/customerManagement/authTemplateMaintain/detail',
      '/customerManagement/authTemplateMaintain/edit',
      '/customerManagement/authTemplateMaintain/editConfirm',
    ]
  },
  {
    url: '/customerManagement/customerQueryBillMain',
    urlMap: [
      '/customerManagement/customerQueryBillMain',
      '/customerManagement/billMainrenace',
      '/customerManagement/billMainrenace/add',
      '/customerManagement/billMainrenace/addConfirm',
      '/customerManagement/billMainrenace/modify',
      '/customerManagement/billMainrenace/modifyConfirm',
    ],
  },
  
 
  {
    url: '/customerManagement/customerQueryOpen',
    urlMap: [
      '/customerManagement/customerQueryOpen',
      '/customerManagement/customerAccountOpen',
      '/customerManagement/customerAccountOpen/confirm',
    ],
  },
  
  {
    url: '/businessMangament/merchantsMaintain',
    urlMap: [
      '/merchants',
      '/merchants/add',
      '/businessMangament/merchantsMaintain',
      '/businessMangament/merchantMaintain/add',
      '/businessMangament/merchantMaintain/edit',
      '/businessMangament/merchantMaintain/detail',
      '/businessMangament/merchantMaintain/operate-confirm',
    ],
  },
  {
    url: '/systemManagement/roleManagement',
    urlMap: [
      '/systemManagement/roleManagement',
      '/roleManagement/add',
      '/roleManagement/ditail',
      '/roleManagement/edit',
    ]
  },
  {
    url: '/customerManagement/customerQueryCusMain',
    urlMap: [
      '/customerManagement/customerQueryCusMain',
      '/customerManagement/customerInfoMaintain',
      '/customerManagement/customerInfoMaintain/confirm',
    ],
  },
  {
    url: '/systemManagement/mechanism',
    urlMap: [
      '/systemManagement/mechanism',
      '/mechanism/add',
      '/mechanism/edit',
      '/mechanism/ditail',
      '/mechanism/submit',
    ],
  },
  {
    url: '/customerManagement/customerQueryUserMain',
    urlMap: [
      '/customerManagement/customerQueryUserMain',
      '/customerManagement/userMaintain',
      '/customerManagement/userMaintain/add',
      '/customerManagement/userMaintain/addConfirm',
      '/customerManagement/userMaintain/edit',
      '/customerManagement/userMaintain/editConfirm',
      '/customerManagement/userMaintain/detail',
    ],
  },
  {
    url: '/systemManagement/menuManagement',
    urlMap: [
      '/systemManagement/menuManagement',
      '/menuManagement/add',
      '/menuManagement/edit',
      '/menuManagement/ditail',
      '/menuManagement/submit',
    ],
  },
  {
    url: '/businessMangament/qouta',
    urlMap: [
      '/businessMangament/qouta',
      '/businessMangament/addBankQuota',
      '/businessMangament/qouta-detail',
    ]
  },
  {
    url: '/businessMangament/custQuotaManage',
    urlMap: [
      '/businessMangament/custQuotaManage',
    ]
  },
  {
    url: '/systemManagement/userManagement',
    urlMap: [
      '/systemManagement/userManagement',
      '/userManagement/add',
      '/userManagement/edit',
      '/userManagement/ditail',
      '/userManagement/submit',
    ],
  },
  {
    url: '/systemManagement/weatherSetting',
    urlMap: [
      '/systemManagement/weatherSetting',
    ],
  },
  {
    url: '/businessMangament/announcement',
    urlMap: [
      '/businessMangament/announcement',
      '/businessMangament/announcement/add',
      '/businessMangament/announcement/add-confirm',
      '/businessMangament/announcement/detail',
    ],
  },
  {
    url: '/customerManagement/customerQueryCusPrint',
    urlMap: [
      '/customerManagement/customerQueryCusPrint',
      '/customerManagement/customerEnvelopePrint',
    ],
  },
   /* 2022-10-08?????? ????????????????????????*/ 
   {
    url: '/customerManagement/passwordReset',
    urlMap:[
      '/customerManagement/passwordReset'
    ]
  },
  {
    url: '/customerManagement/customerWelcomePrint',
    urlMap: [
      '/customerManagement/customerWelcomePrint',
    ],
  },
  {
    url: '/customerManagement/registraTionProcessing',
    urlMap: [
      '/customerManagement/registraTionProcessing',
    ],
  },
  {
    url: '/businessMangament/discount',
    urlMap: [
      '/businessMangament/discount',
      '/businessMangament/discount/add',
      '/businessMangament/discount/edit',
      '/businessMangament/discount/confirm',
      '/businessMangament/discount/detail',
    ]
  },
  {
    url: '/customerManagement/customerQueryThird',
    urlMap: [
      '/customerManagement/customerQueryThird',
      '/customerManagement/registerThird',
      '/customerManagement/registerThird/detail',
      '/customerManagement/registerThird/add-inside-transfer',
      '/customerManagement/registerThird/edit-inside-transfer',
      '/customerManagement/registerThird/add-fast-transfer',
      '/customerManagement/registerThird/edit-fast-transfer',
      '/customerManagement/registerThird/add-local-fast',
      '/customerManagement/registerThird/edit-local-fast',
      '/customerManagement/registerThird/add-elec-transfer',
      '/customerManagement/registerThird/edit-elec-transfer',
    ],
  },
  {
    url: '/customerManagement/customerQueryCusView',
    urlMap: [
      '/customerManagement/customerQueryCusView',
      '/customerManagement/customerInfoView',
      '/customerManagement/customerInfoView/detail',
    ]
  },
  {
    url: '/businessMangament/businessStart',
    urlMap: [
      '/businessMangament/businessStart',
      '/businessMangament/businessStart/setup',
    ]
  },
  {
    url: '/customerManagement/customerQuerySerGen',
    urlMap: [
      '/customerManagement/customerQuerySerGen',
      '/customerManagement/despostiReservation',
      '/customerManagement/despostiReservation/add',
      '/customerManagement/despostiReservation/confirm',
    ],
  },
  {
    url: '/customerManagement/customerQueryDel',
    urlMap: [
      '/customerManagement/customerQueryDel',
      '/customerManagement/customerAccountDel',
    ],
  },
  // ????????????
  {
    url: '/authorizationCenter/mySubmit',
    urlMap: [
      '/authorizationCenter/mySubmit',
      '/mySubmit/ditail',
    ]
  },
  // ????????????
  {
    url: '/authorizationCenter/subjectAuthorization',
    urlMap: [
      '/authorizationCenter/subjectAuthorization',
      '/authorizationCenter/subjectAuthorization/ditail',
      '/authorziationSettingReminder',
    ]
  },
  // ?????????????????????????????????????????????
  {
    url: '/customerManagement/customerAccountQuery',
    urlMap: [
      '/customerManagement/customerQueryOpen',
      '/customerManagement/customerQueryDel',
      '/customerManagement/customerQueryCusMain',
      '/customerManagement/customerQueryUserMain',
      '/customerManagement/customerQueryCusView',
      '/customerManagement/customerQueryTemMain',
      '/customerManagement/customerQueryCusPrint',
      '/customerManagement/customerWelcomePrint',
      '/customerManagement/customerQuerySerGen',
      '/customerManagement/customerQueryBillMain',
      '/customerManagement/customerQueryThird',
      '/customerManagement/customerQueryTrsSet',
    ],
  },

  {
    url: '/customerManagement/customerQueryCusView',
    urlMap: [
      '/customerManagement/customerQueryCusView'
    ],
  },
  {
    url: '/statiscal-query/apply-checkbook',
    urlMap: [
      '/statiscal-query/apply-checkbook'
    ],
  },
  {
    url: '/statiscal-query/internet-bank-customer-statistics',
    urlMap: [
      '/statiscal-query/internet-bank-customer-statistics'
    ],
  },
  {
    url: '/statiscal-query/internet-dubious-transfer',
    urlMap: [
      '/statiscal-query/internet-dubious-transfer'
    ],
  },
  {
    url: '/statiscal-query/compony-customer-salesman',
    urlMap: [
      '/statiscal-query/compony-customer-salesman'
    ],
  },
  {
    url: '/statiscal-query/not-enabled-banking',
    urlMap: [
      '/statiscal-query/not-enabled-banking'
    ],
  },
  {
    url: '/statiscal-query/customer-open-statement',
    urlMap: [
      '/statiscal-query/customer-open-statement'
    ],
  },
  {
    url: '/statiscal-query/customer-transaction-report',
    urlMap: [
      '/statiscal-query/customer-transaction-report'
    ],
  },
  {
    url: '/statiscal-query/change-customer-info',
    urlMap: [
      '/statiscal-query/change-customer-info'
    ],
  },
  {
    url: '/statiscal-query/reset-password',
    urlMap: [
      '/statiscal-query/reset-password',
    ],
  },
    //2022-10-24 ?????? ????????????
    {
      url:'/customerManagement/applicationSpecial',
      urlMap:[
        '/customerManagement/applicationSpecial',      
      ]
    },
    {
      url:'/customerManagement/specialManagement',
      urlMap:[
        '/customerManagement/specialManagement',
        
      ]
    },
  {
    url: '/statiscal-query/psd-add-reset-error',
    urlMap: [
      '/statiscal-query/psd-add-reset-error'
    ],
  },
  {
    url: '/statiscal-query/compony-customer-destory',
    urlMap: [
      '/statiscal-query/compony-customer-destory'
    ],
  },
  {
    url: '/statiscal-query/internet-bank-high-risk',
    urlMap: [
      '/statiscal-query/internet-bank-high-risk'
    ],
  },
  {
    url: '/statiscal-query/cibs-and-t24-error',
    urlMap: [
      '/statiscal-query/cibs-and-t24-error'
    ],
  },
  {
    url: '/statiscal-query/high-risk-transfer',
    urlMap: [
      '/statiscal-query/high-risk-transfer'
    ],
  },
  {
    url: '/statiscal-query/webbank-psd-created',
    urlMap: [
      '/statiscal-query/webbank-psd-created'
    ],
  },
  {
    url: '/statiscal-query/webbank-transfer-data',
    urlMap: [
      '/statiscal-query/webbank-transfer-data'
    ],
  },
  {
    url: '/statiscal-query/webbank-transfer-data',
    urlMap: [
      '/statiscal-query/webbank-transfer-data'
    ],
  },
  {
    url: '/statiscal-query/isreport-bank-transfer',
    urlMap: [
      '/statiscal-query/isreport-bank-transfer'
    ],
  },
  {
    url: '/statiscal-query/pay-bill-rec',
    urlMap: [
      '/statiscal-query/pay-bill-rec'
    ],
  },
  {
    url: '/statiscal-query/pay-bill-rec-detail',
    urlMap: [
      '/statiscal-query/pay-bill-rec-detail'
    ],
  },
  {
    url: '/statiscal-query/op-logs',
    urlMap: [
      '/statiscal-query/op-logs'
    ],
  },
  /* 2022-01-04????????????????????? */
  {
    url: '/statiscal-query',
    urlMap: [
      '/statiscal-query',
      // '/statiscal-query/op-logs',
      // '/statiscal-query/internet-bank-customer-statistics', // ????????????????????????????????????
      // '/statiscal-query/apply-checkbook', // ???????????????
      // '/statiscal-query/internet-dubious-transfer', // ????????????????????????????????????
      // '/statiscal-query/compony-customer-salesman', // ????????????????????????
      // '/statiscal-query/not-enabled-banking', // ???????????????????????????
      // '/statiscal-query/customer-open-statement', // ????????????????????????
      // '/statiscal-query/customer-transaction-report', // ????????????????????????
      // '/statiscal-query/change-customer-info', // ????????????????????????
      // '/statiscal-query/reset-password', // ??????????????????
      // '/statiscal-query/psd-add-reset-error', // ????????????
      // '/statiscal-query/compony-customer-destory', // ????????????????????????
      // '/statiscal-query/internet-bank-high-risk', // ?????????????????????????????????
      // '/statiscal-query/cibs-and-t24-error', // CIBS???t24?????????????????????
      // '/statiscal-query/high-risk-transfer', // ???????????????????????????
      // '/statiscal-query/webbank-psd-created', // ??????????????????????????????
      // '/statiscal-query/webbank-transfer-data', // ????????????????????????
      // '/statiscal-query/isreport-bank-transfer', // ???????????????????????????????????????
      // '/statiscal-query/pay-bill-rec', // ??????????????????????????????
    ]
  },
  
  {
    url: '/statiscal-query/customer-open-statement',
    urlMap: [
      '/statiscal-query/customer-open-statement',
      '/customer-open-statement/user-detail',
    ]
  },

  // ????????????
  {
    url: '/businessMangament/accountOpening',
    urlMap: [
      '/businessMangament/accountOpening',
    ],
  },
  {
    url: '/businessMangament/accountOpening/investmentAccountApplyQuery',
    urlMap: [
      '/businessMangament/accountOpening/investmentAccountApplyQuery',
      '/businessMangament/accountOpening/investmentAccountApplyQuery/detail',
    ],
  },
  {
    url: '/businessMangament/accountOpening/accountOpeningReportQuery',
    urlMap: [
      '/businessMangament/accountOpening/accountOpeningReportQuery',
      '/businessMangament/accountOpening/accountOpeningReportQuery/detail',
    ],
  },
  {
    url: '/businessMangament/accountOpening/investmentAccountApplyQuery',
    urlMap: [
      '/businessMangament/accountOpening/investmentAccountApplyQuery',
      '/businessMangament/accountOpening/investmentAccountApplyQuery/detail',
    ],
  },
  {
    url: '/businessMangament/accountOpening/accountOpeningCheck',
    urlMap: [
      '/businessMangament/accountOpening/accountOpeningCheck',
      '/businessMangament/accountOpening/accountOpeningCheck/detail',
      '/businessMangament/accountOpening/accountOpeningCheck/recheckDetail',
      '/businessMangament/accountOpening/accountOpeningCheck/confirmDetail'
    ],
  },
  {
    url: '/businessMangament/accountOpening/investmentAccountOpeningCheck',
    urlMap: [
      '/businessMangament/accountOpening/investmentAccountOpeningCheck',
      '/businessMangament/accountOpening/investmentAccountOpeningCheck/detail',
    ],
  },
  {
    url: '/businessMangament/accountOpening/invitationCodeManagement',
    urlMap: [
      '/businessMangament/accountOpening/invitationCodeManagement',
      '/businessMangament/accountOpening/invitationCodeManagement/detail',
      '/businessMangament/accountOpening/invitationCodeManagement/add',
      '/businessMangament/accountOpening/invitationCodeManagement/update',
    ],
  },
  {
    url: '/businessMangament/accountOpening/queryATMStatus',
    urlMap: [
      '/businessMangament/accountOpening/queryATMStatus',
    ],
  },
  {
    url: '/businessMangament/accountOpening/queryEbankStatus',
    urlMap: [
      '/businessMangament/accountOpening/queryEbankStatus',
    ],
  },
  {
    url: '/businessMangament/accountOpening/reportQuery',
    urlMap: [
      '/businessMangament/accountOpening/reportQuery',
    ],
  },
];

export default routeInfoList;