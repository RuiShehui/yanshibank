<template>
  <div class="u-basicInfo-wapper">
    <el-form ref="basicInfoRef" :model="basicInfoForm" :rules="rules" label-width="auto">
      <el-form-item :label="$t('USER_MANAGEMENT.USER_TYPE')" prop="userType" style="margin-top: 24px">
        <el-radio-group
          :disabled="basicInfoForm.userType === '1'"
          v-model="basicInfoForm.userType"
          style="margin-top: 11px"
          @change="changeRadio"
        >
          <el-radio disabled style="margin-left: 11px" label="1">{{$t('USER_MANAGEMENT.ADMINISTRATOR')}}</el-radio>
          <el-radio label="3">{{$t('USER_MANAGEMENT.REPORTER')}}</el-radio>
          <el-radio label="2">{{$t('USER_MANAGEMENT.AUTHORIZER')}}</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item :label="$t('USER_MANAGEMENT.USER_CHINESE_NAME')" prop="userChsName">
        <el-input
          :disabled="roleFlag"
          maxlength="120"
          @blur="blurChange"
          v-model="basicInfoForm.userChsName"
          :placeholder="$t('COMMON.PLEASE_INPUT_SOMETHING',{
            input:$t('USER_MANAGEMENT.USER_CHINESE_NAME')
          })"
        ></el-input>
      </el-form-item>
      <el-form-item :label="$t('USER_MANAGEMENT.USER_ENGLISH_NAME')" prop="userEglsName">
        <el-input disabled v-model="basicInfoForm.userEglsName"  :placeholder="$t('COMMON.PLEASE_INPUT_SOMETHING',{
            input:$t('USER_MANAGEMENT.USER_ENGLISH_NAME')
          })"></el-input>
      </el-form-item>
      <el-form-item :label="$t('USER_MANAGEMENT.USER_TYPE')" prop="cardType" @change="cardTypeChange">
        <el-select disabled v-model="basicInfoForm.cardType" filterable :placeholder="$t('COMMON.PLEASE_SELECT')">
          <el-option
            v-for="(item,index) in certTypeList"
            :key="index"
            :label="item.certType"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('USER_MANAGEMENT.USER_NUMBER')" prop="cardNoBrack">
        <el-row class="u-rowStyle flexsb">
          <el-input
            disabled
            maxlength="34"
            minlength="1"
            v-model="basicInfoForm.cardNoHead"
            :placeholder="$t('COMMON.PLEASE_INPUT_SOMETHING',{
            input:$t('USER_MANAGEMENT.USER_NUMBER')
          })"
          ></el-input>
          <span style="font-size: 20px" v-if="basicInfoForm.cardType === 'HKID'">???</span>
          <el-input
            v-if="basicInfoForm.cardType === 'HKID'"
            disabled
            class="u-input1"
            maxlength="1"
            minlength="1"
            onkeyup="value=value.replace(/[^\a-\z\A-\Z0-9 ]/g,'')"
            v-model="basicInfoForm.cardNoBrack"
            placeholder
          ></el-input>
          <span style="font-size: 20px" v-if="basicInfoForm.cardType === 'HKID'">???</span>
        </el-row>
      </el-form-item>
      <el-form-item :label="$t('USER_MANAGEMENT.USER_STATUS')" prop="status">
        <el-radio-group
          :disabled="roleFlag"
          v-model="basicInfoForm.status"
          style="margin-top: 11px"
        >
          <el-radio style="margin-left: 11px" label="1">{{$t('USER_MANAGEMENT.ENABLE')}}</el-radio>
          <el-radio label="0">{{$t('USER_MANAGEMENT.DEACTIVATE')}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="basicInfoForm.status === '0'" label prop="revokeReason">
        <el-input type="textarea" v-model="basicInfoForm.revokeReason" style="margin-bottom: 20px" />
      </el-form-item>
      <el-form-item v-if="entryClerkFlag" :label="$t('USER_MANAGEMENT.AUTHORIZATION_LEVEL')" prop="empowerGroup">
        <el-select :disabled="userFlag" v-model="basicInfoForm.empowerGroup"           :placeholder="$t('COMMON.PLEASE_SELECT_SOMETHING',{
            select:$t('USER_MANAGEMENT.AUTHORIZATION_LEVEL')
          })">
          <el-option value="A" label="A"></el-option>
          <el-option value="B" label="B"></el-option>
          <el-option value="C" label="C"></el-option>
          <el-option value="0" :label="$t('USER_MANAGERMENT.NONE')"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('USER_MANAGEMENT.FA')" prop="tfaStatus">
        <el-input v-model="basicInfoForm.tfaStatusName" disabled></el-input>
      </el-form-item>
      <el-form-item :label="$t('USER_MANAGEMENT.ONEC_ATHOR')" prop="cuSoleAuthorizerInd">
        <el-radio-group
          v-model="basicInfoForm.cuSoleAuthorizerInd"
          style="margin-top: 11px"
          disabled
        >
          <el-radio style="margin-left: 11px" label="1">{{$t('USER_MANAGEMENT.OPEN')}}</el-radio>
          <el-radio label="0">{{$t('USER_MANAGEMENT.CLOSE')}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="$t('USER_MANAGEMENT.USER_ADDRESS')" prop="cardArea">
        <el-select
          disabled
          v-model="basicInfoForm.cardArea"
          filterable
         :placeholder="$t('COMMON.PLEASE_SELECT_SOMETHING',{select:$t('USER_MANAGEMENT.USER_ADDRESS')})"
          @change="cardAreaChange"
        >
          <el-option
            v-for="(item,index) in cardAreaList"
            :key="index"
            :label="item.fiedlDescrible"
            :value="item.fieldValue"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('USER_MANAGEMENT.BIRTHDAY')" prop="birthday">
        <el-date-picker
          v-model="basicInfoForm.birthday"
          type="date"
          value-format="yyyy-MM-dd"
         :placeholder="$t('COMMON.PLEASE_SELECT_SOMETHING',{select:$t('USER_MANAGEMENT.BIRTHDAY')})"
        ></el-date-picker>
      </el-form-item>
      <el-form-item :label="$t('USER_MANAGEMENT.USER_PHONE')">
        <el-row class="u-rowStyle flexsb">
          <el-input
            :disabled="roleFlag"
            class="u-input1"
            maxlength="4"
            onkeyup="value=value.replace(/[^\d]/g,'')"
            v-model="basicInfoForm.countryCode"
            :placeholder="$t('USER_MANAGEMENT.COUNTRY_NUMBER')"
            @input="change($event)"
          ></el-input>
          <div class="u-line">-</div>
          <el-input
            :disabled="roleFlag"
            class="u-input1"
            maxlength="10"
            onkeyup="value=value.replace(/[^\d]/g,'')"
            v-model="basicInfoForm.areaCode"
           :placeholder="$t('USER_MANAGEMENT.LOCAL_NUMBER')"
            @input="change($event)"
          ></el-input>
          <div class="u-line">-</div>
          <el-input
            :disabled="roleFlag"
            class="u-input2"
            mixlength="8"
            maxlength="11"
            onkeyup="value=value.replace(/[^\d]/g,'')"
            v-model="basicInfoForm.contactPhoneNo"
            :placeholder="$t('USER_MANAGEMENT.CODE')"
            @input="change($event)"
          ></el-input>
        </el-row>
      </el-form-item>

      <el-form-item :label="$t('USER_MANAGEMENT.USER_PHONE_TWO')">
        <el-row class="u-rowStyle flexsb">
          <el-input
            :disabled="roleFlag"
            class="u-input1"
            maxlength="4"
            onkeyup="value=value.replace(/[^\d]/g,'')"
            v-model="basicInfoForm.countryCodeTow"
            :placeholder="$t('USER_MANAGEMENT.COUNTRY_NUMBER')"
            @input="change($event)"
          ></el-input>
          <div class="u-line">-</div>
          <el-input
            :disabled="roleFlag"
            class="u-input1"
            maxlength="4"
            onkeyup="value=value.replace(/[^\d]/g,'')"
            v-model="basicInfoForm.areaCodeTow"
             :placeholder="$t('USER_MANAGEMENT.LOCAL_NUMBER')"
            @input="change($event)"
          ></el-input>
          <div class="u-line">-</div>
          <el-input
            :disabled="roleFlag"
            class="u-input2"
            mixlength="8"
            maxlength="11"
            onkeyup="value=value.replace(/[^\d]/g,'')"
            v-model="basicInfoForm.contactPhoneNoTow"
            :placeholder="$t('USER_MANAGEMENT.CODE')"
            @input="change($event)"
          ></el-input>
        </el-row>
      </el-form-item>

      <el-form-item :label="$t('USER_MANAGEMENT.USER_EMAIL')" prop="email">
        <el-input :disabled="roleFlag" v-model="basicInfoForm.email" :placeholder="$t('COMMON.PLEASE_INPUT_SOMETHING',{
          input:$t('USER_MANAGEMENT.USER_SMS_ADDRESS')
        })"></el-input>
      </el-form-item>

      <el-form-item :label="$t('USER_MANAGEMENT.SMS')">
        <el-row class="u-rowStyle flexsb">
          <el-form-item prop="countryArea">
            <el-input
              disabled
              class="u-input3"
              maxlength="4"
              v-model="basicInfoForm.countryArea"
             :placeholder="$t('USER_MANAGEMENT.USER_COUNTRY')"
              @input="change($event)"
            ></el-input>
          </el-form-item>
          <div class="u-line">-</div>
          <el-form-item prop="mobileNo">
            <el-input
              disabled
              style="width:160px !important;"
              mixlength="8"
              maxlength="11"
              v-model="basicInfoForm.mobileNo"
              onkeyup="value=value.replace(/[^\d\-]/g, '')"
              ref="mobileNo"
             :placeholder="$t('USER_MANAGEMENT.PHONE_NUMBER')"
              @input="change($event)"
            ></el-input>
          </el-form-item>
        </el-row>
      </el-form-item>
      <el-form-item :label="$t('USER_MANAGEMENT.USER_SMS_ADDRESS')" prop="mailAddress">
        <el-input :disabled="roleFlag" v-model="basicInfoForm.mailAddress" :placeholder="$t('COMMON.PLEASE_INPUT_SOMETHING',{
          input:$t('USER_MANAGEMENT.USER_SMS_ADDRESS')
        })"></el-input>
      </el-form-item>
      <el-form-item style="margin-bottom: 0">
        <div class="u-newBtn">
          <v-button class="mr16" @click="back">{{$t('COMMON.BACK')}}</v-button>
          <v-button :disabled="butFlag" @click="next" type="primary">{{$t('COMMON.NEXT_STEP')}}</v-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { email, telephone } from '@/utils/rules';
import CONSTANTS from '@/utils/contants';
import { checkOperatorInfo, getListCardArea } from '@/api/userManagement';
export default {
  data() {
    var checkUsername = (rule, value, callback) => {
      // ??????????????????????????????????????? existingUsername
      if (this.existingUsername) {
        callback(this.$t('USER_MANAGEMENT.ALREADY_USERNAME'));
      } else {
        callback();
      }
    };
    var checkChinaName = (rule, value, callback) => {
      // ??????????????????????????????????????? existingChinaName
      if (this.existingChinaName) {
        callback(this.$t('USER_MANAGEMENT.ALREADY_EXISTINGCHINANAME'));
      } else {
        callback();
      }
    };
    var checkElishName = (rule, value, callback) => {
      // ??????????????????????????????????????? existingChinaName
      if (this.existingElishName) {
        callback(this.$t('USER_MANAGEMENT.ALREADY_EXISTINGELISHNAME'));
      } else {
        callback();
      }
    };

    var checkCertNo = (rule, value, callback) => {
      // ??????????????????????????????????????? existingChinaName
      if (this.existingCertNo) {
        callback(this.$t('USER_MANAGEMENT.ACCOUNTNO_ALREADY'));
      } else {
        callback();
      }
    };
    var checkMobileNo = (rule, value, callback) => {
      let reg = /^\d{2,10}$/;
      let mobileNo = this.$refs.mobileNo.value;
      if (reg.test(value)) {
        callback();
      } else {
        if (!value) {
          callback(this.$t('COMMON.PLEASE_INPUT_SOMETHING',{
            input:this.$t('USER_MANAGEMENT.USER_COUNTRY')
          }));
        }
        if (!mobileNo) {
          callback(this.$t('COMMON.PLEASE_INPUT_SOMETHING',{
            input:this.$t('COMMON.PHONE_NUMBER')
          }));
        }
      }
    };

    var checkEmail = (rules, value, callback) => {
      const regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,6}))$/;
      if (regEmail.test(value)) {
        callback();
      } else {
        return callback(new Error(this.$t('message.rule.qxzdhzjlx')));
      }
    };
    return {
      // ??????????????????
      basicInfoForm: {
        loginName: '', //?????????
        userType: '', //????????????
        userChsName: '', //????????????
        userEglsName: '', //????????????
        cardType: '', //????????????
        cardNo: '', //????????????
        cardNoHead: '', //????????????
        cardNoBrack: '', //??????????????????????????????
        status: '', //??????
        revokeReason: '', //????????????
        tfaStatusName: '', //????????????
        cuSoleAuthorizerInd: '0', //?????????????????????
        tfaStatus: '',
        cardArea: '', //???????????????
        birthday: '', //????????????
        empowerGroup: '', //????????????
        countryArea: '', // ??????/????????????
        mobileNo: '', // ????????????
        email: '', // ????????????
        mobilePhone: '', //????????????
        countryCode: '', // ????????????
        areaCode: '', // ????????????
        contactPhoneNo: '', // ??????
        contactsPhone: '', //????????????2
        countryCodeTow: '', //????????????2
        areaCodeTow: '', //????????????2
        contactPhoneNoTow: '', //??????2
        mailAddress: '' // ????????????
      },
      butFlag: false, //???????????????????????????????????????????????????
      entryClerkFlag: false,
      roleFlag: false,
      userFlag: false,

      existingUsername: false, // ????????????????????????
      existingChinaName: false, // ???????????????????????????
      existingElishName: false, // ???????????????????????????
      existingCertNo: false, // ???????????????????????????
      // ??????????????????
      certTypeList: [],
      //???????????????
      cardAreaList: [],
      rules: {
        userType: [
          {
            required: true,
            message: this.$t('COMMON.PLEASE_SELECT_SOMETHING',{
              select:this.$t('USER_MANAGEMENT.USER_TYPE')
            }),
            trigger: 'blur'
          }
        ],
        userChsName: [
          {
            required: false,
            validator: checkChinaName,
            trigger: 'blur'
          }
        ],
        userEglsName: [
          {
            required: true,
            message: this.$t('COMMON.PLEASE_INPUT_SOMETHING',{
              input:this.$t('USER_MANAGEMENT.USER_ENGLISH_NAME')
            }),
            trigger: 'blur'
          },
          {
            validator: checkElishName,
            trigger: 'blur'
          }
        ],
        cardType: [
          {
            required: true,
            message:  this.$t('COMMON.PLEASE_SELECT_SOMETHING',{
              select:this.$t('USER_MANAGEMENT.USER_TYPE')
            }),
            trigger: 'blur'
          }
        ],
        cardNoHead: [
          {
            required: true,
            message:  this.$t('COMMON.PLEASE_SELECT_SOMETHING',{
              select:this.$t('USER_MANAGEMENT.USER_NUMBER')
            }),
            trigger: 'blur'
          },
          {
            validator: checkCertNo,
            trigger: 'blur'
          }
        ],
        status: [
          {
            required: true,
            message:  this.$t('COMMON.PLEASE_SELECT_SOMETHING',{
              select:this.$t('USER_MANAGEMENT.USER_STATUS')
            }),
            trigger: 'blur'
          }
        ],
        tfaStatus: [
          {
            required: true,
            message: this.$t('COMMON.PLEASE_SELECT_SOMETHING',{
              select:this.$t('USER_MANAGEMENT.FA')
            }),
            trigger: 'change'
          }
        ],
        cardArea: [
          {
            required: true,
            message: this.$t('COMMON.PLEASE_INPUT_SOMETHING',{
              input:this.$t('USER_MANAGEMENT.USER_ADDRESS')
            }),
            trigger: 'change'
          }
        ],
        countryArea: [
          {
            type: 'number',
            required: true,
            validator: checkMobileNo,
            trigger: 'blur'
          }
        ],

        email: [
          {
            required: true,
            message:  this.$t('COMMON.PLEASE_INPUT_SOMETHING',{
              input:this.$t('USER_MANAGEMENT.USER_EMAIL')
            }),
            trigger: 'blur'
          },

          {
            required: true,
            validator: checkEmail,
            message: this.$t('USER_MANAGERMENT.PLE_ENT_EMAIL_ADD')
          }
        ],
        empowerGroup: [
          {
            required: true,
            message: this.$t('COMMON.PLEASE_SELECT_SOMETHING',{
              select:this.$t('USER_MANAGEMENT.AUTHORITH_LEVEL')
            }),
            trigger: 'blur'
          }
        ]
      }
    };
  },
  created() {},
  mounted() {
    this.handleData();
    this.queryArea();
  },
  computed: {},
  methods: {
    //????????????????????????
    handleData() {
      let self = this;
      let tfaStatusObj = { 0: this.$t('COMMON.NO'), 1: this.$t('COMMON.YES') };
      self.basicInfoForm = self.$route.query.resp;
      self.basicInfoForm.tfaStatusName =
        tfaStatusObj[self.basicInfoForm.tfaStatus];
        console.log('self.basicInfoForm',self.basicInfoForm)
      //????????????
      if (self.basicInfoForm.userPhone) {
        let phoneList = self.basicInfoForm.userPhone.split('-');
        if (phoneList.length > 2) {
          self.basicInfoForm.countryCode = phoneList[0];
          self.basicInfoForm.areaCode = phoneList[1];
          self.basicInfoForm.contactPhoneNo = phoneList[2];
        } else if (phoneList.length === 2) {
          self.basicInfoForm.countryCode = phoneList[0];
          self.basicInfoForm.areaCode = '';
          self.basicInfoForm.contactPhoneNo = phoneList[1];
        } else {
          self.basicInfoForm.countryCode = '';
          self.basicInfoForm.areaCode = '';
          self.basicInfoForm.contactPhoneNo = '';
        }
      } else {
        self.basicInfoForm.countryCode = '';
        self.basicInfoForm.areaCode = '';
        self.basicInfoForm.contactPhoneNo = '';
      }

      //????????????2
      if (self.basicInfoForm.contactsPhone) {
        let phoneList = self.basicInfoForm.contactsPhone.split('-');
        if (phoneList.length > 2) {
          self.basicInfoForm.countryCodeTow = phoneList[0];
          self.basicInfoForm.areaCodeTow = phoneList[1];
          self.basicInfoForm.contactPhoneNoTow = phoneList[2];
        } else if (phoneList.length === 2) {
          self.basicInfoForm.countryCodeTow = phoneList[0];
          self.basicInfoForm.areaCodeTow = '';
          self.basicInfoForm.contactPhoneNoTow = phoneList[1];
        } else {
          self.basicInfoForm.countryCodeTow = '';
          self.basicInfoForm.areaCodeTow = '';
          self.basicInfoForm.contactPhoneNoTow = '';
        }
      } else {
        self.basicInfoForm.countryCodeTow = '';
        self.basicInfoForm.areaCodeTow = '';
        self.basicInfoForm.contactPhoneNoTow = '';
      }
      if (self.basicInfoForm.mobilePhone.indexOf('-') != -1) {
        //?????? -
        let mobilePhoneList = self.basicInfoForm.mobilePhone.split('-');
        self.basicInfoForm.countryArea = mobilePhoneList[0];
        self.basicInfoForm.mobileNo = mobilePhoneList[1];
      } else {
        //????????? -
        self.basicInfoForm.countryArea = '';
        self.basicInfoForm.mobileNo = self.basicInfoForm.mobilePhone;
      }

      //?????????????????????
      if (self.basicInfoForm.cardType === 'HKID') {
        self.basicInfoForm.cardNoHead = this.basicInfoForm.cardNo.slice(0, 7);
        if (this.basicInfoForm.cardNo.length > 7) {
          self.basicInfoForm.cardNoBrack = this.basicInfoForm.cardNo.slice(
            7,
            8
          );
        } else {
          self.basicInfoForm.cardNoBrack = '';
        }
      } else {
        self.basicInfoForm.cardNoHead = self.basicInfoForm.cardNo;
        self.basicInfoForm.cardNoBrack = '';
      }

      console.log('basicInfoForm', self.basicInfoForm);
      this.changeRadio(self.basicInfoForm.userType);
      this.jdugLevel(
        self.$route.query.resp,
        JSON.parse(sessionStorage.getItem('userInfo'))
      );
    },

    //?????????????????????????????????????????????
    jdugLevel(userInfo, loginUserInfo) {
      console.log('userInfo', userInfo, loginUserInfo);
      if (userInfo.userCode !== loginUserInfo.userCode) {
        if (userInfo.userType === '1') {
          if (
            loginUserInfo.entType === '2' &&
            loginUserInfo.adminEmpower === '0'
          ) {
            this.userFlag = true;
          }
          if (loginUserInfo.entType === '1') {
            this.userFlag = true;
          }
        }
      }
    },

    //???????????????
    queryArea() {
      let lang = 'zh-CN';
      if (localStorage.getItem('lang') == 'zh-CN') {
        lang = 'zh-CN';
      }
      if (localStorage.getItem('lang') == 'zh-HK') {
        lang = 'zh-HK';
      }
      if (localStorage.getItem('lang') == 'en') {
        lang = 'en';
      }
      let params = {
        bigGroupCode: 'language',
        bigGroupName: lang,
        fieldName: 'cardArea'
      };
      let paramsType = {
        bigGroupCode: 'language',
        bigGroupName: lang,
        fieldName: 'cardTypeInd'
      };
      //???????????????
      getListCardArea(params).then(resp => {
        // console.log('resp', resp);
        this.cardAreaList = resp.cardAreaList;
        resp.cardAreaList.forEach(item => {
          if (item.fieldValue == this.basicInfoForm.cardArea) {
            this.basicInfoForm.cardAreaName = item.fiedlDescrible;
          }
        });
      });
      //????????????
      getListCardArea(paramsType).then(resp => {
        // console.log('respType', resp);
        resp.cardAreaList.forEach(item => {
          this.certTypeList.push({
            certType: item.fiedlDescrible,
            value: item.fieldValue
          });

          if (item.fieldValue == this.basicInfoForm.cardType) {
            this.basicInfoForm.cardTypeName = item.fiedlDescrible;
          }
        });
      });
    },

    //?????????????????????
    changeRadio(e) {
      console.log('??????e', e);
      if (e == 1) {
        this.roleFlag = true;
      } else {
        this.roleFlag = false;
      }

      if (e === '3') {
        this.entryClerkFlag = false;
      } else {
        this.entryClerkFlag = true;
      }
    },

    change(e) {
      this.$forceUpdate();
    },
    next() {
      console.log('this.basicInfoForm.openURL', this.basicInfoForm.openURL);
      if (
        this.basicInfoForm.status === '0' &&
        !this.basicInfoForm.revokeReason
      ) {
        return this.$message({
          type: 'warn',
          message: this.$t('USER_MANAGEMENT.UNREGISTERED_RESON'),
          delay: 3000
        });
      }
      console.log('this.basicInfoForm.openURL', this.basicInfoForm.openURL);
      if (this.basicInfoForm.openURL === 'updateOperator') {
        //????????????
        this.handlePhone();
        //????????????2
        this.handlePhoneTow();
        if (this.basicInfoForm.countryArea && this.basicInfoForm.mobileNo) {
          this.basicInfoForm.mobilePhone =
            this.basicInfoForm.countryArea + '-' + this.basicInfoForm.mobileNo;
        }
        if (this.basicInfoForm.cardType === 'HKID') {
          if (!this.basicInfoForm.cardNoBrack) {
            return this.$message({
              type: 'warn',
              message: this.$t('USER_MANAGEMENT.ID_NUMBER_NONE'),
              delay: 3000
            });
          }
          this.basicInfoForm.cardNo =
            this.basicInfoForm.cardNoHead + this.basicInfoForm.cardNoBrack;
        } else {
          this.basicInfoForm.cardNo = this.basicInfoForm.cardNoHead;
        }
        console.log('basicInfoForm', this.basicInfoForm);
        return this.$emit('next', this.basicInfoForm);
        //   }
        // });
      }
    },
    //??????????????????
    handlePhone() {
      //???????????????????????????
      if (
        this.basicInfoForm.countryCode &&
        this.basicInfoForm.areaCode &&
        this.basicInfoForm.contactPhoneNo
      ) {
        this.basicInfoForm.userPhone =
          this.basicInfoForm.countryCode +
          '-' +
          this.basicInfoForm.areaCode +
          '-' +
          this.basicInfoForm.contactPhoneNo;
      }
      if (
        this.basicInfoForm.countryCode &&
        this.basicInfoForm.areaCode &&
        !this.basicInfoForm.contactPhoneNo
      ) {
        return this.$message({
          type: 'warn',
          message: this.$t('USER_MANAGEMENT.COUNTRY_CODE'),
          delay: 3000
        });
      }
      if (
        this.basicInfoForm.countryCode &&
        !this.basicInfoForm.areaCode &&
        this.basicInfoForm.contactPhoneNo
      ) {
        this.basicInfoForm.userPhone =
          this.basicInfoForm.countryCode +
          '-' +
          this.basicInfoForm.contactPhoneNo;
      }
      if (
        !this.basicInfoForm.countryCode &&
        this.basicInfoForm.areaCode &&
        this.basicInfoForm.contactPhoneNo
      ) {
        return this.$message({
          type: 'warn',
          message: this.$t('USER_MANAGEMENT.COUNTRY_CODE'),
          delay: 3000
        });
      }
      if (
        this.basicInfoForm.countryCode &&
        !this.basicInfoForm.areaCode &&
        !this.basicInfoForm.contactPhoneNo
      ) {
        return this.$message({
          type: 'warn',
          message: this.$t('USER_MANAGEMENT.COUNTRY_CODE'),
          delay: 3000
        });
      }
      if (
        !this.basicInfoForm.countryCode &&
        this.basicInfoForm.areaCode &&
        !this.basicInfoForm.contactPhoneNo
      ) {
        return this.$message({
          type: 'warn',
          message:  this.$t('USER_MANAGEMENT.COUNTRY_CODE'),
          delay: 3000
        });
      }
      if (
        !this.basicInfoForm.countryCode &&
        !this.basicInfoForm.areaCode &&
        this.basicInfoForm.contactPhoneNo
      ) {
        return this.$message({
          type: 'warn',
          message: this.$t('USER_MANAGEMENT.COUNTRY_CODE'),
          delay: 3000
        });
      }
      if (
        !this.basicInfoForm.countryCode &&
        !this.basicInfoForm.areaCode &&
        !this.basicInfoForm.contactPhoneNo
      ) {
        this.basicInfoForm.userPhone = '';
      }
    },
    //????????????2
    handlePhoneTow() {
      if (
        this.basicInfoForm.countryCodeTow &&
        this.basicInfoForm.areaCodeTow &&
        this.basicInfoForm.contactPhoneNoTow
      ) {
        this.basicInfoForm.contactsPhone =
          this.basicInfoForm.countryCodeTow +
          '-' +
          this.basicInfoForm.areaCodeTow +
          '-' +
          this.basicInfoForm.contactPhoneNoTow;
      } else if (
        this.basicInfoForm.countryCodeTow &&
        !this.basicInfoForm.areaCodeTow &&
        this.basicInfoForm.contactPhoneNoTow
      ) {
        this.basicInfoForm.contactsPhone =
          this.basicInfoForm.countryCodeTow +
          '-' +
          this.basicInfoForm.contactPhoneNoTow;
      } else if (
        !this.basicInfoForm.countryCodeTow &&
        !this.basicInfoForm.areaCodeTow &&
        !this.basicInfoForm.contactPhoneNoTow
      ) {
        this.basicInfoForm.contactsPhone = '';
      } else {
        this.basicInfoForm.contactsPhone = '';
        return this.$message({
          type: 'warn',
          message:  this.$t('USER_MANAGEMENT.COUNTRY_CODE'),
          delay: 3000
        });
      }
    },

    //??????????????????
    cardTypeChange(e) {
      this.certTypeList.forEach(item => {
        console.log('item', item);
        if (item.value == e) {
          this.basicInfoForm.cardTypeName = item.certType;
        }
      });
      console.log('e', e, this.basicInfoForm.cardTypeName);
    },
    //?????????????????????
    cardAreaChange(e) {
      this.cardAreaList.forEach(item => {
        console.log('item', item);
        if (item.fieldValue == e) {
          this.basicInfoForm.cardAreaName = item.fiedlDescrible;
        }
      });
      console.log('e', e, this.basicInfoForm.cardAreaName);
    },
    back() {
      this.$emit('back');
    },
    blurChange(e) {
      e.target.value = e.target.value.replace(/[^\u4E00-\u9FA5]/g, '');
      this.basicInfoForm.userChsName  = e.target.value.replace(/[^\u4E00-\u9FA5]/g, '');
    }
  }
};
</script>
<style lang="scss" scoped>
.u-basicInfo-wapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .u-newBtn {
    display: flex;
    margin-top: 20px;
  }
  ::v-deep.el-form {
    .el-select > .el-input {
      width: 320px !important;
    }
    .el-input {
      width: 320px !important;
      .el-input__inner {
        padding: 0 12px !important;
        height: 36px !important;
        line-height: 36px !important;
      }
    }
  }
  /deep/ .u-rowStyle {
    width: 320px;
    .u-input1 {
      width: 80px !important;
    }
    .u-input2 {
      flex: 1;
    }
    .u-input3 {
      width: 120px !important;
    }
    .u-line {
      margin: auto 6px;
    }
  }
  /deep/.el-date-editor {
    .el-input__inner {
      padding-left: 15px !important;
    }
  }
}
</style>
