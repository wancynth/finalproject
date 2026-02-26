/* global nn */
let data

async function setup () {
  const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSmFQYcrhKAOqhQeylZmm6nODB5IkQstOmwqdtfsHF7tB6Fekonr7gTKXPNdMGl0Ili78Y3O-3NHWMQ/pub?gid=0&single=true&output=csv'
  data = await nn.loadData(url)
  data = nn.parseData(data)
  console.log(data)
  updateContent()
}

function updateContent () {
  const hash = window.location.hash
  const id = hash.slice(1)
  if (id) {
    const item = data.find(i => i.id === id)
    nn.get('#title').content(item.title)
    nn.get('#desc').content(item.description)
  }
}

function hideModal () {
    nn.get('#modal').css('display', 'none')
  }

function back () {
    window.location.href = window.history.back(1);
  }

nn.on('load', setup)
