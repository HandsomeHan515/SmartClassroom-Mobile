import { request } from './utils'
import { address } from './address'
import { appCore } from './index'

export const get = (config, schema) => {
  return (
    request(config)
      .then(rsp => {
        appCore.message = rsp
        console.log('Response: %o', rsp)
        return rsp
      })
  )
}

const base = config => {
  return (
    request(config)
      .then(rsp => {
        return rsp
      })
  )
}

export const del = config => base(config)

export const create = config => base(config)

export const update = config => base(config)

//Message
export const getMessage = () => request({ url: address.message })
  .then(rsp => {
    appCore.message = rsp
  })


//Login
export const addDetail = payload => request({
  url: address.detail,
  method: 'POST',
  body: JSON.stringify(payload)
})
  .then(rsp => {
    appCore.detailID = rsp.id
    appCore.detailStart = rsp.start
  })

//Logout
export const updateDetail = (payload, id) => request({
  url: `${address.detail}${id}/`,
  method: 'PATCH',
  body: JSON.stringify(payload)
})  