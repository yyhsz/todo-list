const fs = require('fs');//引入fs模块
const path = require('path')
const action = process.argv[2]
const content = process.argv[3]
const contetn2 = process.argv[4]
const dbPath = path.join(__dirname,'db')
let list = []

function fetch() {
   try{list = JSON.parse(fs.readFileSync(dbPath))}
   catch{list = []} 
}
function save(list) {
    fs.writeFileSync(dbPath, JSON.stringify(list))
}
function displayList(){
    list.forEach((value,key)=>{
        console.log('['+value[1]+']'+' '+value[0])
    })
}
if(!fs.existsSync(dbPath)){
   save()
}

fetch()
switch (action) {
    case 'add':
        list.push([content, '×'])
        displayList()
        break
    case 'list':
        displayList()
        break
    case 'delete':
        list.splice(content - 1, 1)
        displayList()
        break
    case 'done':
        list[content - 1][1] = '√'
        displayList()
        break
    case 'edit':
        list[content - 1][0] = contetn2
        displayList()
        break
    default:
        console.log('未知动作')
        break
}
save(list)
