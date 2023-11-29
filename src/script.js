// https://jsonplaceholder.typicode.com/comments?_page=2&_limit=3
// https://jsonplaceholder.typicode.com/comments?_page=19&_limit=N

// <<     <    16 17 [18] 19 20    >    >>
//       1 .. 2.. 3.. 4... 5...  

// https://jsonplaceholder.typicode.com/comments

// Есть массив данных (большой). Мы не хотим показывать все данные сразу, мы хотим разбивать массив на страницы по N элементов на страницу (например по 10 или по 20).


// Пагинация - данный скрипт должен получать список данных на вход и выдавать "групированный" список данных, в котором данные разбиты на группы (страницы). Размер группы определить самостоятельно. От размера группы будет зависеть конечное кличество страниц. Дизайн - взять любой. 

// Дополнительно - получать не все данные сразу, а получать только 1-3 первых страницы, а остальные подгружать по мере "прохождения".

// Дополнительно 2 - сохранять подгруженные данные чтобы не скачивать их повторно при заходе на старую страницу.

// Дополнительно 3 - сохранять данные в сторадж чтобы не грузить их повторно и сохранять после перезагрузки страницы

// ДОполнительно 4 - в зависимости от гет-параметров, переключаться на нужную страницу


// Алгоритм

// получить массив данных - 500 

// разбить массив на блоки по 50 - смотрим, сколько всего страниц получиллось после разбивки массива. макс количество кнопок перехода на соседние страницы - 2 слева, 2 справа и 1 текущая

// старт с первой страницы, вывести первый блок на экран 

// текущий блок данных исчезает при переходе на другую страницу

// при клике на кнопку вывести следующий или предыдущий блок данных (страницу)

// написать функцию которая получает нужный кусок данных из всех по номеру страницы

// Выводить нужное количество страниц

// Отслеживать, на какой странице мы сейчас

// Выводить не все страницы, а только соседние 



// function getAllPagesLength2(length, chunkSize) {
//     return length / chunkSize
// }


// устанавливаем количество страниц
// setAllPagesLength(pagesAmount, length, chunkSize) {
//     pagesAmount =  length / chunkSize // делим длину массива на заданный размер (у нас -50)
// }

const a = 3;

const name = 'Anastasiia';


class Pagination {
    constructor(URL, placeSelector) {
        // this = {}
        this.data = undefined;
        this.PAGE_NEIGHBORS_AMOUNT = 2;

        // URL to fetch
        this.url = URL;

        // длина списка
        this.length = undefined;
        // общее количество всех страниц
        this.pagesAmount = undefined;
        // размер страницы
        this.chunkSize = 50;

        this.currentPage = 1;
        // this.currentPage = getPageNumFromURL() || getPageNumFromLocalStore() || 1;

        
        this.htmlPlace = document.querySelector(placeSelector);
        
        console.log(this.htmlPlace);
        this.htmlPageBtns = this.htmlPlace.querySelector('.pageBtns');
        console.log(this.htmlPageBtns);

        this.HTMLRoot = this.htmlPlace.querySelector('.pageData');
        console.log(this.HTMLRoot);
        this.HTMLPagination = this.htmlPlace.querySelector('.pagination');
        this.HTMLPagination.addEventListener('click', (event) => {
            const elemText = event.target.textContent;
            this.currentPage = Number(elemText);
            console.log(this.currentPage); 

            this.printPageButtons();

            const pageDataArray = this.getPageData(this.currentPage);
            this.printData(pageDataArray);



        });

        this.init();
        // return this
    }

    // ???
    async init() {
        const data = await this.getData(this.url);
        this.data = data.slice(); // возвращает нам копию массива
        // this.data = [...data];
        this.length = this.data.length; // сохраяем в this длинну массива
        this.pagesAmount = this.getAllPagesLength()
        this.printPageButtons();

        console.log(this);
        const pageData = this.getPageData(1);
        this.printData(pageData);

    }

    // получает данные из ссылки
    async getData(url) {
        // делаем фетч запрос, затем ждём промис, который отрезолвится, который мы снова загоняем в промис через .жсон
        const rawData = await fetch(url); // получает данные из ссылки
        const data = await rawData.json(); // преобразовывает данные в json
        return data;
    }

    // получаем количество страниц
    getAllPagesLength() {
        return this.length / this.chunkSize // делим длину массива на заданный размер (у нас -50)
    }

    // получаем данные страницы (номер страницы)
    getPageData(pageNumber) {
        // 1 -> 0 ---- 49 = 0
        // 2 -> 50 ---- 99 / 50 = 1
        // 3 -> 100 / 50 = 2
        // 4 -> 150 / 50 = 3
        // 5 -> 200 / 50 = 4
        // pageNumber == 1
        // 1 -> 0
        const start = (pageNumber - 1) * this.chunkSize;
        const end = start + this.chunkSize;

        console.log(this.data.slice(start, end));
        return this.data.slice(start, end);

    }

    // выводит ПРИНИМАЕМЫЕ ДАННЫЕ на экран (на сайт)
    printData(pageDataArray) {
        // clear html-list before insert new date
        this.HTMLRoot.innerHTML = "";
        pageDataArray.forEach(element => {
           // console.log(element);
            this.HTMLRoot.innerHTML = this.HTMLRoot.innerHTML + '<p>' + element.id + ') ' + element.name + '</p>';
            // htmlParent = html_Content
        });

    }

    // pagination 

    // Выводит на страницу кнопки пагинации (5 кнопок: та кнопка, на которой мы находимся (текущая) + по 2 кнопки слева и справа от нее)
    // создать html элемент (кнопку)
    printPageButtons() {
        this.htmlPageBtns.textContent = "";
        console.log(this.currentPage); 
        // 1 2 (3) 4 5
        // 3 - 1
        // 3 - 2
        // 3 + 1
        // 3 + 2

        // 1... 5

        // Если START < 1, то START = 1
        // Если END > this.pagesAmount, то END = this.pagesAmount

        const START = (this.currentPage - this.PAGE_NEIGHBORS_AMOUNT);
        const realStart = START < 1 ? 1 : START;

        const END = (this.currentPage + this.PAGE_NEIGHBORS_AMOUNT);
        let realEnd = END > this.pagesAmount ? this.pagesAmount : END;
        // realEnd = realEnd < 5 ? 5 : realEnd;

        
        for (let index = realStart; index <= realEnd; index++) {
            const pageNum = index;
            const pageBtn = document.createElement('a');
            pageBtn.textContent = pageNum;
            pageBtn.classList.add("page-btn");
            const pageLink =  "#page-" + pageNum;
            pageBtn.setAttribute("href", pageLink);
            console.log(pageBtn);
            this.htmlPageBtns.append(pageBtn);

        }

    }


}


const paginationConfig = {
    url: 'https://jsonplaceholder.typicode.com/comments',
    PAGE_NEIGHBORS_AMOUNT: 2,
    startPage: 2,
    htmlRootSelector: ".comments",
};

new Pagination('https://jsonplaceholder.typicode.com/comments', ".comments");
// TODO: продолжиаем отсюда
// new Pagination(paginationConfig);
new Pagination('https://jsonplaceholder.typicode.com/posts', ".post");

// Разделяй и властвуй
// 1. Сложную задачу разбить на составные части
// 2. Если задача универсальная, сначала реализовать ее версию с конкретными. а не универсальными данными
// 3. Если нам встречается массив или объект, то вывести его значения по одному в консоль

