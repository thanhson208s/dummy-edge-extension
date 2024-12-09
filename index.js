function renderURLs(urls) {
    let innerHTML = "";
    for (const url of urls) {
        innerHTML += `<li>
            <a target='_blank' href='${url}'>${url}</a>
        </li>`;
    }
    ulEl.innerHTML = innerHTML;
}

const strArrURLs = localStorage.getItem("arrURLs");
const arrURLs = strArrURLs ? JSON.parse(strArrURLs) : [];
const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");
const saveBtn = document.getElementById("input-btn");
saveBtn.addEventListener("click", function() {
    if (arrURLs.indexOf(inputEl.value.trim()) === -1)
    arrURLs.push(inputEl.value.trim());
    inputEl.value = "";
    localStorage.setItem("arrURLs", JSON.stringify(arrURLs));

    renderURLs(arrURLs);
});
const deleteBtn = document.getElementById("delete-btn");
deleteBtn.addEventListener("dblclick", function() {
    arrURLs.splice(0, arrURLs.length);
    localStorage.removeItem("arrURLs");

    renderURLs(arrURLs);
});
const tabBtn = document.getElementById("tab-btn");
tabBtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, ([tab]) => {
        if (arrURLs.indexOf(tab.url) === -1)
            arrURLs.push(tab.url);
        localStorage.setItem("arrURLs", JSON.stringify(arrURLs));

        renderURLs(arrURLs);
    });
});

renderURLs(arrURLs);