const FormAutoFill = new Vue({
  el: '#app',
  data: {

    // Google Apps Script 部署為網路應用程式後的 URL
    gas: 'https://script.google.com/macros/s/AKfycbxFepinSSqeB8FB8UmuzV_ewNfiMH_rASdQfsuiI7rGHBl4j6JBGSZbGmJrf43R26YsBQ/exec',

    name: '',

    // 避免重複 POST，存資料用的
    persons: {},

    // 頁面上吐資料的 data
    person: {},

    // Google Form 的 action URL
    formAction: 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSfLFQnkyH0pjGjZbFV-dw_O1Z7oAJ9SDgd4lO34BVFLRwi7tA/formResponse',
    
    // Google Form 各個 input 的 name
    input: {
      name: 'entry.2132758197',
      phone: 'entry.1937240046',
      area: 'entry.2050668982',
      org: 'entry.769254',
	    note: 'entry.1172474453'
    },

    // loading 效果要不要顯示
    loading: false
  },
  methods: {
    // name 限填 3 碼
    limitIdLen(val) {
      if(val.length > 3) {
        return this.name =  this.name.slice(0, 3);
      }
    },
    // 送出表單
    submit() {
      // 再一次判斷是不是可以送出資料
      if(this.person.name !== undefined) {
        let params = `${this.input.name}=${this.person.name}&${this.input.phone}=${this.person.phone}&${this.input.area}=${this.person.area}&${this.input.org}=${this.person.org}&${this.input.note}=${this.person.message || '無'}`;
        fetch(this.formAction + '?' + params, {
          method: 'POST'
        }).catch(err => {
            alert('提交成功。');
            this.name = '';
            this.person = {};
          })
      }
    }
  },
  watch: {
    name: function(val) {
      // name 輸入到 3 碼就查詢資料
      if(val.length === 3) {

        // this.persons 裡沒這筆資料，才 POST
        if(this.persons[this.name] === undefined) {
          this.loading = true;
          let uri = this.gas + '?name=' + this.name;
          fetch(uri, {
            method: 'POST'
          }).then(res => res.json())
            .then(res => {
              this.persons[this.name] = res; // 把這次查詢的 name 結果存下來
              this.person = res;
              this.loading = false;
            })
        }
        // this.persons 裡有資料就吐資料
        else {
          this.person = this.persons[this.name];
        }

      }
    }
  }
})