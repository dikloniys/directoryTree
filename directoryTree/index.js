const obj = {
    "services": [
        {
            "id": 1,
            "head": null,
            "name": "Проф.осмотр",
            "node": 0,
            "price": 100.0,
            "sorthead": 20
        },

        {
            "id": 2,
            "head": null,
            "name": "Хирургия",
            "node": 1,
            "price": 0.0,
            "sorthead": 10
        },
        {
            "id": 3,
            "head": 2,
            "name": "Удаление зубов",
            "node": 1,
            "price": 0.0,
            "sorthead": 10
        },
        {
            "id": 4,
            "head": 3,
            "name": "Удаление зуба",
            "node": 0,
            "price": 800.0,
            "sorthead": 10
        },
        {
            "id": 5,
            "head": 3,
            "name": "Удаление 8ого зуба",
            "node": 0,
            "price": 1000.0,
            "sorthead": 30
        },
        {
            "id": 6,
            "head": 3,
            "name": "Удаление осколка зуба",
            "node": 0,
            "price": 2000.0,
            "sorthead": 20
        },
        {
            "id": 7,
            "head": 2,
            "name": "Хирургические вмешательство",
            "node": 0,
            "price": 200.0,
            "sorthead": 10
        },
        {
            "id": 8,
            "head": 2,
            "name": "Имплантация зубов",
            "node": 1,
            "price": 0.0,
            "sorthead": 20
        },
        {
            "id": 9,
            "head": 8,
            "name": "Коронка",
            "node": 0,
            "price": 3000.0,
            "sorthead": 10
        },
        {
            "id": 10,
            "head": 8,
            "name": "Слепок челюсти",
            "node": 0,
            "price": 500.0,
            "sorthead": 20
        },
    ]
}

let objDict = obj.services.reduce(function(acc,item) {
    if(item.node){
        
        item.children = [];
    }
        acc[item.id] = item
    
    return acc;
}, {});
let tree = []
Object.keys(objDict).forEach(function(key) {
    if(!objDict[key].head){
    tree.push(objDict[key])
    }
  });

obj.services.reduce(function(acc,item) {
    

    if (!item.head) {
        acc = item;
    }
    else {
        objDict[item.head].children.push(item);
    }
    return acc;
}, {});


let Listener = function(element){
    element.addEventListener("click", function (e) {

        e.stopImmediatePropagation()
        if(e.target === element){
            element.classList.toggle("hidden");
        }
    })
}

function processTree(nodes, element) {
    const sortedNodes = nodes.sort( (a, b) => a.sorthead - b.sorthead ) 
    sortedNodes.forEach(node => {
        let li = document.createElement('li');
        li.innerText = node.name;
        element.appendChild(li);
        if (node.children) {
            let ul = document.createElement('ul');
            li.classList.add("title");
            li.classList.add("hidden");
            li.appendChild(ul);
            Listener(li)
            processTree(node.children, ul); 
        }
    });
    
}
processTree(tree, document.getElementById("tree"));

