var myNodelist = document.getElementsByTagName("LI");
var btn = document.getElementById('btn');
let todo =[]
//get data from  storage
chrome.storage.sync.get("todo", function(item){ 
    todo = item.todo
    
    //loop inside items 
    for(let i = 0 ; i < todo.length ; i++){
        var li = document.createElement("li");
        var t = document.createTextNode(todo[i].title);
        li.appendChild(t);
        if(todo[i].checked === true){
            li.className = "checked"
        }
        li.setAttribute('data-id',i)

        //add delete button
        var span = document.createElement("SPAN");
        var txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        li.appendChild(span);
        document.getElementById("myUL").appendChild(li);
    }

    //trigger delete item
    var close = document.getElementsByClassName("close");
    var i;
    for (i = 0; i < close.length; i++) {
        close[i].onclick = function() {
            var div = this.parentElement;
            div.style.display = "none";
            todo.splice(div.getAttribute('data-id'),1);
            chrome.storage.sync.set({ "todo": todo }, function(){});
        }
    }
    
    //check the item
    var list = document.querySelector('ul');
    list.addEventListener('click', function(ev) {
      if (ev.target.tagName === 'LI') {
        todo[ev.target.getAttribute('data-id')].checked = !todo[ev.target.getAttribute('data-id')].checked
        ev.target.classList.toggle('checked');
        chrome.storage.sync.set({ "todo": todo }, function(){});
      }
    }, false);
    
    // add todo 
    btn.onclick = function(){
        let inputVal = document.getElementById('myInput').value; 
        todo.push({title  :  inputVal , checked : false})
        var li = document.createElement("li");
        var t = document.createTextNode(inputVal);
        li.appendChild(t);
        li.setAttribute('data-id',todo.length - 1)

         //add delete button
         var span = document.createElement("SPAN");
         var txt = document.createTextNode("\u00D7");
         span.className = "close";
         span.appendChild(txt);
         li.appendChild(span);
        document.getElementById("myUL").appendChild(li);
        document.getElementById('myInput').value = '';

       

        chrome.storage.sync.set({ "todo": todo }, function(){});
    }
    
})


