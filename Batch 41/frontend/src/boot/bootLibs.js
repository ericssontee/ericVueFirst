import { boot } from 'quasar/wrappers'
import wings from 'wings4'
import VueChartkick from 'vue-chartkick'
import 'chartkick/chart.js'
import { read, writeFile, utils } from 'xlsx'
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
pdfMake.vfs = pdfFonts.pdfMake.vfs

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app, router }) => {
  // something to do
  app.use(VueChartkick)
  app.config.globalProperties.$pdfMake = pdfMake
  app.config.globalProperties.$wings = wings('http://localhost:3030')
  app.config.globalProperties.$xlsxRead = read
  app.config.globalProperties.$xlsxWrite = writeFile
  app.config.globalProperties.$xlsxUtils = utils
})
