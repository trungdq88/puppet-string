const firstOrNull = items => (items.length ? items[0] : null);

module.exports = class UrlHeaderRequestMatcher {
  constructor(rules) {
    this.rules = rules;
  }

  match(request) {
    const matches = this.rules
      .filter(({ urlPattern, headers }) => {
        const isMatchUrl = request.url().match(urlPattern);
        const noHeadersProvided = !headers || Object.keys(headers).length === 0;
        const isMatchHeader =
          noHeadersProvided ||
          Object.keys(request.headers()).every(
            key => headers[key] === request.headers()[key],
          );
        return isMatchUrl && isMatchHeader;
      })
      .map(_ => _.response);

    return firstOrNull(matches);
  }
};
