+++
categories = ["development", "operations", "theory"]
comments = false
date = "2018-09-28T15:03:05+00:00"
draft = true
tags = ["development", "operations", "theory"]
title = "Blueprint for a Monitoring Stack"

+++
For the last two years I've been working as the lead designer on a monitoring stack for Demonware. This stack is responsible everything from data acquisition to alerting and much besides. In this post I'll go over some of the design decisions we made, why we made them and some guidance for anybody designing their own monitoring stack.

<!-- more -->

## What must it do?

When evaluating a monitoring stack, there are a few things I look for. It must be **sensitive** to changes in the expected state of the things it is monitoring - it is always better to have more information than less. It must have a **high signal to noise ratio** because you really don't want to have to try and clean up a noisy event stream as a human, that leads to alert fatigue and defeats the point of the endeavour.

The monitoring stack should **provide added value** over and above what is available from a basic check system like Nagios. This might mean that it attaches **additional, useful, context** to the events it presents, is able to route **problems to the people who can fix them** and allows **configuration by customers**.

With that in mind, you're looking to build a stack which takes what you probably have already (a stream of events indicating that things have broken) and intelligently presents those events, at the right time, to the right people with all of the information they need to be able to triage the problem as quickly as possible.

Remember that there is a distinct difference between a monitoring stack and a metrics/logging stack. Where metrics and logging are exceptionally good at tracking down root causes, providing long-term behavioural insights and exposing detailed runtime data; monitoring is responsible for precisely and reliably identifying when things break. Where an engineer during their normal work week might use logs and metrics to track down why something broke so that they can fix the underlying issue, an engineer being paged at 0300 on a Sunday is looking for the quickest way to restore service. Two very different use cases and two very different stacks to support them.

## How does it do this?
Let's start with the bad news: on its own, the tech doesn't. The only way to get this right is by changing the way that your organization approaches monitoring and setting solid expectations around it. The technology you use and the stack you build will play a huge role in enabling that transformation, but without the support of your people, you'll just have a very fancy NOC dashboard.

The good news is that once you've got the kind of stack we have, people actually want to make those changes. So let's talk about how you can build that stack