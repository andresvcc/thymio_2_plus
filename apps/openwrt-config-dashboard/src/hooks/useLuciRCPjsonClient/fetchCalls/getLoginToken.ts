export async function getLoginSid({ password }: { password: string }): Promise<string> {
  try {
    const loginUrl = '/cgi-bin/luci/rpc/auth'; // URL de inicio de sesión

    // Construye el cuerpo de la solicitud con los datos de inicio de sesión
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    // console.log('password', password);

    var raw = JSON.stringify({
      id: 1,
      method: 'login',
      params: ['root', `${password}`],
    });

    // Realiza la solicitud fetch
    const respose = await fetch(loginUrl, {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    });

    const { result } = await respose.json();

    return result;
  } catch (error) {
    console.log('Error fetching login token', error);
    return `ERROR: ${error}`;
  }
}
