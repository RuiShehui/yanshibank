<!-- εΎζζζ -->
<template>
  <div class="contain">
    <el-form class="transverse-form" label-width="auto" ref="formRef">
      <el-form-item :label="$t(`AUTHORIZATION_CENTER.BUSINESS_TYPE_SYMBOL`)">
        <el-select
          class="g-w-270"
          v-model="bizType"
          :placeholder="$t('AUTHORIZATION_CENTER.PLEASE_SELECT')"
        >
          <el-option
            v-for="item in bizCodeList"
            :key="item.value"
            :value="item.value"
            :label="item.label"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('AUTHORIZATION_CENTER.AUTHORIZATION_STATUS_SYMBOL')">
        <el-select
          class="g-w-270"
          v-model="authStatus"
          :placeholder="$t(`AUTHORIZATION_CENTER.PLEASE_SELECT`)"
        >
          <el-option
            v-for="item in bizStatusList"
            :key="item.value"
            :value="item.value"
            :label="item.label"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t(`AUTHORIZATION_CENTER.SUBMITTER_SYMBOL`)">
        <!-- <el-select
          v-model="submitUserName"
          clearable
          :placeholder="
            $t(`AUTHORIZATION_CENTER.PLEASE_SELECT`)
          "
        >
          <el-option
            v-for="item in submitList"
            :key="item.userCode"
            :value="item.userName"
            :label="item.userName"
          ></el-option>
        </el-select>-->
        <el-input
          class="g-w-270"
          v-model="submitUserName"
          :placeholder="$t('AUTHORIZATION_CENTER.PLEASE_INPUT')"
        ></el-input>
      </el-form-item>
      <!-- </el-form> -->
      <!-- <el-form class="g-form-operation" ref="formRef"> -->
      <el-form-item :label="$t('AUTHORIZATION_CENTER.SUBMISSION_DATE_SYMBOL')">
        <el-date-picker
          class="g-w-270"
          v-model="submitTime"
          type="daterange"
          align="right"
          unlink-panels
          :range-separator="$t('AUTHORIZATION_CENTER.TO')"
          :start-placeholder="$t('AUTHORIZATION_CENTER.START_DATE')"
          :end-placeholder="$t('AUTHORIZATION_CENTER.END_DATE')"
          :picker-options="pickerOptions"
          value-format="yyyy-MM-dd"
          @change="selectDate"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label=" ">
        <div style="width:270px;">
          <div style="float:right">
            <el-button class="query" type="primary" @click="search">{{ $t('COMMON.SEARCH') }}</el-button>
            <el-button class="reset" @click="handleReset">{{ $t('COMMON.RESET') }}</el-button>
          </div>
        </div>
      </el-form-item>
    </el-form>
    <el-table
      class="g-table"
      :data="tableData"
      stripe
      :header-cell-style="{
        background: '#f3f3f3',
        color: '#000',
        fontSize: '14px'
      }"
    >
      <el-table-column type="index" :label="$t(`COMMON.SERIAL_NUMBER`)" width="80"></el-table-column>
      <el-table-column prop="flowNum" :label="$t(`AUTHORIZATION_CENTER.SERIAL_NUMBER`)" width="290">
        <template slot-scope="scope">
          <div class="f-btnColor" @click="handleCell(scope.row)">{{ scope.row.flowNum }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="bizType" :label="$t(`AUTHORIZATION_CENTER.BUSINESS_TYPE`)" width="240"></el-table-column>
      <el-table-column
        prop="operType"
        :label="$t(`AUTHORIZATION_CENTER.OPERATIOM_TYPE`)"
        width="140"
      ></el-table-column>
      <el-table-column
        prop="userRealName"
        :label="$t(`AUTHORIZATION_CENTER.SUBMITTER`)"
        min-width="130"
      ></el-table-column>
      <el-table-column
        prop="submitTime"
        :label="$t(`AUTHORIZATION_CENTER.SUBMITITME`)"
        min-width="180"
      ></el-table-column>
      <el-table-column prop="authStatus" :label="$t(`AUTHORIZATION_CENTER.STATUS`)" width="120">
        <template v-slot="{ row }">
          <!-- {{ row.authStatus }} -->
          {{
          bizStatusList.find(item => item.value === row.authStatus) ? bizStatusList.find(item => item.value === row.authStatus).label : ''
          }}
        </template>
      </el-table-column>
      <el-table-column :label="$t(`COMMON.OPERATION`)" width="140" fixed="right">
        <template slot-scope="scope">
          <div class="f-span-btns">
            <span
              v-show="scope.row.authStatus === 'WAIT_AUTH'"
              @click="refuse(scope.row, scope.$index)"
            >{{ $t(`AUTHORIZATION_CENTER.REFUSE`) }}</span>
            <span
              v-show="scope.row.authStatus === 'WAIT_AUTH'"
              @click="adopt(scope.row, scope.$index)"
            >{{ $t(`AUTHORIZATION_CENTER.ADOPT`) }}</span>
          </div>
        </template>
      </el-table-column>
      <div slot="empty" class="g-empty">
        <img src="@/img/table-empty.png" alt />
        <span>η‘ζζ¬ε§ε?Ή</span>
      </div>
    </el-table>
    <div class="g-bolck">
      <el-pagination
        :background="true"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        :total="total"
        :page-sizes="[10, 20, 30, 40, 50]"
        layout="sizes,total,prev,pager,next,jumper"
        @size-change="handleSizeChange($event)"
        @current-change="handleCurrentChange($event)"
      />
    </div>
    <!-- ζη» -->
    <Pop-Up ref="refuse" class="m-popUp" width="513px" @confirm="refuseConfirm">
      <div class="g-popus-refuse">
        <img src="@/img/logOut.png" alt />
        <p class="g-popus-title-large">
          {{
          $t(`AUTHORIZATION_CENTER.REJECTION_REASON`)
          }}
        </p>
        <p class="g-popus-title-small">{{ $t(`AUTHORIZATION_CENTER.REJEction_TIPS`) }}</p>
      </div>
      <el-input
        :row="2"
        type="textarea"
        maxlength="300"
        v-model="authOpinion"
        :placeholder="
          $t(
            `AUTHORIZATION_CENTER.PLEASE_INPUT_AUTHORIZATION`
          )
        "
      ></el-input>
    </Pop-Up>
    <el-dialog
      :visible.sync="dialogVisible"
      width="420px"
      top="calc(50vh - 200px)"
      :center="true"
      :show-close="false"
      class="my-dialog"
      @closed="closed"
    >
      <main class="center">
        <img src="@/img/logOut.png" />
        <section class="text">
          <label>{{ $t('AUTHORIZATION_CENTER.REJECTION_REASON')}}{{$t('AUTHORIZATION_CENTER.REJEction_TIPS')}}</label>
        </section>
        <el-input
          rows="3"
          resize="none"
          type="textarea"
          maxlength="300"
          v-model="authOpinion"
          :placeholder="$t('AUTHORIZATION_CENTER.PLEASE_INPUT_AUTHORIZATION')"
        ></el-input>
      </main>
      <footer slot="footer">
        <el-button @click="closed">{{$t('CUSTOMER_MANAGEMENT.CANCEL')}}</el-button>
        <el-button type="primary" @click="refuseConfirm">{{$t('CUSTOMER_MANAGEMENT.ENSURE')}}</el-button>
      </footer>
    </el-dialog>
  </div>
</template>

<script>
import PopUp from '@/components/common/dialog/PopUp.vue';
import {
  getAuthorizationList,
  getAuthorizationDetail,
  empower
} from '@/api/authorization-center/index.js';
import CONSTANTS from '@/utils/constant.js';
import { getRoleDetail, removeToken, removeRoleDetail } from '@/utils/user';
import dateTools from '@/utils/dateTools';

const { BIZ_STATUS_LIST, BIZ_CODE_TYPE_LIST } = CONSTANTS;

export default {
  name: 'SubjectAuthorizationIndexPage',
  components: {
    PopUp
  },

  data() {
    const _self = this;

    return {
      roleFlag: false, //ε€ζ­ζζηθ§θ²ζ―ε¦δΈε½εθ§θ²ηΈε
      tips: '', //ζη»γεζζη€Ί
      bizType: '', //δΈε‘η±»ε
      authStatus: 'WAIT_AUTH', //ζζηΆζ
      submitUserName: '', //ζδΊ€δΊΊ
      submitTime: '', //ζδΊ€ζ₯ζ
      authOpinion: '', //ζη»ζθ§
      bizCodeList: [], //δΈε‘η±»εζ°η»
      authObject: {},
      dialogVisible: false,
      // submitList: [], //ζδΊ€δΊΊζ°η»
      bizStatusList: BIZ_STATUS_LIST,
      pickerOptions: {
        shortcuts: [
          {
            text: _self.$t('AUTHORIZATION_CENTER.NEARLY_ONE_WEEK'),
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: _self.$t('AUTHORIZATION_CENTER.NEARLY_ONE_MONTH'),
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: _self.$t('AUTHORIZATION_CENTER.NEARLY_THREE_MONTH'),
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }
        ],
        disabledDate(time) {
          let curDate = new Date().getTime();
          let three = 3 * 365 * 24 * 3600 * 1000;
          let threeMonth = curDate - three;
          var thatDay = time.getTime();
          return (
            time.getTime() > Date.now() - 8.64e6 || time.getTime() < threeMonth
          );
        }
      },
      tableData: [
        // // δΏε­εθ‘¨ζ°η»
        // {
        //   flowNum: '65009999611', //ζ΅ζ°΄ε·
        //   bizType: 'ε¬εη?‘η', //δΈε‘η±»ε
        //   operType: 'ζ°ε’', //ζδ½η±»ε
        //   submitUserName: 'εΌ δΈ', //ζδΊ€δΊΊ
        //   submitTime: '2021-10-30 12:31:32', //ζδΊ€ζΆι΄
        //   authStatus: _self.$t('AUTHORIZATION_CENTER.WAIT_AUTH') //ηΆζ
        // }
      ],
      currentPage: 1,
      pageSize: 10,
      total: 1,
      form: {
        payItemName: '6',
        channel: '2'
      },
      visible: false
    };
  },

  created() {},

  mounted() {
    let self = this;
    // self.search();
    self.getDate();
    self.bizCodeList = BIZ_CODE_TYPE_LIST;
    // self.getSubmiter();
  },

  methods: {
    //ζ₯θ―’
    search() {
      let self = this;

      if (!self.submitTime) {
        return this.$showMsg({
          type: 'error',
          message: this.$t('AUTHORIZATION_CENTER.PLEASE_SUBMIT_TIME')
        });
      }
      self.tableData = [];
      let params = {
        authType: 'AU',
        bizType: self.bizType, //δΈε‘η±»ε
        authStatus: self.authStatus, //ζζηΆζ
        queryStartTime: self.submitTime[0] || '', //εΌε§ζΆι΄
        queryStopTime: self.submitTime[1] || '', //η»ζζΆι΄
        submitUserName: self.submitUserName,
        size: self.pageSize,
        current: self.currentPage
      };
      getAuthorizationList(params).then(resp => {
        self.total = parseInt(resp.head.totalNum) || 0;
        // resp.body.forEach(item => {
        //   item.authStatus = CONSTANTS.AUTHSTATUS[item.authStatus];
        // });
        if (resp.body.length > 0) {
          self.tableData = resp.body;
        }
      });
    },

    //ιζ©ζΆι΄
    selectDate([startTime, endTime]) {
      //ε€ζ­ζΆι΄ζ?΅ζ―ε¦θΆθΏ90ε€©
      const { getGapDay } = dateTools;
      let days = getGapDay(startTime, endTime);
      if (days > 90) {
        this.resetTimespan(startTime);
        this.$showBox({
          content: this.$t(`COMMON.QUERY_INTERVAL`)
        });
      }
    },

    //ζΆι΄ζ?΅θΆθΏ90ε€©οΌδ»₯εΌε§ζΆι΄δΈΊεοΌη»ζζΆι΄δΈΊεΌε§ζΆι΄δΉε90ε€©
    resetTimespan(startTime) {
      const { getDateStr } = dateTools;
      const endTime = getDateStr(startTime, 90);
      this.$set(this, 'submitTime', [startTime, endTime]);
    },

    //θ·ει»θ?€ζΆι΄ββζθΏδΈδΈͺζ
    getDate(reset) {
      let self = this;
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
      let endDate = self.formatDate(end);
      let startDate = self.formatDate(start);
      self.submitTime = [startDate, endDate];
      if (!reset) {
        self.search();
      }
    },

    //ε€ηι»θ?€θ·εζθΏδΈδΈͺζζΆι΄
    formatDate(date) {
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      if (month.toString().length < 2) {
        month = '0' + month;
      }
      let day = date.getDate();
      if (day.toString().length < 2) {
        day = '0' + day;
      }
      return year + '-' + month + '-' + day;
    },

    //εζ’ζ―ι‘΅ζΎη€Ίζ‘ζ°
    handleSizeChange(val) {
      let self = this;
      self.pageSize = val;
      self.currentPage = 1;
      self.search();
    },

    //εζ’ε½ει‘΅
    handleCurrentChange(val) {
      let self = this;
      self.currentPage = val;
      self.search();
    },

    //ιη½?ηΆηΊ§θ‘¨ε
    handleReset() {
      this.bizType = ''; //δΈε‘η±»ε
      this.authStatus = 'WAIT_AUTH'; //ζζηΆζ
      this.submitUserName = ''; //ζδΊ€δΊΊ
      this.getDate(true);
    },

    //θ―¦ζ
    handleCell(row) {
      console.log('1:',1);
      // console.log('ζε°οΌ', row);
      getAuthorizationDetail({ flowNum: row.flowNum }).then(resp => {
        if (resp.body) {
          this.$router.push({
            path: '/authorizationCenter/subjectAuthorization/ditail',
            query: resp.body
          });
        }
      });
    },
    //ζη»
    refuse(row) {
      row.type = this.$t('AUTHORIZATION_CENTER.REFUSE');
      this.authObject = row;
      // this.tips = 'η‘?ε?θ¦ζη»θ―₯η¬δΊ€ζδΉοΌ';
      this.tips = this.$t('AUTHORIZATION_CENTER.REFUSE_TRANSACTION');
      this.dialogVisible = true;
    },
    //ζη»εζζη€ΊεΌΉζ‘
    confirm() {
      if (this.authObject.type === this.$t('AUTHORIZATION_CENTER.REFUSE')) {
        this.dialogVisible = true;
      }

      if (this.authObject.type === this.$t('AUTHORIZATION_CENTER.ADOPT')) {
        let params = {
          authStatus: 'CONSENT', //ζζηΆζββεζ
          flowNum: this.authObject.flowNum
        };
        empower(params).then(resp => {
          // console.log('ζε°ιθΏresp', resp);
          if (resp.body) {
            // this.$showMsg.success('ζζεζζε');
            this.$showMsg({
              type: 'success',
              message: this.$t(
                'AUTHORIZATION_CENTER.AUTHORIZATION_AGREE_SUCCESS'
              )
            });
            this.search();
            if (this.roleFlag) {
              removeToken();
              removeRoleDetail();
              this.$store.commit('tabs/DELETE_ALL_TABS');
              this.$router.replace('/login');
            }
          }
        });
      }
    },
    closed() {
      this.dialogVisible = false;
      this.authOpinion = '';
    },
    //ζη»ββθ°η¨ζ₯ε£
    async refuseConfirm() {
      this.dialogVisible = false;
      if (!this.authOpinion) {
        // return this.$showMsg.error('ζη»ζθ§δΈθ½δΈΊη©ΊοΌ');
        return this.$showMsg({
          message: this.$t('AUTHORIZATION_CENTER.REFUSE_NULL'),
          type: 'error'
        });
      }
      let params = {
        authStatus: 'REJECT', //ζζηΆζββζη»
        flowNum: this.authObject.flowNum,
        authOpinion: this.authOpinion
      };
      await empower(params).then(resp => {
        if (resp.body) {
          // this.$showMsg.success('ζζζη»ζε');
          this.$showMsg({
            type: 'success',
            message: this.$t(
              'AUTHORIZATION_CENTER.AUTHORIZATION_REFUSE_SUCCESS'
            )
          });
        }
      });
      this.search();
    },
    //ιθΏ
    adopt(row) {
      row.type = this.$t('AUTHORIZATION_CENTER.ADOPT');
      this.authObject = row;
      if (row.bizType === this.$t('MENU_PAGE_ITEMS.ROLE_MANAGEMENT')) {
        getAuthorizationDetail({ flowNum: row.flowNum }).then(resp => {
          if (
            JSON.parse(resp.body.temp.afterMdJson).body.roleCode ===
            getRoleDetail().roleCode
          ) {
            this.roleFlag = true;
          }
        });
      }
      this.$showBox({
        content: this.$t('AUTHORIZATION_CENTER.AGREE_TRANSACTION'),
        confirm: () => {
          this.confirm();
        }
      });
    }
    //θ·εζδΊ€δΊΊζ°η»
    // getSubmiter() {
    //   let self = this;
    //   self.submitList = [];
    //   findUserInfoFromDropDownBox().then(resp => {
    //     // console.log('η¨ζ·δΈζεθ‘¨ζ₯θ―’', resp);
    //     self.submitList = resp.body;
    //   });
    // }
  }
};
</script>

<style lang="scss" scoped>
.contain {
  padding: 32px 24px;
  box-sizing: border-box;
  min-width: 600px;
  min-height: 100%;
  background: #fff;
}
/deep/ .el-table__empty-block {
  text-align: center;
  @media screen and (max-width: 1919px) {
    text-align: initial;
  }
}

/deep/ .el-table {
  width: auto;
}
.g-table {
  margin-top: 20px;
}
.g-empty {
  img {
    width: 261px;
    height: 277px;
  }
  span {
    position: absolute;
    bottom: 25%;
    left: 48%;
  }
}
.btn {
  cursor: pointer;
}
.g-bolck {
  text-align: right;
  margin: 40px 10px;
}
.f-btnColor {
  cursor: pointer;
  color: #4181fa;
}
.f-span-btns {
  width: 100%;
  color: #e34141;
  display: flex;
  align-items: center;
  span {
    display: inline-block;
    cursor: pointer;
  }
  span:nth-of-type(2) {
    margin-left: 10px;
    color: #f06b00;
  }
}
.my-dialog {
  .center {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    margin: 0 20px 24px;
    font-size: 16px;
    color: #323c41;
    & > .text {
      margin: 4px 0 24px;
    }
  }
  ::v-deep .el-dialog__body {
    padding: 0px;
  }
  ::v-deep .el-dialog__footer {
    padding: 0px 0px 32px 0px;
  }
}
.transverse-form {
  display: flex;
  flex-wrap: wrap;
  .el-form-item {
    display: flex;
    margin-right: 40px;
    ::v-deep .el-form-item__content {
      margin-left: 0px !important;
    }
  }
  .el-input {
    width: 270px;
  }
}
.g-w-270 {
  width: 270px;
}
</style>
