# 拖拽控制

---

videojs的拖拽控制中间件（videojs6+）

## 何时使用

- 需要给videojs播放器控制其拖拽的时候

## 浏览器支持

IE 9+

## 安装

```bash
npm install @my-videojs/videojs-drag-middleware --save
```

## 运行

```bash
# 默认开启服务器，地址为 ：http://local:8000/

# 能在ie9+下浏览本站，修改代码后自动重新构建，且能在ie10+运行热更新，页面会自动刷新
npm run start

# 构建生产环境静态文件，用于发布文档
npm run site
```

## 代码演示

### 基本

控制videojs的拖拽

```jsx
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import "@my-videojs/videojs-drag-middleware/lib"

class App extends React.Component {
  componentDidMount () {
    const node = ReactDOM.findDOMNode(this.videoWrap)
    if (!node) {
      return
    }
    const videoJsOptions = {
      controls: true,
      dragMode: 'backward', // 只能快退
      sources: [{
        src: '//clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
        type: 'video/mp4'
      }],
      dragMode: 'backward' // 只能快退
    }
    // react0.14.x data-reactid问题
    const videoEl = document.createElement('video')
    videoEl.className = `video-js`

    node.appendChild(videoEl)
    this.player = videojs(videoEl, {...videoJsOptions}, () => {
      // this.player.drag()
    })
  }
  componentWillUnmount () {
    if (this.player) {
      this.player.dispose()
    }
  }
  setDragTime = () => {
    if (this.player) {
      console.log(this.input.value)
      this.player.dragTime = parseInt(this.input.value) || 0
    } else {
      alert('播放器未初始化完成！')
    }
  }
  render() {
    return (
      <div>
        <div data-vjs-player ref={node => { this.videoWrap = node }} />
        <br />
        <input ref={node => this.input = node} />
        <button onClick={this.setDragTime}>动态设置可拖拽时间</button>
      </div>
    )
  }
}

ReactDOM.render(<App />, mountNode);
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| dragTime | 拖动起始时间(秒) | number | 无 |
| dragMode | 拖动模式,分为不能拖动，不能快进，不传表示无限制。可以和dragTime配合使用，具体可以见上面例子说明 | enum{'backword', 'disabled'} | 无 |
