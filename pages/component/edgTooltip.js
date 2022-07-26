/*
 * @Date: 2022-07-22 11:58:28
 * @LastEditors: Cosima
 * @LastEditTime: 2022-07-22 15:59:39
 * @FilePath: \g6-in-react\pages\component\edgTooltip.js
 */
import React from 'react'
import styles from './index.css'

const EdgeToolTips = ({ x, y }) => {
  console.log(x, y, 'x---y---1');
  return (
    <div className={styles.edgeTooltips} style={{ top: `${y}px`, left: `${x}px` }}>
      <div className={styles.edgeDel}>

      </div>
      {/* <div className={styles.edgeTitle}>
        <p className={styles.tooltipsCommon}>凭证开立</p>
        <p className={`${styles.tooltipsCommon} ${styles.tooltipsMoney}`}>1000,000,000元</p>
        <p className={`${styles.tooltipsCommon} ${styles.tooltipsDate}`}>2019-09-10</p>
      </div> */}
      {/* <div className={styles.edgeDetail}>
        <div className={styles.detailContent}>
          <p className={styles.edgeCode}>交易编码：</p>
          <span className={styles.edgeValue}>1000190203455</span>
        </div>
        <div className={styles.detailContent}>
          <p className={styles.edgeCode}>交易编码：</p>
          <span className={styles.edgeValue}>1000190203455</span>
        </div>
        <div className={styles.detailContent}>
          <p className={styles.edgeCode}>交易编码：</p>
          <span className={styles.edgeValue}>1000190203455</span>
        </div>
      </div> */}
    </div>
  )
}

export default EdgeToolTips
