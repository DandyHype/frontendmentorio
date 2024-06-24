

document.addEventListener("DOMContentLoaded", function(){
    
    const mdBlock = document.querySelector("md-block");
    const textArea = document.querySelector("textarea");
    const saveButton = document.querySelector("#saveFile");
    const myFileList = document.querySelector("#myFileList");
    const newFile = document.querySelector("#newFile");
    const fileName = document.querySelector("input");
    const fileList = document.querySelector(".fileList");
    var listItem = document.querySelectorAll('ul.fileList li a');

    function onPageOpen(){
        let storageData = localStorage.getItem('document-storage');
        let parseData = JSON.parse(storageData);
        openDoc(parseData.currentDocument.name);
    }

    onPageOpen();


    textArea.addEventListener('input', () => {
        mdBlock.mdContent = textArea.value;
    });


      function refreshMDView(){
        var event = new Event('input', {
            bubbles: true,
            cancelable: true,
          });
        textArea.dispatchEvent(event);
      }

      
      refreshMDView();

    


    function changeActiveDocument(name){
        let storageData = localStorage.getItem('document-storage');
        let parseData = JSON.parse(storageData);
        let newDoc = {
            createdAt: getDocumentInceptionByName(name),
            name: name,
            content: getDocumentContentByName(name)
        };
        parseData.currentDocument = newDoc;
        localStorage.setItem('document-storage', JSON.stringify(parseData));
    }
      
      


    function getDocumentContentByName(documentName) {
        if (localStorage.getItem('document-storage')) {
          let storageData = localStorage.getItem('document-storage');
          let parsedData = JSON.parse(storageData);
          let documents = parsedData.documents;
          let document = documents.find(doc => doc.name === documentName);
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
        if (localStorage.getItem('document-storage')) {
          let storageData = localStorage.getItem('document-storage');
          let parsedData = JSON.parse(storageData);
          let documents = parsedData.documents;
          let document = documents.find(doc => doc.name === documentName);
          if (document) {
            return document.createdAt;
          } else {
            return `Document with name ${documentName} not found.`;
          }
        } else {
          return "'document-storage' not found in local storage.";
        }
      }

    function saveNewDoc(){
        let storageData = localStorage.getItem('document-storage');
        let parseData = JSON.parse(storageData);
        let newDoc = {
            createdAt: new Date().toISOString().split('T')[0],
            name: fileName.value,
            content: textArea.value
        };
        parseData.documents.push(newDoc)
        localStorage.setItem('document-storage', JSON.stringify(parseData));
    }


    function openDoc(name){
        fileName.value = name;
        textArea.value = getDocumentContentByName(name);
        refreshMDView();
    }



    function refreshDocList(){
        let storageData = localStorage.getItem('document-storage');
        let parseData = JSON.parse(storageData);
        let documents = parseData.documents;
        fileList.innerHTML = '';
        for(var doc in documents){
            var li = document.createElement("li");
            var a = document.createElement("a");
            a.href = "#";
            a.textContent = documents[doc].name;
                li.appendChild(a);
                fileList.appendChild(li);
        }
        listItem = document.querySelectorAll('ul.fileList li a');

        listItem.forEach(function(item) {
            item.addEventListener('click', function(event) {
                event.preventDefault();
                var linkText = item.textContent;
                openDoc(linkText);
                changeActiveDocument(linkText);
            });
        });
    }
    
        saveButton.addEventListener("click", function(){
            saveNewDoc();
            refreshDocList();
            listItem.forEach(a => {
                console.log(a.textContent);
            })
            
        });

        
        myFileList.addEventListener("click", function(){
            refreshDocList();
            listItem.forEach(a => {
                console.log(a.textContent);
            })
        });

        
        
})