+++
categories = ["development"]
comments = true
date = "2019-03-01T00:00:00+00:00"
draft = true
tags = ["development"]
title = "Organizing your Project Directory"

+++
We've all been there. Sitting at your computer staring at the 3rd instance of a project on your disk trying to figure out which one is the most recent copy and _why_ you have three different copies to begin with. Along the way, you could swear you saw at least one typo'ed  directory name and that probably accounts for one of them, but maybe the reason for the other was that the project moved from C++ to C# and so you must have `clone`d it there by mistake... Ah to hell with it, you've got a bug to fix so you'll just clone another and deal with this later.

# Organizing your Project Directory

I'll be honest with you, organizing your development environment is hard. Almost as hard as figuring out whether to call your shared library `.Common` or `.Shared` or `.Utils` or `.TechDebt`. In fact, in the 14 odd years I've been writing code, I've routinely struggled to find a structure which keeps things well organized and easy to find while simultaneously avoiding duplication and remaining consistent over time.

In this blog post I'll run through the approach I currently take to organizing my project directory and introduce a few tools I've written to help simplify the task in the hopes that it helps others find their `fs-zen`.

## Projects are Cattle, not Pets

> No! You can't take it from me, this is my favourite project and it needs to be cherished!

One of the biggest realizations I had when working on my (5th) project directory structure was that much of the "mess" in previous versions stemmed from trying to find descriptive taxonomies within which to group projects. Something as innocuous as "let's group them by customer" or "let's organize them by language" quickly led to an explosion of legal terms as one justifies the unique properties of the project.

> Well sure, it's a website, but it's in TypeScript so it should be in a special TypeScript folder...

Some of the taxonomies I've tried over the years have included:

* Programming language
* Company name
* Project type (website, desktop, mobile...)
* High level code words

All of these have ended up in the same spaghetti-ed mess of nested directories, duplicate projects, sparse directory trees and worse. Treating each project like it has something special about it is, in my case, the reason for this.

## Git(Hub) is the standard

The next revelation for me was that I spent more time searching GitHub for projects than I spent on my local machine. Not only did it make finding projects easier, but it let me pretend (to a small degree) that the code was always available when I needed it and that I didn't need to worry about a local copy.

In practice you still needed to `git clone` and decide where things ended up on your filesystem, but my Git server became the de-facto source of truth for my projects both in a personal capacity as well as in my professional work environments.

It also just so turns out that GitHub has figured out how to give projects unique paths too. In their case, they give each project a namespace (your username) and a unique slug within that namespace. `sierrasoftworks/blog` for example...

This actually works really nicely, it's easy to remember, descriptive (enough) and is extremely information dense. So how do we replicate that locally?

## My Layout

`${DEV_DIRECTORY}/${service}/${namespace}/${name}`

So, in my case, that may be something like `C:\dev\github.com\sierrasoftworks\blog` which makes finding specific projects extremely easy, not to mention forcing de-duplication of project code.

I'll shamelessly admit that I stole much of this from Go. While I'm not sure that Go (pre-modules) gets this right from a dependency management perspective, it works great for getting access to code.

### Working with this

While this layout looks great, it also allows us to do some really nice tricks when it comes to managing those repos. For starters, we know precisely where we should clone a given GitHub repository to without the user needing to provide that information.

\`\`\`powershell

Get-Repo sierrasoftworks/blog

\`\`\`