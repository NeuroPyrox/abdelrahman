module.exports = {
  get: async function get(url) {
    const res = await fetch(url);
    await assertResponseIsOk(res);
    const body = await res.json();
    return body;
  },

  send: async function send(url, body) {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body
    });
    await assertResponseIsOk(res);
  }
};

async function assertResponseIsOk(res) {
  if (!res.ok) {
    const text = await res.text();
    throw Error(`${res.status} ${res.statusText}: ${text}`);
  }
}
