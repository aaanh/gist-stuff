addEventListener("fetch", (event) => {
  event.respondWith(
    handleRequest(event.request).catch(
      (err) => new Response(err.stack, { status: 500 })
    )
  );
});

const invalid = `<DOCTYPE html>
<body>
  <h1>Invalid Request</h1>
  <p>Code: 404</p>
</body>
</html>
`

/**
 * Many more examples available at:
 *   https://developers.cloudflare.com/workers/examples
 * @param {Request} request
 * @returns {Promise<Response>}
 */
async function handleRequest(request) {
  const { searchParams } = new URL(request.url);
  const regex = new RegExp('(https:\/\/)?gist.github.com\/[a-zA-Z0-9_\-]*\/([a-zA-Z0-9]*)');

  let gist_url = searchParams.get('gist_url') ?? null;
  let assert_url = regex.test(gist_url);


  console.log(gist_url)

  if (gist_url == null || gist_url == '' || assert_url == false) {
    return new Response(invalid, {
      headers: {
        'content-type': 'text/html;charset=UTF-8'
      }
    })
  }
  else {
    const response = gist_url + '/raw'
    return fetch(response);
  }


}