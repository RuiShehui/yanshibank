<template>
  <div class="contain">
    <el-form class="transverse-form" label-width="auto" ref="formRef">
      <el-form-item :label="$t('USER_MANAGEMENT.USER_NAME_SYMBOL')">
        <el-input v-model="userName" maxlength="30" :placeholder="$t(`COMMON.PLEASE_INPUT`)"></el-input>
      </el-form-item>
      <el-form-item :label="$t('USER_MANAGEMENT.USER_REALNAME_SYMBOL')">
        <el-input v-model="userRealName" maxlength="50" :placeholder="$t(`COMMON.PLEASE_INPUT`)"></el-input>
      </el-form-item>
      <el-form-item :label="$t('USER_MANAGEMENT.USER_ROLE_SYMBOL')">
        <el-select
          v-model="roleName"
          :placeholder="$t(`COMMON.PLEASE_SELECT`)"
          :style="{ width: '270px' }"
        >
          <el-option
            v-for="item in userRoleList"
            :key="item.roleCode"
            :label="item.roleName"
            :value="item.roleName"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- </el-form> -->
      <!-- <el-form class="g-form-tow" ref="formRef"> -->
      <el-form-item :label="$t(`GROUP_MANAGEMENT.GROUP_CODE_SYMBOL`)">
        <el-input v-model="depCode" maxlength="10" :placeholder="$t(`COMMON.PLEASE_INPUT`)"></el-input>
      </el-form-item>
      <el-form-item :label="$t(`GROUP_MANAGEMENT.GROUP_NAME_SYMBOL`)">
        <el-input v-model="depName" maxlength="100" :placeholder="$t(`COMMON.PLEASE_INPUT`)"></el-input>
      </el-form-item>
      <el-form-item label=" ">
        <div style="width:270px;">
          <Form-Button style="float:right" @add="add" @submit="search" @handleReset="handleReset"></Form-Button>
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
      <el-table-column width="80" type="index" :label="$t(`COMMON.SERIAL_NUMBER`)"></el-table-column>
      <el-table-column min-width="200" prop="userName" :label="$t('USER_MANAGEMENT.USER_NAME')">
        <template slot-scope="scope">
          <div class="f-btnColor" @click="handleCell(scope.row)">{{ scope.row.userName }}</div>
        </template>
      </el-table-column>
      <el-table-column
        min-width="200"
        prop="userRealName"
        :label="$t('USER_MANAGEMENT.USER_REL_NAME')"
      ></el-table-column>
      <el-table-column min-width="300" prop="roleNames" :label="$t('USER_MANAGEMENT.USER_ROLE')"></el-table-column>
      <el-table-column
        width="200"
        prop="depName"
        :label="$t('GROUP_MANAGEMENT.BELONGING_GROUP_NAME')"
      ></el-table-column>
      <el-table-column
        min-width="150"
        prop="userStatusName"
        :label="$t('USER_MANAGEMENT.USER_STATUS')"
      ></el-table-column>
      <el-table-column min-width="120" :label="$t(`COMMON.OPERATION`)" fixed="right">
        <template slot-scope="scope">
          <div class="f-span-btns">
            <span @click="del(scope.row, scope.$index)">{{$t(`COMMON.DELETE`)}}</span>
            <span @click="modify(scope.row, scope.$index)">{{$t(`COMMON.UPDATE`)}}</span>
          </div>
        </template>
      </el-table-column>
      <div slot="empty" class="g-empty">
        <img src="../../img/table-empty.png" alt />
        <span>{{ $t('USER_MANAGEMENT.DATA_NULL_USER') }}</span>
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
  </div>
</template>

<script>
import FormButton from '@/components/common/FormButton.vue';
import TablePagination from '@/components/common/TablePagination.vue';
import {
  getFindUserInfoListPage,
  removeUserInfo,
  findUserRuleLRLATInfoList,
  findUserRuleInfoList
} from '@/api/user-management/index.js';
import CONSTANTS from '@/utils/constant';

export default {
  components: {
    FormButton,
    TablePagination,
    CONSTANTS
  },

  data() {
    return {
      userName: '', //????????????
      userRealName: '', //????????????
      roleName: '', //????????????
      depCode: '', //????????????
      depName: '', //????????????
      tableData: [], //??????????????????
      currentPage: 1,
      pageSize: 10,
      total: 1,
      form: {
        payItemName: '6',
        channel: '2'
      },
      projectName: '',
      visible: false,
      userObject: {}, //???????????????????????????
      userRoleList: [] //??????
    };
  },

  created() {},

  mounted() {
    let self = this;
    self.search();
    self.getUserRole();
  },

  methods: {
    //??????
    search() {
      let self = this;
      let params = {
        current: self.currentPage,
        size: self.pageSize,
        userName: self.userName,
        userRealName: self.userRealName,
        roleName: self.roleName,
        depCode: self.depCode,
        depName: self.depName
      };
      self.tableData = [];
      getFindUserInfoListPage(params).then(resp => {
        self.total = resp.body.totalRow;
        if (resp.body) {
          resp.body.data.forEach(item => {
            item.userStatusName = CONSTANTS.ENABLE[item.userStatus];
            if (item.roleInfo) {
              item.roleInfo.forEach(roleItem => {
                if (item.roleNames) {
                  item.roleNames = item.roleNames + ',' + roleItem.roleName;
                } else {
                  item.roleNames = roleItem.roleName;
                }
              });
            }
          });
          self.tableData = resp.body.data;
        }
      });
    },
    //??????
    handleReset() {
      let self = this;
      self.userName = '';
      self.userRealName = '';
      self.roleName = '';
      self.depCode = '';
      self.depName = '';
      // self.currentPage = 1;
      // self.pageSize = 10;
      // self.search();
    },
    //????????????????????????
    handleSizeChange(val) {
      let self = this;
      self.pageSize = val;
      self.currentPage = 1;
      self.search();
    },
    //???????????????
    handleCurrentChange(val) {
      let self = this;
      self.currentPage = val;
      self.search();
    },

    //??????
    handleCell(row) {
      findUserRuleLRLATInfoList({ userCode: row.userCode }).then(resp => {
        if (resp.body) {
          let userRoleRLATInfoParamsVOS = '';
          resp.body.forEach(item => {
            if (userRoleRLATInfoParamsVOS) {
              userRoleRLATInfoParamsVOS =
                userRoleRLATInfoParamsVOS + ',' + item.roleName;
            } else {
              userRoleRLATInfoParamsVOS = item.roleName;
            }
          });
          row.userRoleRLATInfoParamsVOS = userRoleRLATInfoParamsVOS;
          this.$router.push({
            path: '/userManagement/ditail',
            query: row
          });
        }
      });
    },
    //????????????
    // restartPassword(row, index) {
    //   console.log('row:', row, index);
    // },
    //??????
    del(row, index) {
      this.userObject = row;
      this.$showBox({
        content: this.$t('USER_MANAGEMENT.DELETE_TIPS'),
        confirm: () => {
          this.confirm();
        }
      });
    },

    //??????????????????
    confirm() {
      // removeUserInfo({ userCode: this.userObject.userCode }).then(resp => {
      removeUserInfo(this.userObject).then(resp => {
        if (resp.body) {
          // this.$showMsg.success(this.$t('USER_MANAGEMENT.DELETE_USER_SUCCESS'));
          this.$showMsg({
            type: 'success',
            message: this.$t('USER_MANAGEMENT.DELETE_USER_SUCCESS')
          });
          this.search();
        }
      });
    },

    //??????
    modify(row, index) {
      findUserRuleLRLATInfoList({ userCode: row.userCode }).then(resp => {
        if (resp.body) {
          let userRoleRLATInfoParamsVOS = [];
          resp.body.forEach(item => {
            userRoleRLATInfoParamsVOS.push(item.roleCode);
          });
          row.userRoleRLATInfoParamsVOS = userRoleRLATInfoParamsVOS;
          if (row.linkPhone) {
            let phoneList = row.linkPhone.split('-');
            console.log('phoneList', phoneList);
            row.coreNumber = phoneList[0];
            row.liasPhone = phoneList[1];
          }
          this.$router.push({
            path: '/userManagement/edit',
            query: row
          });
        }
      });
    },
    //??????
    add() {
      this.$router.push('/userManagement/add');
    },
    //?????????????????????
    getUserRole() {
      let self = this;
      findUserRuleInfoList().then(resp => {
        // console.log('???????????????resp', resp);
        if (resp.body && resp.body.length > 0) {
          self.userRoleList = resp.body;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.contain {
  min-width: 600px;
  padding: 32px 24px;
  box-sizing: border-box;
  min-height: 100%;
  background: #fff;
}
/deep/ .el-table {
  width: auto;
}
.g-table {
  // padding: 0 20px;
  margin: 20px 0px;
  // width: 1--
}
.g-empty {
  img {
    width: 261px;
    height: 277px;
  }
  span {
    position: relative;
    left: -20%;
    // position: absolute;
    // bottom: 15%;
    // left: 45%;
  }
}
.g-bolck {
  // float: right;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  // margin-top: 32px;
  padding: 32px 20px 20px;
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
.f-span-btns {
  width: 100%;
  color: #e34141;
  display: flex;
  align-items: center;
  span {
    display: inline-block;
    cursor: pointer;
  }
  span:not(:nth-of-type(1)) {
    margin-left: 10px;
    color: #f06b00;
  }
}
.f-btnColor {
  cursor: pointer;
  color: #4181fa;
}
</style>
