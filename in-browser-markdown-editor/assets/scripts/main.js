document.addEventListener("DOMContentLoaded", function () {
  const mdBlock = document.querySelector("md-block");
  const textArea = document.querySelector("textarea");
  const saveButton = document.querySelector("#saveFile");
  const myFileList = document.querySelector("#myFileList");
  const newFile = document.querySelector("#newFile");
  const fileName = document.querySelector("input");
  const fileList = document.querySelector(".fileList");
  var listItem = document.querySelectorAll("ul.fileList li a");
  const btnMenu = document.querySelector(".header__menu");
  const menuImg = btnMenu.querySelector("img");
  const header = document.querySelector(".header");
  const main = document.querySelector("main");
  const aside = document.querySelector("aside");

  function onPageOpen() {
    let storageData = localStorage.getItem("document-storage");
    let parseData = JSON.parse(storageData);
    openDoc(parseData.currentDocument.name);
    refreshDocList();
  }

  onPageOpen();

  textArea.addEventListener("input", () => {
    mdBlock.mdContent = textArea.value;
  });

  function refreshMDView() {
    var event = new Event("input", {
      bubbles: true,
      cancelable: true,
    });
    textArea.dispatchEvent(event);
  }

  refreshMDView();

  function changeActiveDocument(name) {
    let storageData = localStorage.getItem("document-storage");
    let parseData = JSON.parse(storageData);
    let newDoc = {
      createdAt: getDocumentInceptionByName(name),
      name: name,
      content: getDocumentContentByName(name),
    };
    parseData.currentDocument = newDoc;
    localStorage.setItem("document-storage", JSON.stringify(parseData));
  }

  function getDocumentContentByName(documentName) {
    if (localStorage.getItem("document-storage")) {
      let storageData = localStorage.getItem("document-storage");
      let parsedData = JSON.parse(storageData);
      let documents = parsedData.documents;
      let document = documents.find((doc) => doc.name === documentName);
      if (document) {
        return document.content;
      } else {
        return `Document with name ${documentName} not found.`;
      }
    } else {
      return "'document-storage' not found in local storage.";
    }
  }

  function getDocumentInceptionByName(documentName) {
    if (localStorage.getItem("document-storage")) {
      let storageData = localStorage.getItem("document-storage");
      let parsedData = JSON.parse(storageData);
      let documents = parsedData.documents;
      let document = documents.find((doc) => doc.name === documentName);
      if (document) {
        return document.createdAt;
      } else {
        return `Document with name ${documentName} not found.`;
      }
    } else {
      return "'document-storage' not found in local storage.";
    }
  }

  function saveNewDoc() {
    let storageData = localStorage.getItem("document-storage");
    let parseData = JSON.parse(storageData);
    let newDoc = {
      createdAt: new Date().toISOString().split("T")[0],
      name: fileName.value,
      content: textArea.value,
    };
    parseData.documents.push(newDoc);
    localStorage.setItem("document-storage", JSON.stringify(parseData));
  }

  function openDoc(name) {
    fileName.value = name;
    textArea.value = getDocumentContentByName(name);
    refreshMDView();
  }

  function refreshDocList() {
    let storageData = localStorage.getItem("document-storage");
    let parseData = JSON.parse(storageData);
    let documents = parseData.documents;
    fileList.innerHTML = "";
    for (var doc in documents) {
      var li = document.createElement("li");
      var date = document.createElement("date");
      var a = document.createElement("a");
      var img = document.createElement("img");
      a.href = "#";
      a.textContent = documents[doc].name;
      date.textContent = "01 April 2022";
      img.src = "./assets/icon-document.svg";
      li.appendChild(img);
      li.appendChild(date);
      li.appendChild(a);
      fileList.appendChild(li);
    }
    listItem = document.querySelectorAll("ul.fileList li a");

    listItem.forEach(function (item) {
      item.addEventListener("click", function (event) {
        event.preventDefault();
        var linkText = item.textContent;
        openDoc(linkText);
        changeActiveDocument(linkText);
      });
    });
  }

  saveButton.addEventListener("click", function () {
    saveNewDoc();
    refreshDocList();
    listItem.forEach((a) => {
      console.log(a.textContent);
    });
  });

  myFileList.addEventListener("click", function () {
    refreshDocList();
    listItem.forEach((a) => {
      console.log(a.textContent);
    });
  });

  function switchMenu() {
    if (menuImg.getAttribute("src") === "./assets/icon-menu.svg") {
      showMenu();
      menuImg.setAttribute("src", "./assets/icon-close.svg");
    } else {
      hideMenu();
      menuImg.setAttribute("src", "./assets/icon-menu.svg");
    }
  }

  function hideMenu() {
    aside.setAttribute("style", "transform: translateX(-250px);");
    main.setAttribute("style", "transform: translateX(0px);");
    header.setAttribute("style", "transform: translateX(0px);");
  }

  function showMenu() {
    aside.setAttribute("style", "transform: translateX(0px);");
    main.setAttribute("style", "transform: translateX(250px);");
    header.setAttribute("style", "transform: translateX(250px);");
  }

  btnMenu.addEventListener("click", function () {
    switchMenu();
  });
});
