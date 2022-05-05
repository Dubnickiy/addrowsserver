import http from 'http'
import fs from 'fs'

const server = http.createServer(acceptRequest)
server.listen(3000)


function acceptRequest(request, response) {
  if (request.url == "/") {
    const html = fs.readFileSync('index.html')
    response.end(html)

  } else if (request.url == "/style.css") {
    const css = fs.readFileSync('style.css')
    response.end(css)

  } else if (request.url == "/script.js") {
    const js = fs.readFileSync('script.js')
    response.end(js)

  } else if (request.url == "/list") {
    response.end(JSON.stringify(items))

  } else if (request.url == "/add") {
    request.on('data', data => {
      items.push(data.toString())
      response.end(JSON.stringify(items))
    })
  
  } else if (request.url == "/remove") {
    request.on('data', data => {
      const indices = JSON.parse(data.toString()) // [0, 2]

      for (let i = indices.length - 1; i >= 0; i--) {
        items.splice(indices[i], 1)
      }

      response.end(JSON.stringify(items))
    })
  }

  

}

const items = ['a', 'b', 'c', 'd']
