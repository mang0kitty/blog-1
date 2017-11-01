---
title: Patterns for APIs
date: 2017-10-31 19:16:03
tags:
    - development
    - api
---

If you've built a production API before, you'll know that they tend to
evolve over time. This evolution is not only unavoidable, it is a natural
state that any active system will exist in until it is deprecated.

Realizing and designing to support this kind of evolution in a proactive
way is one of the aspects that differentiates a mature API from the thousands
that litter the Wall of Shame.

At the same time, it is important that your API remains easy to use and
intuitive, maximizing the productivity of developers who will make use of it.

<!--more-->

## Elementary Patterns
The following are what I consider to be "base" patterns which should always be
considered when building an API. While by no means comprehensive, they represent
a good basis on which to form your design and will help add a degree of consistency

### Versioning
Without a doubt, versioning is the single most valuable tool in the arsenal of someone
designing an API which can evolve as requirements change. There are a number of approaches
one can take, including the use of HTTP Headers, version specific domains or even URL query
parameters. My personal favourite is to simply include the API version in the URL's path.

{% tabbed_codeblock "API Versioning" %}
    <!-- tab path -->
    GET /api/v1/users HTTP/1.1
    Host: api.mycompany.com
    <!-- endtab -->
    <!-- tab query -->
    GET /api/users?api-version=1.x HTTP/1.1
    Host: api.mycompany.com
    <!-- endtab -->
    <!-- tab host -->
    GET /api/users HTTP/1.1
    Host: api-v1.mycompany.com
    <!-- endtab -->
    <!-- tab headers -->
    GET /api/users HTTP/1.1
    API-Version: 1.x
    Host: api.mycompany.com
    <!-- endtab -->
{% endtabbed_codeblock %}

### Identify API Routes
Unsurprisingly, APIs tend to form part of a larger system. Depending on your use case,
it can often be helpful to present both the API and a user interface on the same domain.
Not only does this cut down on the complexity of configuring [CORS][], it enables your users
to more easily identify related resources.

To ensure that it is possible to provide a user interface on the same domain, it is often
particularly helpful to prefix your various API methods with the `/api/` path component.

{% tabbed_codeblock "API Routes" %}
    <!-- tab api -->
    GET /api/v1/users HTTP/1.1
    Host: app.mycompany.com


    HTTP/1.1 200 OK
    Content-Type: application/json

    [
        {
            "id": 1,
            "name": "Bob"
        }
    ]
    <!-- endtab -->
    <!-- tab ui -->
    GET /users HTTP/1.1
    Host: app.mycompany.com


    HTTP/1.1 200 OK
    Content-Type: text/html

    <html>
        ...
    </html>
    <!-- endtab -->
{% endtabbed_codeblock %}

### Correct Verbs
Put quite simply: use the right HTTP verb for your purpose. This makes it easy for someone
who is unfamiliar with your API to identify what something does or what they can expect to
provide it without needing to dive through your docs.

Remember that the more time someone spends writing their own code, the happier they
are likely to be with your API. {% hl_text red %}
Don't make your user's lives difficult.
{% endhl_text %}

{% tabbed_codeblock "API Verb Usage" %}
    <!-- tab list -->
    GET /api/v1/users HTTP/1.1
    Host: app.mycompany.com
    <!-- endtab -->
    <!-- tab create -->
    POST /api/v1/users HTTP/1.1
    Host: app.mycompany.com
    Content-Type: application/json

    {
        "name": "Bob",
        "pet": "Charlie"
    }
    <!-- endtab -->
    <!-- tab replace -->
    PUT /api/v1/user/1 HTTP/1.1
    Host: app.mycompany.com
    Content-Type: application/json

    {
        "name": "Bob",
        "pet": "Doglet"
    }
    <!-- endtab -->
    <!-- tab modify -->
    PATCH /api/v1/user/1 HTTP/1.1
    Host: app.mycompany.com
    Content-Type: application/json

    {
        "pet": "Doglet"
    }
    <!-- endtab -->
    <!-- tab remove -->
    DELETE /api/v1/user/1 HTTP/1.1
    Host: app.mycompany.com
    <!-- endtab -->
{% endtabbed_codeblock %}

### Correct Status Codes
As with the verbs you make use of, the status codes returned by your API should be standards
compliant and as descriptive as possible. Providing the correct response code will allow clients
to quickly and safely respond to problems with a minimum amount of confusion.

At a minimum, you should be familiar with the following [HTTP Status Codes][] and know when
to use them.

| Code | Usage |
| --- | --- |
| `200 OK` | Used to indicate that a request completed successfully and that the response includes the requested content. |
| `201 Created` | Used to indicate that a request completed successfully and that an entity has been created as a result. |
| `204 No Content` | Used to indicate that a request completed successfully but that no content will be returned by the server. |
| `301 Moved Permanently` | Indicates that the entity you are requesting has been permanently moved to a different URL specified in the `Location` header. |
| `302 Found` | Indicates that the entity you are requesting can be found at the location specified in the `Location` header. |
| `400 Bad Request` | Indicates that the server could not process the request due to an error the client has made. This could be invalid syntax, missing fields, the wrong data etc. |
| `401 Unauthorized` | Used when a client has not provided (valid) credentials to access the current resource. |
| `403 Forbidden` | Used when a client tries to access a resource for which their credentials do not have access. |
| `404 Not Found` | Indicates that the server could not find the entity requested by the client at the given URL. |
| `405 Method Not Allowed` | Is the correct response code when using an unsupported HTTP verb on an entity (don't use `404 Not Found` for this). |
| `409 Conflict` | Indicates that the request could not be performed because there is a conflicting change, like an existing entity with the same ID. |
| `429 Too Many Requests` | Used to indicate that the client has exceeded its rate limit. |
| `500 Internal Server Error` | The general error message when your server fails to process a request for an unexpected reason that is no fault of the client. |
| `501 Not Implemented` | The equivalent of C#'s `NotImplementedException`, indicates that a method will eventually be present but is not yet. |
| `503 Service Unavailable` | Indicates that your service is down due to a problem or maintenance. |

### Pluralize Collections
Again, in the vein of making your API easy and intuitive to use, it is a good idea to
ensure that anything which returns a list of items has a pluralized entity name.

For example, if you are returning a list of users then you would make use of `/api/v1/users`
while to fetch a single user you would use the `/api/v1/user/{id}` route.

{% tabbed_codeblock "Entity Pluralization" %}
    <!-- tab plural -->
    GET /api/v1/users HTTP/1.1
    Host: app.mycompany.com


    HTTP/1.1 200 OK
    Content-Type: application/json

    [
        {
            "id": 1,
            "name": "Bob"
        }
    ]
    <!-- endtab -->

    <!-- tab singular -->
    GET /api/v1/user/1 HTTP/1.1
    Host: app.mycompany.com


    HTTP/1.1 200 OK
    Content-Type: application/json

    {
        "id": 1,
        "name": "Bob"
    }
    <!-- endtab -->
{% endtabbed_codeblock %}

### Specify Content Types
While something that sounds pretty obvious on the surface, it is incredible how many
APIs fail at this simple task. To put it simply: ensure that you always provide the
correct [MIME Type][mime-types] for the data you are sending to a client. This will
enable them to intelligently process the data correctly and will reduce the amount of
work that consumers need to perform when interacting with your service.

{% tabbed_codeblock "API Routes" %}
    <!-- tab json -->
    GET /api/v1/users HTTP/1.1
    Host: app.mycompany.com


    HTTP/1.1 200 OK
    Content-Type: application/json

    [
        {
            "id": 1,
            "name": "Bob"
        }
    ]
    <!-- endtab -->
    <!-- tab html -->
    GET /users HTTP/1.1
    Host: app.mycompany.com


    HTTP/1.1 200 OK
    Content-Type: text/html

    <html>
        ...
    </html>
    <!-- endtab -->
{% endtabbed_codeblock %}

### Support Compression
[Compression][HTTP Compression] has been a commonly available part of the HTTP specification since `HTTP/1.1`
was introduced. Today there are a wide range of supported compression standards which are
widely implemented, but at the minimum you should consider supporting `gzip`.

In practice, we have seen significant improvements to usability for customers once compression
has been enabled, especially in regions where high speed internet is not generally available.
Formats like JSON also tend to compress rather well, with us sometimes seeing as much as 40x
compression rates.

{% tabbed_codeblock "Compression Support" %}
    <!-- tab gzip -->
    GET /api/v1/users HTTP/1.1
    Host: app.mycompany.com
    Accept-Encoding: gzip, deflate


    HTTP/1.1 200 OK
    Content-Type: application/json
    Content-Encoding: gzip

    ...
    <!-- endtab -->
{% endtabbed_codeblock %}

## Complex Patterns
At times, there are edge cases that the elementary patterns simply do not cover satisfactorily.
This section tries to cover those edge cases and explain why one may opt to make certain design
decisions, where precedents have been set and what gotchas you should be aware of before starting.

### Searching a Collection
Searching is something that quickly becomes necessary as your dataset grows in size. Most customers
will only be interested in a small subset of that data and giving them the tools to select that
subset saves on bandwidth and computation time.

In most cases, searching can be accomplished by providing filters as part of your query parameters.
This approach enables you to continue using the `GET` verb safely, matches the approach taken by
most websites (with `?q=my search query`) and is simple to support with any HTTP client.

Unfortunately, implementations tend to limit the maximum number of characters in a URL, which places
a constraint on how long/complex your query can be and can realistically cause problems for your
users. More information can be found in this excellent [StackOverflow answer][url-length-answer],
but {% hl_text primary %}as a rule of thumb you should avoid using URL strings over 2048 characters in length.{% endhl_text %}

To work around this limitation, you can make use of the body of your request to embed much larger
queries. This does, however, introduce the problem that some HTTP clients and servers do not support
`GET` requests with a body. As a result, it is generally a good idea to support the `POST` verb as
well.

My personal preference is to have a specific `/search` endpoint for the `POST` verb to differentiate
it from the creation pattern.

{% tabbed_codeblock "Searching Collections" %}
    <!-- tab query -->
    GET /api/v1/users?name=Bob HTTP/1.1
    Host: app.mycompany.com
    <!-- endtab -->

    <!-- tab body -->
    GET /api/v1/users HTTP/1.1
    Host: app.mycompany.com
    Content-Type: application/json

    {
        "name": "Bob"
    }
    <!-- endtab -->
    <!-- tab post -->
    POST /api/v1/users/search HTTP/1.1
    Host: app.mycompany.com
    Content-Type: application/json

    {
        "name": "Bob"
    }
    <!-- endtab -->
{% endtabbed_codeblock %}

### Rate Limiting
If you're exposing an API to external customers, rate limiting is something you will likely find
yourself considering. At its simplest, rate limiting is used to prevent the processing of requests
from customers who are placing undue strain on your systems. Usually this is the result of the
customer not having implemented a portion of their service well, however one must be careful not
to artificially limit the growth of their largest customers in doing so.

Regardless of how you choose to implement rate limiting, it is a good idea to inform your customers
and provide suggestions on how best to handle situations in which they are rate limited. This will
allow them to react effectively and, if possible, avoid being rate limited in the first place by
restricting the load they impose on your systems in the first place.

Of the various rate limiting algorithms available, one of the more popular ones is a token bucket
which has a fixed refill rate and grants "tokens" for requests. When the bucket is emptied, the
customer is rate limited until there are enough tokens available to process a request.

In this approach, it is incredibly useful to include `API-Bucket-Remaining` and `API-Bucket-Rate`
header fields in your responses, allowing clients to predictively scale their load to ensure that
they do not exhaust the number of available request tokens available to them.

Of course, once the rate limit is hit, you should return an `429 Too Many Requests` status code.

{% tabbed_codeblock "Rate Limiting" %}
    <!-- tab normal -->
    GET /api/v1/users HTTP/1.1
    Host: app.mycompany.com

    HTTP/1.1 200 OK
    API-Bucket-Remaining: 499
    API-Bucket-Rate: 10

    []
    <!-- endtab -->
    <!-- tab limited -->
    GET /api/v1/users HTTP/1.1
    Host: app.mycompany.com

    HTTP/1.1 429 Too Many Requests
    API-Bucket-Remaining: 0
    API-Bucket-Rate: 10
    <!-- endtab -->
{% endtabbed_codeblock %}


[CORS]: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
[HTTP Compression]: https://en.wikipedia.org/wiki/HTTP_compression
[HTTP Status Codes]: https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
[mime-types]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Complete_list_of_MIME_types
[url-length-answer]: https://stackoverflow.com/questions/812925/what-is-the-maximum-possible-length-of-a-query-string

*[CORS]: Cross-Origin Resource Sharing