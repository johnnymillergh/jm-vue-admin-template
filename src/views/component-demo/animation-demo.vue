<template>
  <div class="animation-demo-container">
    <transition name="title">
      <h1 class="title" v-show="showTitle">Hello, world! This is a demo of animation using Vue.js</h1>
    </transition>
    <transition name="content">
      <div v-show="showContent" class="transition-concept-container">
        <h2>Core Concept of Transition Classes in Vue.js</h2>
        <p>There are six classes applied for enter/leave transitions.</p>
        <ol>
          <li><b>v-enter</b>: Starting state for enter. Added before element is inserted, removed one frame after
            element
            is
            inserted.
          </li>
          <li><b>v-enter-active</b>: Active state for enter. Applied during the entire entering phase. Added before
            element
            is inserted, removed when transition/animation finishes. This class can be used to define the duration,
            delay
            and easing curve for the entering transition.
          </li>
          <li><b>v-enter-to</b>: <strong>Only available in versions 2.1.8+.</strong> Ending state for enter. Added one
            frame
            after element is inserted (at the same time <b>v-enter</b> is removed), removed when transition/animation
            finishes.
          </li>
          <li><b>v-leave</b>: Starting state for leave. Added immediately when a leaving transition is triggered,
            removed
            after one frame.
          </li>
          <li><b>v-leave-active</b>: Active state for leave. Applied during the entire leaving phase. Added immediately
            when
            leave transition is triggered, removed when the transition/animation finishes. This class can be used to
            define
            the duration, delay and easing curve for the leaving transition.
          </li>
          <li><b>v-leave-to</b>: <strong>Only available in versions 2.1.8+.</strong> Ending state for leave. Added one
            frame
            after a leaving transition is triggered (at the same time <b>v-leave</b> is removed), removed when the
            transition/animation finishes.
          </li>
        </ol>
        <p><img class="transition-picture"
                src='https://vuejs.org/images/transition.png'
                alt='Transition Diagram'
                referrerPolicy='no-referrer'/></p>
        <p>Each of these classes will be prefixed with the name of the transition. Here the <b>v-</b> prefix is the
          default when you use a <b>&lt;transition&gt;</b> element with no name. If you use <b>&lt;transition name=&quot;my-transition&quot;&gt;</b>
          for example, then the <b>v-enter</b> class would instead be <b>my-transition-enter</b>.</p>
        <p><b>v-enter-active</b> and <b>v-leave-active</b> give you the ability to specify different easing curves for
          enter/leave transitions, which you’ll see an example of in the following section.</p>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'AnimationDemo',
  data () {
    return {
      showTitle: false,
      showContent: false
    }
  },
  mounted () {
    setTimeout(() => {
      this.showTitle = true
      this.showContent = true
    }, 300)
  }
}
</script>

<style lang="scss" scoped>
.title-enter-active {
  animation: title-in 2s;
}

@keyframes title-in {
  0% {
    transform: scale(0);
  }
  20% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}

.content-enter-active {
  transition: all .9s ease;
}

.content-enter {
  transform: translateY(128px);
  opacity: 0;
}

.animation-demo-container {
  padding: 20px;

  .title {
    width: 800px;
    margin: 0 auto;
  }

  .transition-concept-container {
    width: 800px;
    margin: 0 auto;

    .transition-picture {
      max-width: 100%;
    }
  }
}
</style>
