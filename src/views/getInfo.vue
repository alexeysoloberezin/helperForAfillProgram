<template>
  <div class="container mfo">
    <h1>Get Info for MFO</h1>
    {{ isArray }}
    <div style="display: flex;align-items: center;">
      <label for="">Автоматическое заполение по таске:</label>
      <textarea v-model="autoTask" @change="autoTaskStart" style="min-height: 200px;padding: 30px" placeholder="autoTask"></textarea>
    </div>
<!--    <div style="display: flex;align-items: center;">-->
<!--      <label for="">Получать несколько обьектов сразу:</label>-->
<!--      <input type="checkbox" v-model="isArray" >-->
<!--      <p v-if="isArray">Example: example1, exampl2   - сплит происходит через ,</p>-->
<!--      <p v-else>U can use just text in inputs</p>-->
<!--    </div>-->
    <div style="display: flex;align-items: center;">
      <label for="">ProgramUrl.Carmoney:</label>
      <input type="text" v-model="url" placeholder="ProgramUrl.Carmoney" style="width: 100%;">
    </div>
    <div style="display: flex;align-items: center;">
      <label for="">Meta Description:</label>
      <input type="text" v-model="description" placeholder="Meta Description" style="width: 100%;">
    </div>
      <div style="display: flex;align-items: center;">
      <label for="">About Description:</label>
      <input type="text" v-model="aboutDescription" placeholder="About Description" style="width: 100%;">
    </div>
    <div style="display: flex;align-items: center;">
      <label for="">Meta Title:</label>
      <input type="text" v-model="title" placeholder="Meta Title" style="width: 100%;">
    </div>
    <div style="display: flex;align-items: center;">
      <label for="">Logo img name:</label>
      <input type="text" v-model="logoImg" placeholder="Logo img" style="width: 100%;">
    </div>
    <div style="display: flex;align-items: center;">
      <label for="">Convert in WEBP:</label>
      <input type="checkbox" v-model="convertToWebp" >
    </div>
    <div style="display: flex;align-items: center;">
      <label for="">Remove Images Before Start:</label>
      <input type="checkbox" v-model="removeImages" >
    </div>
    <div style="display: flex;align-items: center;">
      <label for="">Mfo name main (exaple: Carmoney):</label>
      <input type="text" v-model="name" placeholder="Mfo name main (exaple: Carmoney)" style="width: 100%;">
    </div>
    <div style="display: flex;align-items: center;">
      <label for="">Name image:</label>
      <input type="text" v-model="nameImage" placeholder="Name image" style="width: 100%;">
    </div>
    <textarea v-model="html" style="min-height: 200px;padding: 30px" placeholder="HTML CARDS"></textarea>
    <button class="btn" v-if="!loading" @click="getInfo">
      GET INFO
    </button>

    <div v-else>loading...</div>

    <div v-if="imagesReady">
      <a  class="btn" :href="`http://localhost:1221/downloadImage`"  >
        Download Files
      </a>
      <button class="btn" @click="copy">Copy Code</button>
      <a class="btn" target="_blank" href="https://www.convertsimple.com/convert-json-to-javascript/">JSON to JS</a>
    </div>

    <div v-if="status.length > 0">
      <div v-for="st in status" :style="{color: st.status === 'Error' ? 'red' : 'green'}">{{ st }}</div>
    </div>

    <pre style="text-align: initial">
      <code>
        {{ res }}
      </code>
    </pre>
  </div>
</template>

<script>
import api from "../plugins/api";
import {createProgramMfo, htmlMFO} from "../programs/mfo";

export default {
  name: "getInfo",
  data(){
    return {
      isArray: true,
      html: htmlMFO || '',
      aboutDescription: '',
      autoTask: `Исходная информация:
Необходимо сверстать страницу Vivus.

Фактический результат:
url: /vivus/

Макет - Пампаду_внешний  

Title: Партнерская программа Vivus  - подключиться

Description: Станьте агентом партнерской программы Vivus и получайте коммиссионное вознаграждение привлекая новых клиентов, регистрируйтесь на платформе Пампаду и зарабатывайте

Указать продукты: 

Личный кабинет агента - получайте до 50% с продаж страховых полисов и до 12 000 руб. за банковские продукты 

Лого продукта взять из ЛК, сумму выплат. 

Добавить ссылку на странице листинга МФО.

Текст для блока о МФО:

Реклама офферов МФО разрешена через контентные сайты (seo трафик), контекст (яндексдирект, google adwords), баннеры (adspot/richmedia/sliding), таргетированная реклама в соц. сетях (vk, mt, tiktok), посты в группах/каналах (vk, tg, whatsapp), мобильные приложения (ios, android), видео контент (youtube, rutube, vimeo), колл-центр, рассылки в мессенджерах (tg, whatsapp, viber), чат-боты (tg, whatsapp, vk), push - уведомления, rtb (real-time bidding).

В то же время категорически недопустим спам в любых проявлениях: контекст на бренд, тизерные сети, таргетированная реклама в соц. сетях (fb, instagram), брокерский трафик, api трафик, дорвеи, cashback/промокоды, email – рассылки, sms – рассылки, clickunder/popunder/popup, мотивированный трафик, toolbar, adult трафик.`,
      url: `ProgramUrl.`,
      title: ``,
      name: ``,
      logoImg: ``,
      removeImages: true,
      convertToWebp: true,
      nameImage: ``,
      description: ``,
      loading: false,
      imagesReady: false,
      imagesName: null,
      res: [],
      status: []
    }
  },

  methods: {
    parseData(str) {
      const name = str.match(/Необходимо сверстать страницу (.+)\./)[1]
      this.url = 'ProgramUrl.' + name
      this.title = str.match(/Title: (.+)/)[1];
      this.description = str.match(/Description: (.+)/)[1];
      this.name = name
      this.nameImage = name
      this.logoImg = name
      const mfoInfo = str.match(/Текст для блока о МФО:(.+)/s);
      console.log('mfoInfo', mfoInfo)
      if (mfoInfo) {
        this.aboutDescription = mfoInfo[1].trim();
      }

    },
    autoTaskStart(){
      console.log(this.parseData(this.autoTask))
    },
    copy(){
      const content = JSON.stringify(this.res)

      const tempElement = document.createElement('textarea');
      tempElement.value = content;

      document.body.appendChild(tempElement);
      tempElement.select();
      document.execCommand('copy');

      document.body.removeChild(tempElement);

      console.log('Контент скопирован в буфер обмена:', content);
    },
    async getInfo(){
      this.res = []
      this.status = []
      this.loading = true
      this.imagesReady = false

        const keys = ['url', 'title', 'name', 'logoImg', 'nameImage', 'description', 'aboutDescription']
        let length = this.url.split('||').length
        const arr = []

        for (let i = 0; i < length; i++) {
          const obj = {}
          keys.forEach(key => {
            const strArr = this[key].split('||').map(item => item.trim())
            obj[key] = strArr[i] || ''
          })
          arr.push(obj)
        }

        try{
          for (let i = 0; i < length; i++) {
            await this.fetchData(arr[i])
          }
        }catch (err){
          console.log('err', err)
          this.loading = false
        }
    },
    fetchData({url,title,name,logoImg,nameImage,description, aboutDescription}){
      api.post('/getInfo', {
        offerCards: this.html,
        name: name || this.name,
        convertToWebp: this.convertToWebp,
        nameImage: nameImage || this.nameImage,
        removeImages: this.removeImages
      }).then((res) => {
        console.log(res)
        if(res.data.imagesReady){
          this.imagesReady = true
        }

        let response = createProgramMfo({
          metaTitle: title || this.title,
          metaDescritpion: description || this.description,
          url: url || this.url,
          aboutDescription: aboutDescription || this.aboutDescription,
          offersCards: res.data.data.map((item, index) => {
            return {
              title: item.title,
              type: 'OfferType.Basic',
              commission: item.commission,
              icon: `require('images/affiliate-program/mfo/${(logoImg || this.logoImg) + '_' + (index + 1)}.webp')`,
              basicLink: 'https://agents.pampadu.ru/#/register/',
            }
          }),
          name: name || this.name,
          logoImg: logoImg || this.logoImg
        })
        this.res.push(response)
        this.status.push({
          message: `Success (${name})`,
          status: 'Success',

        })
      }).catch((err) => {
        this.status.push({
          message: err?.response?.data?.err || err?.message,
          status: 'Error'
        })
      }).finally((res) => {
        this.loading = false
      })
    }
  }
}
</script>

<style scoped lang="scss">
.mfo{
  label{
    width: 240px;
    text-align: left;
  }
}
</style>