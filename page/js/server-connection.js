let loginKey = null;

export async function setLogin(data) {
  let result = await postData(JSON.stringify({func:'login',data}));
  loginKey = result.loginKey;
  console.log('loginKey', loginKey);
}

async function postData(body) {
  let res = await fetch('.', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });
  let json = await res.json();
  return json;
}

export function getSettings() {
  return postData(JSON.stringify({func:'get_settings',loginKey}));
}