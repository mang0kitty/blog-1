+++
categories = ["development", "patterns"]
comments = false
date = "2018-09-15T17:41:49+00:00"
draft = true
tags = ["development", "patterns"]
title = "Evented IO for Production Systems"

+++
Evented IO isn't a particularly new concept, however it has recently become obvious to me that not enough people understand the true value that it offers or how it works. This is a real pity because, for certain applications, it can offer significant advantages over more traditional models.

I'm going to try and avoid letting this post turn into a "Look at the amazingly fast app I made by using this magic silver bullet" and instead try to provide a well-rounded discussion of the advantages, disadvantages and suitable use cases for this pattern as well as the easiest way to leverage them in a few different languages.

<!--more-->

## What is Evented IO?
At a very high level, evented IO is a way of managing the execution of your program such that it can perform other work while it waits on external resources. These resources might be disk, network, time or another process/thread. There are a number of ways to wait on these resources and in general these can be split into two categories: blocking and non-blocking. Blocking operations occupy a process thread for the duration of the wait, while non-blocking requests will make use of an asynchronous interrupt to indicate when work has completed.

This pattern itself is far from new and has existed in one form or other for decades, everything from hardware interrupts on your CPU to push notifications on your phone apply the concept of an out-of-band, asynchronous notification to perform work as a means to reduce resource utilization withhout compromising on performance.

{{< codeblock "Blocking vs Non-blocking" >}}
	{{< codeblock-tab c "Non-Blocking" >}}
    
    {{< /codeblock-tab >}}

{{< /codeblock >}}

\## Background

\**Give some background on this post**

> I've been writing blog posts for years and my experience,

> as well as vast bodies of scientific evidence\[^1\] have proven

> that posts are at the core of any good blog.

\## Describe the Theory

\**Go into what this post is suggesting**

> With all this evidence supporting them, you really should

> be creating posts for your blog. Here's a few things which

> make up a good post and how to apply them in your own blog.

\## Show the Results

\**Give them an example of what the theory looks like when applied**

> This post is an example of what a good blog post could look

> like if you follow all these great steps.

\## Closing

\**Finish up and present your conclusions**

> After all that, you should be convinced that posts are the

> way to go and have a good idea of how to structure them.

\[^1\]: Science yo!