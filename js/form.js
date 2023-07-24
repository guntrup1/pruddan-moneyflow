"use strict";
        
        
        //в эту константу помещаем URL развёрнутого веб-приложения Google Apps Script
       const URL_APP = "https://script.google.com/macros/s/AKfycbwVZ93QHvedJjVyDozlQHjim4u1u6J-7wqDGtmuNQ5WJYqyWr2J_nPtnNq_hrx70UhB5Q/exec";

        //находим форму в документе
        const form = document.querySelector("#form");



        const otherRadio = document.getElementById('other');
        const otherInput = document.getElementById('motivation');

        function handleRadioChange() {
            if (otherRadio.checked) {
              otherInput.disabled = false;
            } else {
              otherInput.disabled = true;
              otherInput.value = '';
            }
          }

        const radioButtons = document.querySelectorAll('input[name="question6"]');
        radioButtons.forEach(radio => radio.addEventListener('change', handleRadioChange));

        handleRadioChange();



        //указываем адрес отправки формы (нужно только в начале примера)
       form.action = URL_APP;

        //вспомогательная функция проверки заполненности формы
       function isFilled(details) {
         const { name, instagram, phone, telegram, niche,motivation, results ,pain} = details;
         if (!name) return false;
         if (!instagram) return false;
         if (!phone) return false;
         if (!telegram) return false;
         if (!niche) return false;
         if (!motivation) return false;
         if (!results) return false;
         if (!pain) return false;
         
         return true;
       }

        //навешиваем обработчик на отправку формы
       form.addEventListener("submit", async (ev) => {
          //отменяем действие по умолчанию
         ev.preventDefault();

          // Отримання значень вибраних радіокнопок
            const selectedValue1 = form.elements['question6'].value;
            const selectedValue2 = form.elements['question7'].value;

          //получаем ссылки на элементы формы
          const name = document.querySelector("[name=name]");
          const instagram = document.querySelector("[name=instagram]");
          const phone = document.querySelector("[name=phone]");
          const telegram = document.querySelector("[name=telegram]");
          const niche = document.querySelector("[name=niche]");
          const motivation = document.querySelector("[name=motivation]");
          const results = selectedValue2;
          const pain = document.querySelector("[name=pain]");

          //собираем данные из элементов формы

          
         let details = {
           name: name.value.trim(),
           instagram: instagram.value.trim(),
           phone: phone.value.trim(),
           telegram: telegram.value.trim(),
           niche: niche.value.trim(),
           motivation:  motivation.value.trim() == '' ? selectedValue1 :  motivation.value.trim() ,
           results: results,
           pain: pain.value.trim(),
         };

          //если поля не заполнены - прекращаем обработку
         if (!isFilled(details)) return;

          //подготавливаем данные для отправки
         let formBody = [];
         for (let property in details) {
            //кодируем названия и значения параметров
           let encodedKey = encodeURIComponent(property);
           let encodedValue = encodeURIComponent(details[property]);
           formBody.push(encodedKey + "=" + encodedValue);
         }
          //склеиваем параметры в одну строку
         formBody = formBody.join("&");

          //выполняем отправку данных в Google Apps
         const result = await fetch(URL_APP, {
           method: "POST",
           headers: {
             "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
           },
           mode: "no-cors",
           body: formBody,
         })
           .then((res) => res.json())
       });

       