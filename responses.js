"use strict";

class Response {
  constructor(responder) {
    this.responder = responder;
  }

  dump(res) {
    this.responder(res);
  }
}

const file = path => {
  return new Response(req => req.sendFile(path));
};

const redirect = path => {
  return new Response(req => req.redirect(path));
};

const json = object => {
  return new Response(req => req.send(object));
};

const status = code => {
  return new Response(req => req.sendStatus(code));
};

module.exports = {
  file: file,
  redirect: redirect,
  json: json,
  status: status
};
