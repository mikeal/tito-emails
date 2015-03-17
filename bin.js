var request = require('request').defaults({json:true})

if (process.argv.length < 3) throw new Error('Need to pass api key')

var key = process.argv[2]

function _u (path) {
  return path + '?auth_token='+key
}

request(_u('https://api.tito.io/accounts'), function (e, resp, body) {
  if (e) throw e
  body.accounts.forEach(function (account) {
    request(_u(account.api_url + '/events'), function (e, resp, body) {
      if (e) throw e
      body.events.forEach(function (event) {
        request(_u(event.api_url + '/tickets'), function (e, resp, body) {
          if (e) throw e
          body.tickets.forEach(function (ticket) {
            if (ticket.email) console.log(ticket.email)
          })
        })

        request(_u(event.api_url + '/interested_users'), function (e, resp, body) {
          if (e) throw e
          body.interested_users.forEach(function (reg) {
            if (reg.email) console.log(reg.email)
          })
        })
      })
    })
  })
})
