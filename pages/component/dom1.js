/*
 * @Date: 2022-07-26 14:11:23
 * @LastEditors: Cosima
 * @LastEditTime: 2022-07-26 14:24:22
 * @FilePath: \g6-in-react\pages\component\dom1.js
 */
import React from 'react'
import { Timeline } from 'antd'
import 'antd/es/timeline/style/css'
import styles from './index.css'
const NodeToolTips = ({ x, y }) => {
  return (
    <div className={styles.nodeTooltips} onClick={()=> {console.log('dom1----2')}}>
      <Timeline>
        <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
        <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
        <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
        <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
      </Timeline>
    </div>
  )
}

export default NodeToolTips
