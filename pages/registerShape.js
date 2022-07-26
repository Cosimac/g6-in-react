import React from 'react';
import G6 from '@antv/g6'
import { Rect, Text, Circle, Image, Group, createNodeFromReact } from '@antv/g6-react-node';
const colorMap = {
  'name1': '#72CC4A',
  'name2': '#1A91FF',
  'name3': '#FFAA15'
}

const Tag = ({ text, color }) => (
  <Rect
    style={{
      fill: color,
      padding: [5, 10],
      width: 'auto',
      radius: [4],
      margin: [0, 8],
    }}
  >
    <Text style={{ fill: '#fff', fontSize: 10 }}>{text}</Text>
  </Rect>
);

const Card = ({ cfg }) => {
  const { collapsed = false } = cfg;

  return (
    <Group class="a" className="b" draggable>
      <Rect
        style={{
          width: 400,
          height: 'auto',
          fill: '#fff',
          stroke: '#ddd',
          shadowColor: '#eee',
          shadowBlur: 30,
          radius: [8],
          justifyContent: 'center',
          padding: [18, 0],
        }}
        draggable
      >
        <Text
          style={{
            fill: '#000',
            margin: [0, 24],
            fontSize: 16,
            fontWeight: 'bold',
          }}
        >
          这是一个卡片
        </Text>
        <Text style={{ fill: '#ccc', fontSize: 12, margin: [12, 24] }}>
          我是一段特别特别特别特别特别特别特别长的描述
        </Text>
        {collapsed && (
          <Group>
            <Image
              style={{
                img: 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg',
                width: 200,
                height: 200,
                margin: [24, 'auto'],
              }}
            />
            <Rect style={{ width: 'auto', flexDirection: 'row', padding: [4, 12] }}>
              <Tag color="#66ccff" text="我是" />
              <Tag color="#66ccff" text="很多个" />
              <Tag color="#66ccff" text="很多个的" />
              <Tag color="#66ccff" text="标签" />
            </Rect>
          </Group>
        )}
        <Circle
          style={{
            position: 'absolute',
            x: 380,
            y: 20,
            r: 5,
            fill: collapsed ? 'blue' : 'green',
          }}
        >
          <Text
            style={{
              fill: '#fff',
              fontSize: 10,
              margin: [-6, -3, 0],
              cursor: 'pointer',
            }}
            onClick={(evt, node, shape, graph) => {
              console.log(123);
              graph.updateItem(node, {
                collapsed: !collapsed,
              });
            }}
          >
            {collapsed ? '-' : '+'}
          </Text>
        </Circle>
      </Rect>
    </Group>
  );
};

G6.registerNode('react-node', createNodeFromReact(Card));

G6.registerNode('node', {
  drawShape: function drawShape (cfg, group) {
    const width = cfg.style.width;
    const stroke = cfg.style.stroke;
    const rect = group.addShape('rect', {
      attrs: {
        x: -width / 2,
        y: -15,
        width,
        height: 30,
        radius: 15,
        stroke,
        lineWidth: 0.6,
        fillOpacity: 1,
        fill: '#fff'
      }
    });
    const point1 = group.addShape('circle', {
      attrs: {
        x: -width / 2,
        y: 0,
        r: 3,
        fill: stroke
      }
    });
    const point2 = group.addShape('circle', {
      attrs: {
        x: width / 2,
        y: 0,
        r: 3,
        fill: stroke
      }
    });
    return rect;
  },
  getAnchorPoints: function getAnchorPoints () {
    return [[0, 0.5], [1, 0.5]];
  },
  update: function (cfg, item) {
    const group = item.getContainer()
    const children = group.get('children')
    const node = children[0]
    const circleLeft = children[1]
    const circleRight = children[2]

    const { style: { stroke }, labelStyle } = cfg

    if (stroke) {
      node.attr('stroke', stroke)
      circleLeft.attr('fill', stroke)
      circleRight.attr('fill', stroke)
    }
  }
},
  'single-shape'
);

G6.registerNode(
  'rect-xml',
  (cfg) => `
    <rect style={{
      width: 100, height: 20, fill: '#1890ff', stroke: '#1890ff', radius: [6, 6, 0, 0]
    }} keyshape="true" name="test">
      <text style={{ 
        marginTop: 2, 
        marginLeft: 50, 
        textAlign: 'center', 
        fontWeight: 'bold', 
        fill: '#fff' }} 
        name="title">${cfg.label || cfg.id}</text>
      <polygon style={{
        points:[[ 30, 30 ], [ 40, 20 ], [ 30, 50 ], [ 60, 100 ]],
            fill: 'red'
      }} />
          <polyline style={{ points: [[ 30, 30 ], [ 40, 20 ], [ 60, 100 ]] }} />
          <image style={{ img: 'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png', width: 48, height: 48, marginTop: 100 }} />
    </rect>
  `,
);

G6.registerNode(
  'dom-node',
  {
    draw: function draw (cfg, group) {
      return group.addShape('dom', {
        attrs: {
          width: cfg.size[0],
          height: cfg.size[1],
          // 传入 DOM 的 html
          html: `
            <div class="abc" style="background-color: #fff; border: 2px solid #5B8FF9; border-radius: 5px; width: ${cfg.size[0] - 5
            }px; height: ${cfg.size[1] - 5}px; display: flex;">
              <div style="height: 100%; width: 33%; background-color: #CDDDFD">
                <img alt="img" style="line-height: 100%; padding-top: 6px; padding-left: 8px;" src="https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Q_FQT6nwEC8AAAAAAAAAAABkARQnAQ" width="20" height="20" />  
              </div>
              <div id="dom1">
                
              </div>
              <span style="margin:auto; padding:auto; color: #5B8FF9">${cfg.label}</span>
            </div>
          `,
        },
        draggable: true,
      });
    },
  },
  'single-node',
);

G6.registerEdge('polyline', {
  itemType: 'edge',
  draw: function draw (cfg, group) {
    const startPoint = cfg.startPoint;
    const endPoint = cfg.endPoint;

    const Ydiff = endPoint.y - startPoint.y;

    const slope = Ydiff !== 0 ? 500 / Math.abs(Ydiff) : 0;

    const cpOffset = 16;
    const offset = Ydiff < 0 ? cpOffset : -cpOffset;

    const line1EndPoint = {
      x: startPoint.x + slope,
      y: endPoint.y + offset
    };
    const line2StartPoint = {
      x: line1EndPoint.x + cpOffset,
      y: endPoint.y
    };

    // 控制点坐标
    const controlPoint = {
      x:
        ((line1EndPoint.x - startPoint.x) * (endPoint.y - startPoint.y)) /
        (line1EndPoint.y - startPoint.y) +
        startPoint.x,
      y: endPoint.y
    };

    let path = [
      ['M', startPoint.x, startPoint.y],
      ['L', line1EndPoint.x, line1EndPoint.y],
      [
        'Q',
        controlPoint.x,
        controlPoint.y,
        line2StartPoint.x,
        line2StartPoint.y
      ],
      ['L', endPoint.x, endPoint.y]
    ];

    if (Ydiff === 0) {
      path = [
        ['M', startPoint.x, startPoint.y],
        ['L', endPoint.x, endPoint.y]
      ];
    }

    const line = group.addShape('path', {
      attrs: {
        path,
        stroke: colorMap[cfg.data.type],
        lineWidth: 1.2,
        endArrow: false
      }
    });

    const labelLeftOffset = 8;
    const labelTopOffset = 8;
    // amount
    const amount = group.addShape('text', {
      attrs: {
        text: cfg.data.amount,
        x: line2StartPoint.x + labelLeftOffset,
        y: endPoint.y - labelTopOffset - 2,
        fontSize: 14,
        textAlign: 'left',
        textBaseline: 'middle',
        fill: '#000000D9'
      }
    });
    // type
    const type = group.addShape('text', {
      attrs: {
        text: cfg.data.type,
        x: line2StartPoint.x + labelLeftOffset,
        y: endPoint.y - labelTopOffset - amount.getBBox().height - 2,
        fontSize: 10,
        textAlign: 'left',
        textBaseline: 'middle',
        fill: '#000000D9'
      }
    });
    // date
    const date = group.addShape('text', {
      attrs: {
        text: cfg.data.date,
        x: line2StartPoint.x + labelLeftOffset,
        y: endPoint.y + labelTopOffset + 4,
        fontSize: 12,
        fontWeight: 300,
        textAlign: 'left',
        textBaseline: 'middle',
        fill: '#000000D9'
      }
    });
    return line;
  }
});