!function() {
  "use strict";
  new Vue({
    el: "#app",
    data: {
      // gas部署後，複製 "網頁應用程式" 的網址
      gas: "https://script.google.com/macros/s/AKfycbwkMahdAnWP8kGqEZvT1pKsifiGEmwbTLKQsVKah7ssunVawV_4jzX-XP_5fvf7DYW7EA/exec",
      name: "",     // 清空name
      phone: "",    // 清空phone
      persons: {},  // 清空persons
      person: {
        join_type : "現場" 
      },   // 清空person

      // 首次登錄表單頁面點選F12，在元素頁籤中查詢 "<form"，action=後面的那串網址
      formAction: "https://docs.google.com/forms/u/0/d/e/1FAIpQLScdilOxXRm3cScT8uk2z_t-KDH--Mqy3lD_ZQrf1Vng7faPdw/formResponse",
      
      // 首次登錄表單頁面點選F12，在元素頁籤中查詢 "entry."，查詢每個欄位所對應的entry編號
      input: {
        name: 'entry.2132758197',      // 首次登錄表單欄位：姓名
        gender: 'entry.484563647',     // 首次登錄表單欄位：性別
        phone: 'entry.1937240046',     // 首次登錄表單欄位：電話
        area: 'entry.2050668982',      // 首次登錄表單欄位：地區
        district: 'entry.527397194',   // 首次登錄表單欄位：座談會地區
        org_1: 'entry.883603394',      // 首次登錄表單欄位：系統
        org_2: 'entry.686627579',      // 首次登錄表單欄位：支部/準支部/法座
        age: 'entry.1818800730',       // 首次登錄表單欄位：出生年份
        dept: 'entry.769254',          // 首次登錄表單欄位：學生部/青年部/一般/幼兒
        join_type: 'entry.57473509',   // 首次登錄表單欄位：參加形式
        consent: 'entry.1350156201'    // 首次登錄表單欄位：同意資料蒐集
      },
      loading: !1 //是否顯示loading
    },
    methods: {
      // 電話 最多 10 碼
      limitIdLen(val) {
        if(val.length > 10) {
        return this.phone =  this.phone.slice(0, 10);
        }
      },

      // 送出資料至 首次登錄表單 頁籤
      submit: function() {

        var t = this;
          // 參加形式如未選擇，則預設回答為 現場
          if(0 === this.person.join_type){
            this.person.join_type = "現場";
          }

          document.getElementById('name').addEventListener('input', function() {
            // 获取用户输入的名字
            person.name = this.value;
          });
          console.log("person.name=",person.name);

          var n = ""
            .concat(this.input.name, "=")
            .concat(this.person.name, "&")
            .concat(this.input.gender, "=")
            .concat(this.person.gender, "&")
            .concat(this.input.age, "=")
            .concat(this.person.age, "&")
            .concat(this.input.phone, "=")
            .concat(this.person.phone, "&")
            .concat(this.input.area, "=")
            .concat(this.person.area, "&")
            .concat(this.input.district, "=")
            .concat(this.person.district, "&")
            .concat(this.input.org_1, "=")
            .concat(this.person.org_1, "&")
            .concat(this.input.org_2, "=")
            .concat(this.person.org_2, "&")
            .concat(this.input.dept, "=")
            .concat(this.person.dept, "&")
            .concat(this.input.join_type, "=")
            .concat(this.person.join_type, "&")
            .concat(this.input.date, "=")
            .concat(this.person.date, "&")
            .concat(this.input.consent, "=")
            .concat(this.person.consent || "");
          // POST到首次登錄表單，填寫資料
          console.log("log:n=",n);
          var currentTime = new Date();
          var formattedTime = currentTime.getFullYear()+"-"+(currentTime.getMonth() + 1).toString().padStart(2, '0')+"-"+currentTime.getDate().toString().padStart(2, '0')+" "+currentTime.getHours().toString().padStart(2, '0')+":"+currentTime.getMinutes().toString().padStart(2, '0')+":"+currentTime.getSeconds().toString().padStart(2, '0');
          var submitdata = this.person.name+ " 報到成功 \n時間：" + formattedTime + " \n \n請保留此畫面，作為入場憑證。";
          
          fetch(this.formAction + "?" + n, { method: "POST" }).catch(function(n) {
            alert(submitdata), t.name = "",t.phone="", t.person = {join_type : "現場" }, t.persons ={};
          });
        
      }
  }
  });
}();
