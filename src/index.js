import videojs from 'video.js'

var dragMiddleware = function(player) {
  var playedTime = 0;
  return {
    // +++ Implement setSource() +++
    setSource: function setSource(srcObj, next) {
      next(null, srcObj);
    },
    currentTime: function(ct) {
      if (ct > playedTime) {
        playedTime = ct
      }
      return ct;
    },
    // +++ Alter the setCurrentTime method +++
    // 返回player.currentTime()表示不允许拖动，返回回ct表示可以拖动
    // player.currentTime()表示当前的播放时间， ct 表示要跳转的时间
    setCurrentTime: function setCurrentTime(ct) {
      // 超过dragTime不允许快进(允许快退)
      const dragTimeRes = player.dragTime || player.options_.dragTime
      let dragTime =  playedTime > dragTimeRes ? playedTime : dragTimeRes;

      if (
        player.options_.dragMode === 'backward'
        && dragTimeRes >= 0
        && Math.floor(ct) > dragTime
      ) {
        return player.currentTime();
      }

      if (player.options_.dragMode === 'disabled') {
        return player.currentTime();
      }

      return ct;
    }
  }
};

// Register the middleware with the player
videojs.use('*', dragMiddleware);

export default dragMiddleware;
