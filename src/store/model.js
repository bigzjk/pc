let modelMap = [
    'Home',
    'List'
]
let models = []
modelMap.forEach(item => {
    if(Array.isArray(item)) {
        console.log(' 传进了一个数组');
    } else {
        models.push(require(`@/pages/${item}/model`).default)
    }
})

export default models