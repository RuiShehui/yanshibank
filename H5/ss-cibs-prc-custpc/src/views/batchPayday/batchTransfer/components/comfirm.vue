<template>
  <div class="g-comfirm">
    <div class="g-confirmContent">
      <DetailItem :title="$t('PAYMENT.PAYMENT_ACCOUNT')" :content="(formData.payString)"></DetailItem>
      <DetailItem :title="$t('PAYMENT.FEE_DEDUCTION_ACCOUNT')" :content="(formData.cutString)"></DetailItem>
      <DetailItem :title="$t('PAYMENT.CHARGE_CCY')" :content="monText"></DetailItem>
      <DetailItem
        :title="$t('PAYMENT.APPOINTMENT_DATE')"
        :content="formatDate"
        v-if="formData.checked"
      ></DetailItem>
      <DetailItem
        :title="$t('PAYMENT.RETRY_DEDUCTION')"
        v-if="formData.redebitChecked"
        :content="formData.redebitChecked ?$t('USER_MANAGEMENT.YES')  : $t('USER_MANAGEMENT.NO')"
      ></DetailItem>
      <DetailItem :title="$t('PAYMENT.TOTAL_TRANS')" :content="amount"></DetailItem>
      <DetailItem :title="$t('PAYMENT.TOTAL_AMOUNT')" :content="allMonth"></DetailItem>
      <DetailItem
        :title="$t('PAYMENT.A_LEVEL_AUTHOR')"
        :content="alevelList"
        v-if="alevelList !== ''"
      ></DetailItem>
      <DetailItem
        :title="$t('PAYMENT.B_LEVEL_AUTHOR')"
        :content="blevelList"
        v-if="blevelList !== ''"
      ></DetailItem>
      <DetailItem
        :title="$t('PAYMENT.C_LEVEL_AUTHOR')"
        :content="clevelList"
        v-if="clevelList !== ''"
      ></DetailItem>
    </div>
    <div class="m-table">
      <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" stripe>
        <el-table-column :label="$t('PAYMENT.RECEIVE_ACCOUNT')" prop="debitAcct"></el-table-column>
        <el-table-column :label="$t('PAYMENT.PAYEE_NAME')" prop="debitAcctName"></el-table-column>
        <el-table-column prop="bankName" :label="$t(`PAYMENT.RECEIVE_BANK`)" width="165">
          <template slot-scope="scope">{{scope.row.bankCode}} {{ scope.row.bankName}}</template>
        </el-table-column>
        <el-table-column :label="$t('PAYMENT.TRANSFER_AMOUNT')" prop="amountStr"></el-table-column>
        <el-table-column :label="$t('PAYMENT.POSTSCRIPT')" prop="additionalComment" width="160"></el-table-column>
      </el-table>
      <div class="mt16">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10,20,30,50]"
          :page-size="pageSize"
          layout="total,sizes,prev,pager,next,jumper"
          :total="(total)"
        ></el-pagination>
      </div>
    </div>
    <el-row class="u-btn mt36">
      <v-button type size="w160" @click="back" class="mlr15">{{$t('TRANSFR_INFO.BACK')}}</v-button>
      <v-button
        type="primary"
        size="w160"
        @click="next"
        :loading="btnLoading"
      >{{$t('TRANSFR_INFO.CONFIR')}}</v-button>
    </el-row>
  </div>
</template>

<script>
import mathTools from '@/utils/mathTools.js';
import { copyFileSync } from 'fs';
import { otpDialog } from '@/components/messageBox';
import {
  computeCharge,
  submit,
  transferSubmit,
  auth,
  paydaySubmit
} from '@/api/cashManage';
import { softToken, choosesWay } from '@/components/messageBox';
import { formatMoneyNew } from '@/utils/tools.js';
import {
  removeTransactionDraft,
} from '@/api/paymentRemittance';
let that;
export default {
  props: {
    formDataObj: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  inject: ['scrollToTop', 'entType', 'sendEmail'],
  data() {
    return {
      formData: this.formDataObj,
      tableData: [],
      tata: [],
      payBank: [],
      alevelList: '',
      blevelList: '',
      clevelList: '',
      bthDetailList: [], //???????????????
      mon: 0, //?????????
      monText: 0, //???????????????
      canSubmit: false, //??????????????????
      chequeBook: {},
      flag: false, //????????????????????????
      inputType: 1, //????????????(1:????????????,2:????????????)
      total: null,
      currentPage: 1,
      pageSize: 10,
      loading: false,
      btnLoading: false,
      fileId: '' //?????????id
    };
  },
  computed: {
    formatDate() {
      let date = this.formData.transOutDate;
      if (typeof date !== 'string') {
        if (this.formData.checked) {
          let y = date.getFullYear();
          let m = date.getMonth() + 1;
          m = m < 10 ? '0' + m : m;
          let d = date.getDate();
          d = d < 10 ? '0' + d : d;
          return y + '-' + m + '-' + d;
        }
        return '';
      } else {
        return date;
      }
    },
    amount() {
      let len = 0;
      len = this.formData.tableData && this.formData.tableData.length;
      return `${len}${this.$t('TRANSFR_INFO.PEN')}`;
    },
    allMonth() {
      return `${this.formData.payObject.cur} ${formatMoneyNew(
        this.formData.allMonth
      )}`;
    },
    authInfo() {
      return this.formData.authInfo || [];
    }
  },
  watch: {
    formData: {
      handler(n, oldName) {
        console.log('n-----', n);
        console.log();
        this.fileId = n.fileId;
        if (this.fileId) {
          this.inputType = 2;
        } else {
          this.inputType = 1;
        }
        this.tableData = n.tableData.map((item, index) => {
          if (this.fileId) {
            return {
              bankName: item.bankName, //????????????
              bankCode: item.bankCode, //
              debitAcctName: item.debitAcctName, //s??????
              amount: item.amount, //??????
              amountStr: `${this.formData.cutObject.cur} ${formatMoneyNew(
                item.amount
              )}`,
              debitAcct: item.debitAcct, //????????????
              additionalComment: item.additionalComment //??????
            };
          } else {
            if (item.bankObjec) {
              return {
                bankName: item.bankObjec.label,
                bankCode: item.bankObjec.clearingCode,
                debitAcctName: item.paymentAccount,
                amount: item.payee,
                amountStr: `${this.formData.cutObject.cur} ${formatMoneyNew(
                  item.payee
                )}`,
                debitAcct: item.authorNum,
                additionalComment: item.tips //??????
              };
            } else {
              return {
                bankName: item.bankName,
                bankCode: item.bankCode,
                debitAcctName: item.paymentAccount,
                amount: item.payee,
                amountStr: `${this.formData.cutObject.cur} ${formatMoneyNew(
                  item.payee
                )}`,
                debitAcct: item.authorNum,
                tips: item.tips,
                additionalComment: item.tips //??????
              };
            }
          }
        });
        this.total = n.tableData.length;
        this.computeChargeInit();
        this.AlevelList();
        this.BlevelList();
        this.ClevelList();
      },
      immediate: true,
      deep: true
    }
  },
  filters: {},
  beforeCreate() {
    that = this;
  },
  created() {},
  methods: {
    computeChargeInit() {
      console.log('????????????????????????');
      this.bthDetailList = [];
      let params = {
        details: this.tableData,
        feeCur: this.formData.cutObject.cur,
        tradeType: '01'
      };
      console.log('????????????????????????', params, this.tableData);
      computeCharge(params).then(res => {
        this.mon = res.discountAmt;
        this.monText = ` ${this.formData.payObject.cur} ${res.discountAmt}`;
        console.log('??????????????????', res);
      });
    },
    submitInit(confirm = 'false') {
      let s = this.formData;
      this.btnLoading = true;
      let params = {
        confirm,
        batchNo: '',
        bthDetailList: this.tableData,
        creditAcct: s.payObject.acctNo, // ???/????????????(?????????
        creditAcctBalance: s.payAcctNoMoney, //????????????
        creditAcctName: s.payObject.acctName, //???/???????????????
        creditAcctType: s.payObject.type, //???/?????????????????????
        cur: s.payObject.cur, //??????
        custNo: '', //???????????????
        feeAcct: s.cutObject.acctNo, //?????????????????????
        feeAcctBalance: s.cutPayAcctNoMoney, //???????????????????????????
        feeAcctName: s.cutObject.acctName, //????????????????????????
        feeAcctType: s.cutObject.type, //???????????????????????????
        feeCur: s.cutObject.cur, //???????????????????????????
        fileFlowNum: this.fileId, //????????????
        inputType: this.inputType, //????????????(1:????????????,2:????????????)
        isRetry: s.redebitChecked ? 'Y' : 'N', //????????????(Y:???,N:???)
        isSchedule: s.checked ? 'Y' : 'N', //?????????????????????(Y:???,N:???)
        scheduleDate: this.formatDate, //????????????
        serviceCharge: this.mon, //?????????
        tradeAmount: s.allMonth, //???????????????
        tradeNumber: s.tableData.length, //???????????????
        tradeType: '01' //????????????,01:????????????,02:????????????,03:??????????????????s
      };
      console.log('????????????', params);
      let custNo = sessionStorage.getItem('custNo');
      const { adminEmpower, cuSoleAuthorizerInd } = JSON.parse(
        sessionStorage.getItem('userInfo')
      );
      const entType = localStorage.getItem('entType');
      const tradeInfo = JSON.stringify(params);
      paydaySubmit(params)
        .then(({ body = {}, head = {} }) => {
          console.log('???????????????', head);
          this.btnLoading = false;
          if (head.returnCode == 'OTP000107' && cuSoleAuthorizerInd == '1') {
            choosesWay({
              checkWay: '',
              tradeInfo: tradeInfo,
              flag: '1'
              // status: status
            }).then(() => {
              this.submitInit('true');
            });
          } else if (head.returnCode == 'OTP000107' && entType == '1') {
            // const tradeInfo = JSON.stringify(params);
            softToken({
              softTokenCode: '',
              otpType: '03010501',
              tradeInfo: tradeInfo
              // randomNum:'' 
            }).then(() => {
              this.submitInit('true');
            });
          } else if (head.returnCode == 'COC009970') {
            this.$confirm({
              isIcon: false,
              type: 'warn',
              message: this.$t('PAYMENT.TRANSFER_REPEAT_INT'),
              btnText: {
                cancleText: this.$t('COMMON.CANCEL'),
                confirmText: this.$t('COMMON.CONFIRM')
              },
              countDown: true,
              isCancle: true
            })
              .then(() => {
                this.submitInit('true');
              })
              .catch(() => {
                this.btnLoading = false;
              });
          } else {
            if (body) {
              let res = Object.assign({ ...head, ...body });
              this.sendEmail(this.formData);
              this.$emit('next', res);
               if (this.formData.hasOwnProperty('tdId')) {
                removeTransactionDraft({
                  tdId: this.formData.tdId
                }).then({});
              }
            }
            
          }
        })
        .catch(err => {
          this.btnLoading = false;
        });
    },
    AlevelList() {
      if (this.authInfo) {
        if ('AlevelList' in this.authInfo) {
          if (this.authInfo.AlevelList && this.authInfo.AlevelList.length > 0) {
            let s = this.authInfo.AlevelList;
            s.map((item, index) => {
              if (this.alevelList == '') {
                this.alevelList = item.name;
              } else {
                this.alevelList = this.alevelList + ',' + item.name;
              }
            });
          }
        }
      }
    },
    BlevelList() {
      if (this.authInfo) {
        if ('BlevelList' in this.authInfo) {
          if (this.authInfo.BlevelList && this.authInfo.BlevelList.length > 0) {
            let s = this.authInfo.BlevelList;
            s.map((item, index) => {
              if (this.blevelList == '') {
                this.blevelList = item.name;
              } else {
                this.blevelList = this.blevelList + ',' + item.name;
              }
            });
          }
        }
      }
    },
    ClevelList() {
      if (this.authInfo) {
        if ('ClevelList' in this.authInfo) {
          if (this.authInfo.ClevelList && this.authInfo.ClevelList.length > 0) {
            let s = this.authInfo.ClevelList;
            s.map((item, index) => {
              if (this.clevelList == '') {
                this.clevelList = item.name;
              } else {
                this.clevelList = this.clevelList + ',' + item.name;
              }
            });
          }
        }
      }
    },
    back() {
      this.$emit('back');
    },
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    next() {
      this.submitInit();
    }
  }
};
</script>

<style lang="scss" scoped>
.el-row {
  margin-left: 27%;
}
.content {
  width: 250px;
}
.u-btn {
  display: flex;
  margin-left: 35%;
}
.g-confirmContent {
  margin-left: 16%;
  width: 888px;
  display: flex;
  flex-wrap: wrap;
  // margin-left: 64px;
  .detailItem:not(:last-child) {
    margin-bottom: 16px;
  }
}
.m-table {
  margin-top: 24px;
}
::v-deep .el-table th.el-table__cell > .cell {
  padding: 0 24px !important;
}

::v-deep .el-table .el-table__cell {
  padding: 0 !important;
}
::v-deep .el-table td.el-table__cell div {
  padding: 0 24px !important;
}
</style>
