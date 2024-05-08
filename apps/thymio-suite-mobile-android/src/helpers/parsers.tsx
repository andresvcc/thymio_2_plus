export const getPathAfterLocalhost = (urlString: string): string => {
  try {
    // Este regex busca por 'localhost:3000/' y captura todo hasta el siguiente '/'
    const regex = /localhost:3000\/([^\/]+)\//;
    const matches = urlString.match(regex);

    if (matches && matches.length > 1) {
      // Retorna el grupo de captura que contiene la parte de la URL que buscamos
      return matches[1];
    }
    return ''; // Retorna una cadena vacía si no hay coincidencias
  } catch (error) {
    console.error('Error al analizar la URL:', error);
    return '';
  }
};

export const getQueryParams = (urlString: string): Record<string, any> => {
  const params: Record<string, any> = {};
  // Extrae la parte de la cadena de consulta de la URL
  const queryPart = urlString.split('?')[1];
  if (!queryPart) {
    return params;
  }

  // Divide la cadena de consulta en pares clave-valor
  const pairs = queryPart.split('&');
  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i].split('=');
    const key = decodeURIComponent(pair[0]);
    const value = decodeURIComponent(pair[1] || '');
    try {
      // Intenta analizar el valor como JSON
      params[key] = JSON.parse(value);
    } catch (error) {
      // Si falla el análisis JSON, usa el valor como una cadena
      params[key] = value;
    }
  }

  return params;
};
