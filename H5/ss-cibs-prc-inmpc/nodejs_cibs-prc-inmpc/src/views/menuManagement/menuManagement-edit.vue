<template>
  <div class="g-menuManagement-add">
    <header class="g-form">
      <el-form
        :disabled="confirmFlag"
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="150px"
      >
        <el-form-item :label="$t(`MENU_MANAGEMENT.MENU_CODE_SYMBOL`)" prop="menuCode">
          <el-input
            :disabled="true"
            v-model="ruleForm.menuCode"
            :placeholder="$t(`COMMON.PLEASE_SELECT`)"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t(`MENU_MANAGEMENT.MENU_NAME_SYMBOL`)" prop="menuName">
          <el-input
            v-model="ruleForm.menuName"
            maxlength="50"
            :placeholder="$t(`COMMON.PLEASE_SELECT`)"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t(`MENU_MANAGEMENT.MENU_LEVEL_SYMBOL`)" prop="menuLevel">
          <el-select
            :disabled="subsetFlag"
            v-model="ruleForm.menuLevel"
            :placeholder="$t(`COMMON.PLEASE_SELECT`)"
            :style="{ width: '340px' }"
            @change="selectMenuLevel"
          >
            <el-option
              v-for="item in menuClazzList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t(`MENU_MANAGEMENT.MENU_STATUS_SYMBOL`)" prop="status">
          <el-select
            v-model="ruleForm.status"
            :placeholder="$t(`COMMON.PLEASE_SELECT`)"
            :style="{ width: '340px' }"
            @change="selectStatus"
          >
            <el-option
              v-for="item in menuStatusList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="menuLevelFlag"
          :label="$t(`MENU_MANAGEMENT.P_MENU_CODE_SYMBOL`)"
          prop="pMenuCode"
        >
          <el-select
            :disabled="subsetFlag"
            v-model="ruleForm.pMenuCode"
            :placeholder="$t(`COMMON.PLEASE_SELECT`)"
            :style="{ width: '340px' }"
            @change="selectPMenuCode"
          >
            <el-option
              v-for="item in pMenuList"
              :key="item.menuCode"
              :label="item.menuCode"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="menuLevelFlag"
          :label="$t(`MENU_MANAGEMENT.P_MENU_NAME_SYMBOL`)"
          prop="pMenuName"
        >
          <el-select
            :disabled="subsetFlag"
            v-model="ruleForm.pMenuName"
            :placeholder="$t(`COMMON.PLEASE_SELECT`)"
            :style="{ width: '340px' }"
            @change="selectPMenuName"
          >
            <el-option
              v-for="item in pMenuList"
              :key="item.menuCode"
              :label="item.menuName"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t(`MENU_MANAGEMENT.URL_SYMBOL`)" prop="url">
          <el-input
            :disabled="true"
            v-model="ruleForm.url"
            :placeholder="$t(`COMMON.PLEASE_SELECT`)"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t(`MENU_MANAGEMENT.MENU_DESCRIBLE_SYMBOL`)" prop="menuDescrible">
          <el-input
            type="textarea"
            maxlength="300"
            v-model="ruleForm.menuDescrible"
            :style="{ width: '370px', height: '120px' }"
          ></el-input>
        </el-form-item>
      </el-form>
    </header>

    <footer v-if="!confirmFlag" class="g-btn">
      <el-button class="f-cancel" @click="cancel">
        {{
        $t(`COMMON.CANCEL`)
        }}
      </el-button>
      <el-button class="f-confirm" @click.native.prevent="submitForm">
        {{
        $t(`COMMON.SUBMIT`)
        }}
      </el-button>
    </footer>

    <footer v-if="confirmFlag" class="g-btn">
      <el-button class="f-cancel" @click="previousStep">
        {{
        $t(`COMMON.PREVIOUS_STEP`)
        }}
      </el-button>
      <el-button :disabled="loading" class="f-confirm" @click="confirm()">
        {{
        $t(`COMMON.DETERMINE`)
        }}
      </el-button>
    </footer>
  </div>
</template>

<script>
import { menuEdit, getMenuInfoList } from '@/api/menu-management/index.js';
export default {
  components: {},
  computed: {
    rules() {
      // var validate_Type = (rules, value, callback) => {
      //   if (this.ruleForm.type == '') {
      //     callback(new Error(this.$t('message.rule.qxzdhzjlx')));
      //   }
      //   callback;
      // };
      return {
        menuCode: [
          {
            required: true,
            message: this.$t('MENU_MANAGEMENT.PLEASE_INPUT_MENU_CODE'),
            trigger: 'blur'
          }
        ],
        menuName: [
          {
            required: true,
            message: this.$t('MENU_MANAGEMENT.PLEASE_INPUT_MENU_NAME'),
            trigger: 'blur'
          },
          {
            max: 50,
            message: this.$t('MENU_MANAGEMENT.MANY_CHARACTER'),
            trigger: 'blur'
          }
        ],
        menuLevel: [
          {
            required: true,
            message: this.$t('MENU_MANAGEMENT.PLEASE_SELECT_MENU_LEVEL'),
            trigger: 'blur'
          }
        ],
        status: [
          {
            required: true,
            message: this.$t('MENU_MANAGEMENT.PLEASE_SELECT_MENU_STATUS'),
            trigger: 'blur'
          }
        ],
        pMenuCode: [
          {
            required: true,
            message: this.$t('MENU_MANAGEMENT.PLEASE_SELECT_P_MENU_CODE'),
            trigger: 'blur'
          }
        ],
        pMenuName: [
          {
            required: true,
            message: this.$t('MENU_MANAGEMENT.PLEASE_SELECT_P_MENU'),
            trigger: 'blur'
          }
        ],
        url: [
          {
            required: true,
            message: this.$t('MENU_MANAGEMENT.PLEASE_INPUT_URL'),
            trigger: 'blur'
          }
        ],
        menuDescrible: [
          {
            required: this.statusFlag,
            message: this.$t('MENU_MANAGEMENT.PLEASE_INPUT_MENU_DESCRIBLE'),
            trigger: 'blur'
          }
        ]
      };
    }
  },
  data() {
    return {
      statusFlag: false, //???????????????????????????????????????????????????false????????????true
      confirmFlag: false, //??????????????????
      menuLevelFlag: false, //?????????????????????????????? ?????????????????????
      loading: false, //???????????????????????????
      subsetFlag: false, //?????????????????????
      ruleForm: {
        menuCode: '', //????????????
        menuName: '', //????????????
        menuLevel: '', //????????????
        status: '', //????????????
        pMenuCode: '', //??????????????????
        pMenuName: '', //????????????
        url: '', //?????????
        menuDescrible: '' //????????????
      },
      menuClazzList: [
        //??????????????????
        {
          value: '1',
          label: '??????'
        },
        {
          value: '2',
          label: '??????'
        },
        {
          value: '3',
          label: '??????'
        },
        {
          value: '4',
          label: '??????'
        },
        {
          value: '5',
          label: '??????'
        }
      ],
      menuStatusList: [
        //??????????????????
        {
          value: '0',
          label: '??????'
        },
        {
          value: '1',
          label: '??????'
        }
      ],
      pMenuList: [
        //????????????????????????
        {
          value: '1',
          label: '????????????1'
        },
        {
          value: '2',
          label: '????????????aaasas2'
        }
      ]
    };
  },
  watch: {},
  created() {},

  mounted() {
    let self = this;
    self.ruleForm = self.$route.query;
    self.selectStatus(self.ruleForm.status);
    console.log('self.children:', self.ruleForm);
    if (self.ruleForm.children && self.ruleForm.children.length > 0) {
      self.subsetFlag = true;
    }
    self.selectMenuLevel(self.ruleForm.menuLevel);
  },

  methods: {
    //??????
    submitForm() {
      let self = this;
      self.$refs.ruleForm.validate(valid => {
        if (valid) {
          console.log('this.ruleForm', self.ruleForm);
          self.confirmFlag = true;
        } else {
          console.log('error submit!!');
        }
      });
    },

    //??????--??????????????????????????????????????????
    cancel() {
      this.$router.push('/systemManagement/menuManagement');
      this.$store.commit(
        'tabs/DELETE_TABS',
        '/menuManagement/edit'
      );
    },

    //??????
    confirm() {
      let self = this;
      console.log('?????????', self.ruleForm);
      self.loading = true;

      menuEdit(self.ruleForm)
        .then(resp => {
          // console.log('resp:', resp);
          if (resp.body) {
            // self.$showMsg.success('???????????????');
            // self.$showMsg.success(self.$t('MENU_MANAGEMENT.EDIT_MENU_SUCCESS'));
            this.$showMsg({
              type: 'success',
              message: this.$t('MENU_MANAGEMENT.EDIT_MENU_SUCCESS')
            });
            this.cancel();
          } else {
            // self.$showMsg.error('????????????!');
          }
        })
        .finally(() => {
          console.log('????????????');
          self.loading = false;
        });
    },

    //?????????
    previousStep() {
      let self = this;
      self.confirmFlag = false;
    },

    //??????????????????
    selectStatus(e) {
      console.log('e', e);
      if (e === '0') {
        this.statusFlag = true;
      } else {
        this.statusFlag = false;
      }
    },

    //??????????????????
    selectMenuLevel(e) {
      let self = this;
      if (e === '1') {
        self.menuLevelFlag = false;
        self.ruleForm.pMenuCode = '';
        self.ruleForm.pMenuName = '';
      } else {
        let newMenuLevel = e - 1;
        self.menuLevelFlag = true;
        self.pMenuList = [];
        getMenuInfoList().then(resp => {
          resp.body.forEach(item => {
            if (item.menuLevel == newMenuLevel) {
              self.pMenuList.push(item);
            }
          });
          console.log('????????????????????????', self.pMenuList);
        });
      }
    },

    //????????????????????????
    selectPMenuCode(e) {
      // console.log('??????e', e);
      this.ruleForm.pMenuCode = e.menuCode;
      this.ruleForm.pMenuName = e.menuName;
    },

    //????????????????????????
    selectPMenuName(e) {
      this.ruleForm.pMenuCode = e.menuCode;
      this.ruleForm.pMenuName = e.menuName;
    }
  }
};
</script>

<style lang="scss" scoped>
.g-menuManagement-add {
  margin: 0;
  background: #fff;
  min-height: 100%;
  .g-form {
    padding: 20px;
    margin: 0 32%;
    /deep/ .el-input {
      width: 340px;
    }
    /deep/ .el-input__inner {
      width: 340px;
    }
  }
  .g-btn {
    display: flex;
    justify-content: center;
    align-content: center;
    // margin-top: 3.6%;
    padding-bottom: 30px;
    margin-left: 3%;
    button {
      width: 210px;
      height: 40px;
      border-radius: 4px;
      font-size: 18px;
      text-align: center;
      border-color: #f06b00;
    }
    .f-cancel {
      color: #f06b00;
    }
    .f-confirm {
      background: #f06b00;
      color: #ffffff;
    }
  }
  /deep/.el-textarea__inner {
    height: 120px;
    width: 340px;
  }
}
</style>
