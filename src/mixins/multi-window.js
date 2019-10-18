/**
 * This mixin could be mixed into the page will open another sub page and the sub page must also have this mixin.
 * @author Johnny Miller (鍾俊), e-mail: johnnysviva@outlook.com
 * @date 2019-07-19 20:22
 */
// noinspection JSUnusedGlobalSymbols
export default {
  data () {
    return {
      // use dollar sign ($) to declare a locally private variable
      $multiPageConfiguration: {
        // Whether delay closing opened window for 300 ms. Default: true
        delayClosingWindow: true,
        windowOpener: null,
        openerCallBack: ''
      }
    }
  },
  mounted () {
    // get and store URL parameters
    this.$data.$multiPageConfiguration.delayClosingWindow = !!this.$route.query.delayClosingWindow
    this.$data.$multiPageConfiguration.openerCallBack = this.$route.query.callback
    // register Vue instance for callback use
    window.$vue = this
    // save the reference of window opener
    if (window.opener) {
      this.$data.$multiPageConfiguration.windowOpener = window.opener
    }
  },
  methods: {
    /**
     * Open a new window
     * @param url the page URL to be opened
     * @param options the parameters to be passed to the opened window
     */
    openWindow (url, options = {}) {
      if (!options.delayClosingWindow) {
        options.delayClosingWindow = true
      }
      const path = /\/$/.test(url) ? url : `${url}/`
      // the value of process.env.BASE_URL is equal to the `publicPath` configured in vue.config.js
      const baseUrl = process.env.BASE_URL
      const target = /^(http|https):\/\//.test(path) ? url : `${baseUrl}#${url}`
      // Passing information to opened window by query string
      let queryString = ''
      for (const key in options) {
        // Determines whether an object has a property with the specified name.
        if (!options.hasOwnProperty(key)) {
          break
        }
        const val = ((options[key] === null) || (options[key] === undefined) ? '' : options[key])
        queryString += queryString === '' ? `?${key}=${val}` : `&${key}=${val}`
      }
      const newWindow = window.open(`${target}${queryString}`)
      if (!newWindow) {
        this.$alert('Please give us permission to open new page', 'Error', {
          type: 'error',
          showClose: false,
          confirmButtonText: 'Sure'
        })
      }
    },
    /**
     * Back to last window (close opened window).
     * You may pass an object back to last window by setting an object argument to windowBack()
     */
    windowBack () {
      const windowOpener = this.$data.$multiPageConfiguration.windowOpener
      const openerCallBack = this.$data.$multiPageConfiguration.openerCallBack
      const delayClosingWindow = this.$data.$multiPageConfiguration.delayClosingWindow
      if (!windowOpener) {
        return
      }
      // Check whether opener's callback is valid
      if (openerCallBack && typeof windowOpener.$vue[openerCallBack] === 'function') {
        windowOpener.$vue[openerCallBack](...arguments)
      }
      if (delayClosingWindow === true) {
        setTimeout(() => {
          window.close()
        }, 300)
      } else {
        window.close()
      }
    }
  }
}
