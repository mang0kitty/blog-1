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

# What must it do?

When evaluating a monitoring stack, there are a few things I look for. It must be **sensitive** to changes in the expected state of the things it is monitoring - it is always better to have more information than less. It must have a **high signal to noise ratio** because you really don't want to have to try and clean up a noisy event stream as a human, that leads to alert fatigue and defeats the point of the endeavour.

The monitoring stack should **provide added value** over and above what is available from a basic check system like Nagios. This might mean that it attaches **additional, useful, context** to the events it presents, is able to route **problems to the people who can fix them** and allows **configuration by customers**.

With that in mind, you're looking to build a stack which takes what you probably have already (a stream of events indicating that things have broken) and intelligently presents those events, at the right time, to the right people with all of the information they need to be able to triage the problem as quickly as possible.

Remember that there is a distinct difference between a monitoring stack and a metrics/logging stack. Where metrics and logging are exceptionally good at tracking down root causes, providing long-term behavioural insights and exposing detailed runtime data; monitoring is responsible for precisely and reliably identifying when things break. Where an engineer during their normal work week might use logs and metrics to track down why something broke so that they can fix the underlying issue, an engineer being paged at 0300 on a Sunday is looking for the quickest way to restore service. Two very different use cases and two very different stacks to support them.

# How does it do this?
Let's start with the bad news: on its own, the tech doesn't. The only way to get this right is by changing the way that your organization approaches monitoring and setting solid expectations around it. The technology you use and the stack you build will play a huge role in enabling that transformation, but without the support of your people, you'll just have a very fancy NOC dashboard.

The good news is that once you've got the kind of stack we have, people actually want to make those changes. So let's talk about how you can build that stack.

## Customer Driven
Remember how I said that people are what makes or breaks this transformation? Giving those people the tools they need to tailor behaviour to suit their use cases is a critical feature for building that initial engagement and supporting teams through that evolution.

### "Bring your own checks"
It is important to realize that most of your customers will not be coming from a green-field environment, rather they will bring along years or even decades of existing check infrastructure and asking them to flush it all to make the switch to your stack is going to be a tricky conversation to have. Instead, making support for arbitrary datasources a cornerstone of your service will enable you to onboard teams with legacy monitoring infrastructure quickly, begin delivering value and then drive modernization on the backbone of your more advanced functionality rather than through a barrier to entry.

An extremely good approach to this is to provide tooling that allows customers to plug their own data-transformation engines into your pipeline to manipulate the data they generate into a form which is compatible with...your API.

### An API
I can't stress this enough: **having an API will make your life a hundred times easier**. If you're considering having your stack integrate with your customers' existing infrastructure, you're doing things wrong. Your stack is trying to solve tomorrow's problems and designing it based on the tools of yester-decade will only serve to slow your progress, detract from the simplicity of your stack and reduce its agility.

Instead, focus on defining a fully featured and well structured API through which any potential datasource may submit events for processing and tune their behaviour. Once you have that, build microservices which are responsible for doing elementary data transformation and ingestion on behalf of your legacy systems and have them consume that API directly. This approach allows you to add support for new data sources without needing to touch your core service, enables you to create bespoke integrations for each of your customers with minimal effort and even allows you to offload particularly costly operations to a fleet of stateless data transformation agents before events even reach your stack. 

A particularly nice option for these integrations is to leverage a Functions as a Service platform like [AWS Lambda](https://aws.amazon.com/lambda/), [OpenFaaS](https://github.com/openfaas/faas) or [Kubeless](https://kubeless.io/).

## Fall Into Success
The hallmark of any good framework is that it's easier to do things the right way than it is to do it the wrong way. In most cases, this is the result of the engineers who build the framework being aware of the internal biases and fallacies that people make on a daily basis, designing their system to either leverage or avoid them.

When you're designing your stack and its API, try to keep this in mind. Keep the number of decisions that a customer has to make to a minimum, guide them down the well-paved-road to success and present them with easy to select forks rather than complex intersections with a number of potentially correct routes to their destination.

### Simple Options
Wherever your customers need to make a decision, keep the list of options to a minimum. Humans are really, really bad at making decisions when faced with a large number of options - so help them along and ask "sushi or pizza for lunch?" to keep it quick. **Drive the conversation**.

##### Service Status
 - `healthy`
 - `unhealthy`
 
 Giving intermediary options like "warning" or "unknown" simply leads to confusion about what is actionable and what isn't. Either your service is healthy or it isn't. If a check can't determine which it is, the check isn't checking the right thing.

##### Priority
 - `high` or "wake me up at 0300 on a Sunday if this breaks"
 - `low` or "I'll look at this on Tuesday when I'm back from my long weekend"
 
 Nobody knows what a "medium" priority alert means: does that mean I can finish my mug of coffee, or do I need to sprint to my desk? Is this impacting customers, or is the system just feeling cranky after getting no attention from ops for 3.217 femtoseconds? Keep things simple and actionable, but also encourage your customers to design systems to fail in one of two ways: it's actually down and needs someone on the double vs the system can limp along but needs some help to get back on its feet when you can spare the time.

Having a database server fail on you should fall into the latter category, losing a datacenter will probably fall into the former (unless you collect DCs like I collect Lego).

## Events as a unit of work
Remember that API I mentioned? It works really well if the things it receives are "events". An event can hold whatever information you deem necessary, but it should represent the change in state of a particular service or component. By working with a stream of events, you can design your stack to operate as a series of simple, stateless, actors which are responsible for processing a certain type of event and (in some cases) generating others.

### Data Collection

### Static Pre-filtering

### Dynamic Pre-filtering

### Grouping

### Context Collection

### Alerting