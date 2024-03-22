const FormAutoFill = new Vue({
  el: '#app',
  data: {

    // Google Apps Script 部署為網路應用程式後的 URL
    gas: 'https://script.google.com/macros/s/AKfycbw9aX_9oC43oW7CnIF0w9YMKjjfIZPnwjiVwRhBQ2B9IjD51YRPZn8YpDm_yQMzPr5oeQ/exec',

    // name: '',
    id: '',

    // 避免重複 POST，存資料用的
    persons: {},

    // 頁面上吐資料的 data
    person: {},

    // Google Form 的 action URL
    formAction: 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSfLFQnkyH0pjGjZbFV-dw_O1Z7oAJ9SDgd4lO34BVFLRwi7tA/formResponse',
    
    // Google Form 各個 input 的 name
    input: {
      id: 'entry.1339314469',
      name: "entry.2132758197",
      phone: "entry.1937240046",
      area: "entry.2050668982",
      org: "entry.769254",
      note: "entry.1172474453"
    },

    // loading 效果要不要顯示
    loading: false
  },
  methods: {
    // ID 限填 4 碼
    limitIdLen(val) {
      if(val.length > 3) {
        return this.id =  this.id.slice(0, 3);
      }
    },
    // 送出表單
    submit() {
      // 再一次判斷是不是可以送出資料
      if(this.person.name !== undefined) {
        let params = `${this.input.id}=${this.person.id}&${this.input.name}=${this.person.name}&${this.input.phone}=${this.person.phone}&${this.input.area}=${this.person.area}&${this.input.org}=${this.person.org}&${this.input.note}=${this.person.message || '無'}`;
        fetch(this.formAction + '?' + params, {
          method: 'POST'
        }).catch(err => {
            alert('提交成功。');
            this.id = '';
            this.person = {};
          })
      }
    }
  },
  watch: {
   
    id: function(val) {
      // ID 輸入到 4 碼就查詢資料
      if(val.length === 3) {

        // this.persons 裡沒這筆資料，才 POST
        if(this.persons[this.id] === undefined) {
          this.loading = true;
          let uri = this.gas + '?id=' + this.id;
          fetch(uri, {
            method: 'POST'
          }).then(res => res.json())
            .then(res => {
              this.persons[this.id] = res; // 把這次查詢的 id 結果存下來
              this.person = res;
              this.loading = false;
            })
        }
        // this.persons 裡有資料就吐資料
        else {
          this.person = this.persons[this.id];
        }

      }
      
    }

 
  }
})