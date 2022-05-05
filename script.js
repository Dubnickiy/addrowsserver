getItems().then(showItems)

addBtn.onclick = () => {
  addItem().then(showItems)
}

removeBtn.onclick = () => {
  removeItem().then(showItems)
}

function showItems(items) {
  let html = ''

  for (const item of items) {
    html += `<li><input type="checkbox">${item}</li>`
  }
  
  list.innerHTML = html
}

function getItems() {
  return fetch('list').then(response => response.json())
}

function addItem() {
  const request = {
    method: 'POST',
    body: input.value
  }
  input.value = ''
  return fetch('add', request).then(response => response.json())
}

function removeItem() {
  const request = {
    method: 'POST',
    body: JSON.stringify(getIndices())
  }

  return fetch('remove', request).then(response => response.json())
}

function getIndices() {
  const indices = []

  for (let i = 0; i < list.children.length; i++) {
    if (list.children[i].firstChild.checked) {
      indices.push(i)
    }
  }

  return indices
}



