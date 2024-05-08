export async function updateRootPassword({
  newPassword,
  sidToken,
}: {
  newPassword: string;
  sidToken: string;
}): Promise<number> {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Cookie', `sysauth_http=${sidToken}; sysauth=c294af01916d189dfb279f0f0353bff0`);

  var raw = JSON.stringify({
    method: 'user.setpasswd',
    params: ['root', `${newPassword}`],
  });

  const response = await fetch('/cgi-bin/luci/rpc/sys', {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  });

  const { result } = await response.json();

  return result;
}
