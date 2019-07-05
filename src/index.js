import videojs from 'video.js'

var dragMiddleware = function(player) {
  return {
    // +++ Implement setSource() +++
    setSource: function setSource(srcObj, next) {
      next(null, srcObj);
    },
    // +++ Alter the setCurrentTime method +++
    setCurrentTime: function setCurrentTime(ct) {

      // 超过dragTime不允许快进(允许快退)
      if ( player.options_.dragMode === 'backward'
        && player.options_.dragTime
        && ct <= player.options_.dragTime
      ) {
        return ct;
      }
      // 不允许快进
      if (player.options_.dragMode === 'backward' && ct < player.currentTime()) {
        return ct;
      }
      // 超过dragTime不允许快退(允许快进)
      if ( player.options_.dragMode === 'forward'
        && player.options_.dragTime
        && ct > player.options_.dragTime) {
        return ct;
      }
      // 不允许快退
      if (player.options_.dragMode === 'forward' && ct > player.currentTime()) {
        return ct;
      }

      if (player.options_.dragMode === 'disabled') {
        return player.currentTime();
      }

      return player.currentTime();
    }
  }
};

// Register the middleware with the player
videojs.use('*', dragMiddleware);

export default dragMiddleware;
