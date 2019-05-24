import React, { Component } from 'react';
import { Stage, Layer } from 'react-konva';
import URLImage from './URLImage';

import Background from './Background';
/**
 * 提示 不支持手机竖屏查看
 */
class Note extends Component {

    render() {
        let { width, height } = this.props;
        return (
            <Stage width={width} height={height}>
                <Layer> 
                    <Background width={width} height={height} />
                    <URLImage src="http://preview2.williamsleatag.cn/shanghai/WLT/Snowman/images/app_rotate_to_play.png" x={width*0.1} width={width*0.8} height={width*.58*0.8} y={(height - width*0.8*0.58)/2}></URLImage> 
                </Layer>
            </Stage>
        )
    }
}

export default Note;