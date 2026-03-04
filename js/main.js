/* global nn */
let obj
let itemsLeft = 0

async function setup () {
  if (sessionStorage.getItem('undisc')) {
    console.log("Already initialized")
  }
  
  const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTCohgH12G54bFzgTMbR_YTdj4knfuKNKFL2vur75wETlkFXZ7iimzkBbIIUTK9lihjmOTK07SAMX8N/pub?output=csv"
  obj = await nn.loadData(url)
  obj = nn.parseData(obj)
  
  nn.getAll('.items').forEach(setupClicks)
  nn.getAll('.rooms-img-container > img').forEach(setupClicks)
  
   console.log('Parsed data:', obj)
  
  console.log(obj)
  updateContent()
  const thing = obj.filter(i => i.type === "obj").map(i => i.id)
  const thingString = JSON.stringify(thing)
  sessionStorage.setItem('undisc', thingString)
}

function discovered() {
  const stringArray = sessionStorage.getItem('undisc')
  const parsedArray = JSON.parse(stringArray)
  const index = parsedArray.indexOf(this.id)
  parsedArray.splice(index, 1)
  if (index >= 0) {
    const newStringArray = JSON.stringify(parsedArray)
    sessionStorage.setItem('undisc', newStringArray)
    console.log('parsedarray', parsedArray)
    itemsLeft = parsedArray.length
    console.log("items left:", itemsLeft)
  }
  console.log('parsedarray', parsedArray)
  console.log("items left:", itemsLeft)
}


function updateContent () {
  const hash = window.location.hash
  const id = hash.slice(1)
  if (id) {
    const item = obj.find(i => i.id === id)
    const specImg = item.image
    nn.get('.rooms > .rooms-text-container > #title').content(item.title)
    nn.get('.rooms > .rooms-text-container > #desc').content(item.description)
    let image = nn.get('.rooms > .rooms-img-container > img')
    image.src = `css/images/${specImg}.png`
    image.id = specImg
    console.log(image.id)
    // if (item.id === "top-left") {
    //   nn.get('.button').css('display', 'flex')
    // }
    // else {
    //   nn.get('.button').css('display', 'none')
    // }
  }
}

function setupClicks (ele) {
    ele.on('click', discovered)
    ele.on('click', showModal)
  }

function showModal () {
    const id = obj.find(i => i.id === this.id).id
    const title = obj.find(i => i.id === this.id).title
    const desc = obj.find(i => i.id === this.id).description
    const type = obj.find(i => i.id === this.id).type
    
    
    if (type === "obj") {
      nn.get('#modal > .items-text > h2').content(title)
      nn.get('#modal > .items-text > p').content(desc)
      let image = nn.get('#modal > .items-img > img')
      image.src = `css/images/${id}.png`
      nn.get('#modal').css('display', 'block')
      if (nn.get('.back')){
        nn.get('.back').css('display', 'none')
      }
      console.log(this.id)
      if (this.id === "key") {
        nn.get('.button').css('display', 'flex')
        if (nn.get('.back')){
        nn.get('.back').css('display', 'none')
      }
      }
      else if (this.id === "stairway") {
        showUpstairs()
      }
      else {
        nn.get('.button').css('display', 'none')
      }
    }
  }

function showUpstairs () {
  const stringArray = sessionStorage.getItem('undisc')
  const parsedArray = JSON.parse(stringArray)
  console.log('array', parsedArray)
  if (parsedArray.length === 0) {
    nn.get('.button').css('display', 'flex')
  }
  else {
    nn.get('.button').css('display', 'none')
    nn.get('.objective').content(`Perhaps finding all the objects first will help you unlock this area... ${itemsLeft}/7 items left`)
  }
}



function hideModal () {
    nn.get('#modal').css('display', 'none')
  if (nn.get('.back')){
        nn.get('.back').css('display', 'block')
      }
  }

// function back () {
//     // const modalDisplay = nn.get('#modal').css('display')
    
//     // if (modalDisplay === 'block') {
//     //     // If modal is open, just close it
//     //     hideModal()
//     // } else {
//     //     // If no modal, go back in history
//     //     window.location.href = window.history.back()
//     // }
  
//     window.location.href = history.go(-1)
//   }

const closeBtn = nn.get('#close')
if (closeBtn) {
    closeBtn.on('click', hideModal)
}

// const backBtn = nn.get('#back')
// if (backBtn) {
//   console.log()
//     backBtn.on('click', back)
// }
nn.on('load', setup)
