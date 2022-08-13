class FetchApp {
  static Get(request) {
    const {
      url,
      endpoint,
      headers,
      query,
    } = request;

    const params = {
      method: 'get',
      headers: {
        ...headers,
        'content-type': 'application/json',
      },
    };

    const queryStringReducer = (previous, current, index) => {
      const [currentKey, currentValue] = current;
      return `${previous}${index > 0 ? '&' : ''}${currentKey}=${currentValue}`;
    };
    const queryString = query ? Object.entries(query).reduce(queryStringReducer, '') : '';

    return UrlFetchApp.fetch(`${url}/${endpoint}?${queryString}`, params);
  }

  static Post(request) {
    const {
      url,
      endpoint,
      headers,
      payload,
    } = request;

    const params = {
      method: 'post',
      headers: {
        ...headers,
        'content-type': 'application/json',
      },
      payload: JSON.stringify(payload),
    };

    return UrlFetchApp.fetch(`${url}/${endpoint}`, params);
  }

  static Delete(request) {
    const {
      url,
      endpoint,
      headers,
    } = request;

    const params = {
      method: 'delete',
      headers: {
        ...headers,
        'content-type': 'application/json',
      },
    };

    return UrlFetchApp.fetch(`${url}/${endpoint}`, params);
  }

  static GetJson(response) {
    return JSON.parse(response?.getContentText()) ?? {};
  }
}
