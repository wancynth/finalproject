/* global nn */
let obj

async function setup () {
  const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTCohgH12G54bFzgTMbR_YTdj4knfuKNKFL2vur75wETlkFXZ7iimzkBbIIUTK9lihjmOTK07SAMX8N/pub?output=csv"
  obj = await nn.loadData(url)
  obj = nn.parseData(obj)
  
  nn.getAll('.items').forEach(setupClicks)
  
   console.log('Parsed data:', obj)
  
  console.log(obj)
  updateContent()
}


function updateContent () {
  const hash = window.location.hash
  const id = hash.slice(1)
  if (id) {
    const item = obj.find(i => i.id === id)
    nn.get('#title').content(item.title)
    nn.get('#desc').content(item.description)
  }
}

function setupClicks (ele) {
    ele.on('click', showModal)
  }

function showModal () {
    const title = obj.find(i => i.id === this.id).title
    const desc = obj.find(i => i.id === this.id).description
    const type = obj.find(i => i.id === this.id).type
    
    if (type === "obj") {
      nn.get('#modal > h2').content(title)
      nn.get('#modal > p').content(desc)
      nn.get('#modal').css('display', 'block')
    }
  }

function hideModal () {
    nn.get('#modal').css('display', 'none')
  }

function back () {
    window.location.href = window.history.back(1);
  }

nn.get('#close').on('click', hideModal)
nn.on('load', setup)
