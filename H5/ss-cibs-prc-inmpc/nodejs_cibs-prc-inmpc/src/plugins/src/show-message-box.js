/*
 * @Author: ZhangZhen
 * @Date: 2021-11-09 11:24:26
 * @LastEditTime: 2022-06-08 15:13:56
 * @LastEditors: ZhangZhen
 * @Description: Zz's design
 * @FilePath: \ss-cibs-prc-inmpc\nodejs_cibs-prc-inmpc\src\plugins\src\show-message-box.js
 */
import Vue from 'vue';
import {
  MessageBox
} from 'element-ui';
import {
  setElStyles
} from '@/utils/tools';

/**
 * zz's design: show-box
 * @param {import('../types/show-message-box').ShowBoxOptions} options
 * @example this.$showBox({ title: 'title', content: 'content', confirm: () => {}, cancel: () => {} })
 * @return {void} render-without-return-value
 */
export default (options) => {
  /** destruct-options */
  const {
    title = '',
    content = '',
    confirm = () => {},
    cancel = () => {},
    showCancelButton = true,
    confirmButtonText,
    cancelButtonText,
    removeDelay,
  } = options;

  /** @description h: render-function */
  const h = new Vue().$createElement;
  /** filter-render-content */
  const showContent = ((c) => {
    if (typeof (c) === 'string') {
      if (c.length) {
        return c;
      } else {
        return 'MESSAGE IS EMPTY';
      }
    } else {
      // VNode | VNode[]
      return c || 'MESSAGE IS EMPTY';
    }
  })(content);

  /**
   * MessageBox called (refer to ElementUI)
   */
  MessageBox({
    title,
    showClose: false,
    center: true,
    showConfirmButton: true,
    showCancelButton: showCancelButton,
    distinguishCancelAndClose: true,
    confirmButtonClass: 'confirm-msg-box-btn',
    cancelButtonClass: 'cancel-msg-box-btn',
    confirmButtonText,
    cancelButtonText,
  
    message: h(
      'div', {
        style: {
          textAlign: 'center'
        }
      },
      [
        h(
          'img', {
            attrs: {
              src: require('../assets/imgs/warning.png')
            },
            style: {
              width: '60px',
              height: '60px'
            }
          },
          ''
        ),
        h(
          'p', {
            style: {
              fontWeight: '600',
              color: '#323c41',
              paddingBottom: '19px',
              fontSize: '16px'
            },
          },
          showContent
        )
      ]
    ),
    beforeClose: (action, instance, done) => {
      switch (action) {
        case 'confirm':
          confirm();
          break;
        case 'cancel':
          cancel();
          break;
        default:
          /**
           * default close
           */
          if (typeof(removeDelay) === 'number') {
            setTimeout(() => {
              const oMsgBox = document.getElementsByClassName('el-message-box__wrapper')[0],
                oMask = document.getElementsByClassName('v-modal')[0];
              if (oMsgBox) {
                oMsgBox.remove();
              }
              if (oMask) {
                oMask.remove();
              }
            }, removeDelay);
          }
          break;
      }

      done();
    }
  });

  setIsShowBox(title, content);

  removeSelf(removeDelay);
};

/**
 * ????????????/????????????????????????????????????
 * @param {string} title ???????????????
 * @param {string|import('vue').VNode|import('vue').VNode[]} content ???????????????
 */
function setIsShowBox(title, content) {
  const oMessageBox = document.querySelector('.el-message-box');

  if (oMessageBox) {
    const oHeader = oMessageBox.querySelector('.el-message-box__header');
    const oContent = oMessageBox.querySelector('.el-message-box__content');

    const isShowHeader = title.length > 0;

    setElStyles(oContent, {
      padding: '20px 10px 0 10px',
      // display: isShowContent ? 'block' : 'none'
    });
    setElStyles(oHeader, {
      display: isShowHeader ? 'block' : 'none'
    });
  }
}

/**
 * ???????????????????????????
 * @param {number} removeDelay
 * @param {'confirm' | 'cancel'} type
 */
function removeSelf(removeDelay, type = 'cancel') {
  if (typeof(removeDelay) === 'number') {
    let t = setTimeout(() => {
      const cancelBtn = document.getElementsByClassName(`${type}-msg-box-btn`)[0];
      const oMsgBox = document.getElementsByClassName('el-message-box__wrapper')[0]
      // ?????????????????????????????????
      if (oMsgBox) {
        if (oMsgBox.style.display !== 'none') {
          if (document.all) {
            cancelBtn.click();
          } else {
            const event = document.createEvent('MouseEvents');
            event.initEvent('click', true, true);
            cancelBtn.dispatchEvent(event);
          }
        }
      }
      clearTimeout(t);
      t = null;
    }, removeDelay);
  }
}

