import React, { useEffect, useState } from 'react';
import { data } from './data';
import G6 from '@antv/g6';
import { NodeTooltips, EdgeToolTips, NodeContextMenu } from './component'
import { Rect, Text, Circle, Image, Group, createNodeFromReact, appenAutoShapeListener } from '@antv/g6-react-node';
import './registerShape';

export default function () {
  const ref = React.useRef(null)
  let graph = null

  // 边tooltip坐标
  const [showEdgeTooltip, setShowEdgeTooltip] = useState(false)
  const [edgeTooltipX, setEdgeTooltipX] = useState(0)
  const [edgeTooltipY, setEdgeTooltipY] = useState(0)

  // 节点tooltip坐标
  const [showNodeTooltip, setShowNodeTooltip] = useState(false)
  const [nodeTooltipX, setNodeToolTipX] = useState(0)
  const [nodeTooltipY, setNodeToolTipY] = useState(0)

  // 节点ContextMenu坐标
  const [showNodeContextMenu, setShowNodeContextMenu] = useState(false)
  const [nodeContextMenuX, setNodeContextMenuX] = useState(0)
  const [nodeContextMenuY, setNodeContextMenuY] = useState(0)
  const bindEvents = () => {
    // 监听edge上面mouse事件
    graph.on('edge:mouseenter', evt => {
      const { item, target } = evt
      // debugger
      const type = target.get('type')
      if (type !== 'text') {
        return
      }
      const model = item.getModel()
      const { endPoint } = model
      // y=endPoint.y - height / 2，在同一水平线上，x值=endPoint.x - width - 10
      const y = endPoint.y - 15
      // const x = endPoint.x - 150 - 10
      const x = endPoint.x
      const point = graph.getCanvasByPoint(x, y)
      setEdgeTooltipX(point.x)
      setEdgeTooltipY(point.y)
      setShowEdgeTooltip(true)
    })

    graph.on('edge:mouseleave', () => {
      setShowEdgeTooltip(false)
    })

    // 监听node上面mouse事件
    graph.on('node:mouseenter', evt => {
      const { item } = evt
      const model = item.getModel()
      const { x, y } = model
      const point = graph.getCanvasByPoint(x, y)

      setNodeToolTipX(point.x - 75)
      setNodeToolTipY(point.y + 15)
      // setShowNodeTooltip(true)
    })

    // 节点上面触发mouseleave事件后隐藏tooltip和ContextMenu
    graph.on('node:mouseleave', () => {
      setShowNodeTooltip(false)
      setShowNodeContextMenu(false)
    })

    // 监听节点上面右键菜单事件
    graph.on('node:contextmenu', evt => {
      const { item } = evt
      const model = item.getModel()
      const { x, y } = model
      const point = graph.getCanvasByPoint(x, y)
      setNodeContextMenuX(point.x)
      setNodeContextMenuY(point.y)
      setShowNodeContextMenu(true)
    })
  }

  useEffect(() => {
    if (!graph) {
      const miniMap = new G6.Minimap()
      graph = new G6.Graph({
        // fitView: true,
        // fitViewPadding: [20, 40, 50, 20],
        container: ref.current,
        width: 1400,
        height: 1000,
        modes: {
          default: ['drag-canvas']
        },
        renderer: 'svg',
        defaultNode: {
          shape: 'react-node',
          // 节点文本样式
          labelCfg: {
            style: {
              fill: '#000000A6',
              fontSize: 10
            }
          },
          // 节点默认样式
          style: {
            stroke: '#72CC4A',
            width: 150
          }
        },
        defaultEdge: {
          shape: 'polyline'
        },
        // 节点交互状态配置
        nodeStateStyles: {
          hover: {
            stroke: 'red',
            lineWidth: 3
          }
        },
        edgeStateStyles: {
          hover: {
            stroke: 'blue',
            lineWidth: 3
          }
        },
        layout: {
          type: 'dagre',
          rankdir: 'TB',
          nodesep: 60,
          ranksep: 30
        },
        plugins: [miniMap]
      })
    }

    graph.data(data)

    graph.render()

    const edges = graph.getEdges()
    edges.forEach(edge => {
      const line = edge.getKeyShape()
      const stroke = line.attr('stroke')
      const targetNode = edge.getTarget()
      targetNode.update({
        style: { stroke }
      })
    })
    graph.paint()
    appenAutoShapeListener(graph);

    bindEvents()
  }, [])

  return (
    <div ref={ref}>
      {showEdgeTooltip && <EdgeToolTips x={edgeTooltipX} y={edgeTooltipY} />}
      {showNodeTooltip && <NodeTooltips x={nodeTooltipX} y={nodeTooltipY} />}
      {showNodeContextMenu && <NodeContextMenu x={nodeContextMenuX} y={nodeContextMenuY} />}
    </div>
  );
}
