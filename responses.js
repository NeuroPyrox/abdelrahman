"use strict";

const file = path => {
  return req => req.sendFile(path)
}

const redirect = path => {
  return req => req.redirect(path)
}

const json = object => {
  return req => req.send(object)
}

const status = code => {
  return req => req.sendStatus(code)
}

module.exports = {
  file: file,
  redirect: redirect,
  json: json,
  status: status
}