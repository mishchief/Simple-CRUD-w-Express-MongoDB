// main.js
var update = document.getElementById('update')
var del = document.getElementById('delete')

update.addEventListener('click', function () {
  var targetName = document.getElementById('name').value
  fetch('messages', {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'targetName': targetName,
      'name': 'Doggerino',
      'message': 'Arf.'
    })
  }).then(res => {
    if (res.ok) return res.json()
  })
  .then(data => {
    console.log(data)
    window.location.reload(true)
  })
})

del.addEventListener('click', function () {
  var targetName = document.getElementById('name').value
  fetch('messages', {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'name': targetName
    })
  })
  .then(res => {
    if (res.ok) return res.json()
  }).
  then(data => {
    console.log(data)
    window.location.reload()
  })
})
