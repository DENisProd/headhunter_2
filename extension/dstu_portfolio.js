// ==UserScript==
// @name         DSTU portfolio generator
// @namespace    https://darksecrets.ru/
// @version      2023-12-11
// @description  get personalized resume with your student activity
// @author       You
// @match        https://edu.donstu.ru/WebApp/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=donstu.ru
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const customizeButton = (btn) => {
        btn.style.background = '#1867c0'
        btn.style.color = '#FFFFFF'
        btn.style.padding = '0.4rem 1rem'
        btn.style.borderRadius = '8px'
        btn.style.marginLeft = '1rem'
        return btn
    }

    window.onload = function() {
        setTimeout(() => {
            // Вставляем div блок в body
            const notifiesBlocks = document.getElementsByClassName('pa-2')
            if (notifiesBlocks[2]?.children.length > 0) {
                const myDiv = document.createElement('p')
                myDiv.innerHTML = 'Привет! У вас есть уникальная возможность создать резюме на основе вашего Портфолио!'
                myDiv.style.padding = '10px'
                myDiv.style.background = '#fff'
                myDiv.style.border = '1px solid #ccc'
                myDiv.style.borderRadius = '6px'

                const textElement = document.createElement('p');

                // Создаем кнопку "Даю согласие"
                let confirmButton = document.createElement('button');
                confirmButton = customizeButton(confirmButton)
                confirmButton.textContent = 'Даю согласие';

                // Создаем кнопку "Отмена"
                let cancelButton = document.createElement('button');
                cancelButton = customizeButton(cancelButton)
                cancelButton.textContent = 'Отмена';

                const inputDiv = document.createElement('p')
                const inputDivA = document.createElement('a')
                inputDivA.href = "https://hh.darksecrets.ru"
                inputDivA.textContent = "Почта от вашего аккаунта hr dstu"

                // Создаем поле ввода для электронной почты
                const emailInput = document.createElement('input');
                emailInput.type = 'email';
                emailInput.placeholder = 'Введите вашу электронную почту';
                emailInput.style.padding = '10px'
                emailInput.style.background = '#fff'
                emailInput.style.border = '1px solid #ccc'
                emailInput.style.borderRadius = '6px'
                emailInput.style.marginLeft = '1rem'

                // Создаем кнопку "Отправить"
                let sendButton = document.createElement('button');
                sendButton = customizeButton(sendButton)
                sendButton.textContent = 'Отправить';

                inputDiv.appendChild(inputDivA)
                inputDiv.appendChild(emailInput)
                inputDiv.appendChild(sendButton)

                let data = {}
                let studentId = null

                let myButton = document.createElement('button')
                myButton = customizeButton(myButton)
                myButton.textContent = 'Сгенерировать резюме'
                myButton.addEventListener('click', function() {
                    const tokenName = 'authToken='
                    const authToken = document.cookie.split('; ').find(el => el.startsWith(tokenName)).replace(tokenName, '')

                    fetch("https://edu.donstu.ru/api/tokenauth", {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${authToken}`,
                            'Content-Type': 'application/json',
                            'Cookie': document.cookie
                        }
                    }).then(response => {
                        if (response.ok) return response.json()
                    }).then(res => {
                        studentId = res.data?.user?.userID
                        console.log(res.data)

                        fetch("https://edu.donstu.ru/api/Portfolio/ListWorks?allWorks=true", {
                            method: 'GET',
                            headers: {
                                'Authorization': `Bearer ${authToken}`,
                                'Content-Type': 'application/json',
                                'Cookie': document.cookie
                            }
                        }).then(response => {
                            if (response.ok) return response.json()
                        }).then(res => {
                            console.log('listWorks', res.data)
                            data = {
                                ...data,
                                categories: res.data.categories.map(({ category, description, categoryID, ...rest }) => ({ category, description, categoryID })),
                                listWorks: res.data.listWorks.map(({ name, ballOfWork, type, ...rest }) => ({ name, ballOfWork, category: type.category, description: type.description, categoryID: type.categoryID, typeName: type.name }))
                            }

                            const jsonString = JSON.stringify(data, null, " ");

                            // Устанавливаем текст элемента равным строке JSON
                            textElement.innerHTML = "<strong>Эти данные пойдут на генерацию резюме:</strong> <details><ul> <li>Портфолио</li> <li>Email</li> <li>ФИО</li> <li>День рождения</li> <li>Средний балл</li> <li>Группа</li> <li>Факультет, кафедра</li> </ul></details>";
                            console.log(data)

                            // Показываем блок с кнопками "Даю согласие" и "Отмена"
                            confirmButton.style.display = 'inline-block';
                            cancelButton.style.display = 'inline-block';
                        })


                        fetch("https://edu.donstu.ru/api/UserInfo/Student?studentID=" + studentId, {
                            method: 'GET',
                            headers: {
                                'Authorization': `Bearer ${authToken}`,
                                'Content-Type': 'application/json',
                                'Cookie': document.cookie
                            }
                        }).then(response => {
                            if (response.ok) return response.json()
                        }).then(res => {
                            console.log(res.data)
                            const _data = {
                                photoLink: res.data?.photoLink,
                                facul: res.data?.facul?.faculName,
                                groupID: res.data?.group?.item2,
                                kafName: res.data?.kaf?.kafName,
                                surname: res.data?.surname,
                                name: res.data?.name,
                                middleName: res.data?.middleName,
                                admissionYear: res.data?.admissionYear,
                                birthday: res.data?.birthday,
                            }
                            data = {
                                ...data,
                                ..._data
                            }
                        })

                        fetch("https://edu.donstu.ru/api/EducationalActivity/StudentAvgMark", {
                            method: 'GET',
                            headers: {
                                'Authorization': `Bearer ${authToken}`,
                                'Content-Type': 'application/json',
                                'Cookie': document.cookie
                            }
                        }).then(response => {
                            if (response.ok) return response.json()
                        }).then(res => {
                            console.log(res.data)
                            const _data = {
                                avgMark: res.data?.avgMark,
                            }
                            data = {
                                ...data,
                                ..._data
                            }
                        })
                    })

                })

                // Добавляем обработчик события для кнопки "Даю согласие"
                confirmButton.addEventListener('click', function() {
                    // Действие, которое нужно выполнить при согласии пользователя
                    inputDiv.style.display = 'block';
                    confirmButton.style.display = 'none';
                    cancelButton.style.display = 'none';
                });

                // Добавляем обработчик события для кнопки "Отмена"
                cancelButton.addEventListener('click', function() {
                    // Скрываем блок с кнопками "Даю согласие" и "Отмена"
                    confirmButton.style.display = 'none';
                    cancelButton.style.display = 'none';
                    textElement.style.display = 'none';
                });

                sendButton.addEventListener('click', function() {
                    inputDiv.style.display = 'none';
                    // "https://hh.darksecrets.ru/api/v1/user/prof/edu_portfolio"
                    // "http://localhost:5555/v1/user/prof/edu_portfolio"
                    fetch("https://hh.darksecrets.ru/api/v1/user/prof/edu_portfolio", {
                        method: 'POST',
                        body: JSON.stringify({
                            ...data,
                            email: emailInput.value
                        }),
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    }).then(response => {
                        if (response.ok) return response.json()
                    }).then(res => {
                        myButton.style.display = 'none';
                        textElement.textContent = "Данные отправлены на аккаунт с почтой " + emailInput.value
                    })
                });

                myDiv.appendChild(myButton);
                myDiv.appendChild(textElement);

                // Добавляем кнопки "Даю согласие" и "Отмена" в div блок
                myDiv.appendChild(confirmButton);
                myDiv.appendChild(cancelButton);
                myDiv.appendChild(inputDiv);

                // Скрываем кнопки "Даю согласие" и "Отмена" изначально
                confirmButton.style.display = 'none';
                cancelButton.style.display = 'none';
                inputDiv.style.display = 'none';

                notifiesBlocks[2].appendChild(myDiv)
            }
        }, 4000)
    }
})();