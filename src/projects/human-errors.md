---
title: Human Errors
group: Libraries
description: |
    An error library which provides users with practical advice on how to deal with failures in your service.
permalinkPattern: /projects/:slug/
date: 2021-02-22
layout: GitHubProject
repo: sierrasoftworks/human-errors-rs
docs: https://docs.rs/human-errors
---

# Human Errors
**Errors which make your users' lives easier**

This crate provides an `Error` type which has been designed to make errors
something which help guide your users through your application rather than
blocking their progress. It has fundamentally been designed with the expectation
that any failure can be mitigated (even if that means cutting a GitHub issue)
and that explaining to your user how to do so is the fastest way to get them
moving again.

<!-- more -->

## Features

- **Advice** on how to resolve a problem is a fundamental requirement for the creation of an error,
   making your developers think about the user experience at the point they write the code.
- **Wrapping** allows you to expose a causal chain which may incorporate advice from multiple layers
   in the stack - giving users a better sense of what failed and how to fix it.
- **Integration** with the `std::error::Error` type allows you to wrap any `Box`-able error in the
   causal chain and provide additional context.

## Getting Started
### Rust

```toml
# Cargo.toml

[dependencies]
human-errors = "0.1"
```

#### Example

```rust
use std::fs;
use human_errors::{user_with_internal, Error};

fn main() {
    match read_file() {
        Ok(content) => println!("{}", content),
        Err(err) => eprintln!("{}", err),
    }
}

fn read_file() -> Result<String, Error> {
    fs::read_to_string("example.txt").map_err(|err| user_with_internal(
        "We could not read the contents of the example.txt file.",
        "Check that the file exists and that you have permission to access it.",
        err
    ))?
}
```

::: tip
The above code might result in an error which, when printed, shows the following:

```
Oh no! We could not read the contents of the example.txt file.

This was caused by:
File Not Found

To try and fix this, you can:
 - Check that the file exists and that you have permission to access it.
```
:::

## Background
When rewriting [Git-Tool](/projects/git-tool/) on Rust, one of the big areas I
wanted to improve upon was how failures were communicated to the user. In earlier
versions, failures were pretty verbosely communicated and it was up to the user
to infer, from this, the correct course of action. Sometimes this worked, but in
many more cases this left the user confused and unable to make progress.

To address this, I created a custom `Error` type in Rust which maintained three
crucial pieces of information:

1. Was this failure the result of something the user did, or a failure in the app
   which they had no control over?
2. What happened to cause the failure (the plain-english description of what went wrong)?
3. What can the user do to work around this failure or resolve it?

This corresponded to the following structure in Rust:

```rust
pub enum Error {
    UserError(String, String),
    SystemError(String, String),
}
```

Of course, there are also situations where a higher-order failure occurs because of
something further down the stack. Error wrapping is relatively common in different
languages, with C# exposing `Exception.InnerException` and Go taking the approach of
appending internal error messages to the outer error.

In my case, I wanted to be able to represent this sequence of failures for the user,
to provide them with a sense of how the failure progressed and give them advice which
potentially enabled workarounds at each level of the stack.
