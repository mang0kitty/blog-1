+++
categories = ["operations", "business", "theory"]
comments = true
date = "2018-04-07T19:35:00+00:00"
draft = true
tags = ["operations", "business", "theory"]
title = "The Cost of Backups"

+++
I've been putting together a recent series on how to easily run backups
on [Kubernetes][] and it struck me that there's a range of theory that underpins
the decisions one must make when designing a backup system. This theory is
not often discussed and in many cases you "take backups in case something bad
happens" without having a clear understanding of why different backups should
be taken, how long they should be retained for or when you should be taking
them.

In this post I'll go over some of the costs associated with backups (both the
direct and indirect) and how those will affect various decisions you make when
designing a system that uses backups.

<!--more-->

## Introduction
While the value of having backups cannot be overstated, one must also remain
cognizant of the cost that maintaining them imposes on your organization. That
is to say that when designing your backup strategy it is important to evaluate
how your decisions affect the long term operational costs for your organization
as well as the impact of data loss and balance the two.

If you think of backups as insurance, then the idea becomes easier to
grasp. In the world of insurance: higher monthly premiums reduce your
cost of excess (the amount you pay when you place a claim), so there is a
trade-off between how much you pay every month and how much you need to pay
when something goes wrong.

This exact trade-off applies to backups as well. With an unlimited amount
of money, you would be able to afford to maintain an almost unlimited number
of backups and the cost of recovery (lost data) would be minimal in every
case.

In practice, however, you are not going to be able to afford to maintain an
unlimited number of backups and will need to instead balance the cost of storing
backups against the cost of any lost data as a result of you not having a backup
that covers that data loss.

### Types of Data Loss
This brings us neatly to the question of "what is data loss?". Put quite
simply, it is anything which results in you no longer having access to data
that you want to have access to.

### Deletion
At its most innocuous, data loss can simply be someone accidentally deleting
the wrong file. This happens a lot more frequently than you'd imagine and there
have been a number of high profile instances like [GitLab's][gitlab-database-loss].

{{< figure "**Figure 2** Data Deletion" "https://minio.sierrasoftworks.com/blog/rolling_backups_deletion.jpg" >}}

A lot of the time, you'll find short term or even nightly backups being used to
restore user data that has been accidentally removed by someone who was a bit too
over-zealous with the `Delete` button.

#### Corruption
Unfortunately, the reality of the physical domain is that things tend to decay. While
long term storage decay is a common source of corruption, it isn't the only thing that
can leave data in a form that prevents you from accessing the information you are looking
for.

{{< figure "**Figure 3** Data Corruption" "https://minio.sierrasoftworks.com/blog/rolling_backups_corruption.jpeg" >}}

In practice, everything from hardware failures to bad software updates can result in
your data being damaged (and making you thankful for your backups when it comes time
to repair it).

#### Destruction
Finally, data destruction involves the actual loss of your data. This could
be the result of a fire in your datacenter, a natural disaster or even a
faulty HDD in systems that don't have redundancy on the hardware level.

{{< figure "**Figure 4** Data Destruction" "https://minio.sierrasoftworks.com/blog/rolling_backups_destruction.jpg" >}}

While complete data destruction is rare in most production-grade systems
as a result of application level, and even disk level, data replication;
it does pose a significant risk to the business' value simply due to the
impact it can have.

### Cost of Storage
While the cost of long term archival storage has continued to drop, with
services like Amazon's [S3][] offering excellent durability and very good
pricing, the reality is that for many larger organizations it simply is not
feasible to store unlimited numbers of backups.

Let's take a mid sized database which sees 5GB of changes made each day. Point
in time recovery would require that approximately that amount of data in logs
be backed up and over a 5 year system lifespan you would be looking at 9TB of
backups. Scaling that up to a production grade system that sees well over 100TB
of changes per day and you're talking 18PB over a 5 year lifespan. On S3, just the
data storage costs for that range between $700 and $2400 per month, quickly becoming
prohibitively expensive.

Of course, you'd also ideally like to be able to restore your backups in a
reasonable amount of time, so that means storing snapshots on top of those logs,
increasing the size of your stored backups gain and further raising costs.

### Cost on Performance
Something not often considered when using backups is the impact that making
a backup has on a system's performance. Depending on the type of backup you
are performing, this may require a full read of the entire database - significantly
impacting the availability of IO resources for other queries and in some cases
resulting in locking of the database, preventing or slowing requests for the
duration of the backup task.

This may impose limitations on when you can make backups, how frequently (or quickly)
you can do so and may even require that additional hardware be provisioned for the
explicit task of taking backups on systems that are particularly sensitive to performance
fluctuations.

[gitlab-database-loss]: https://about.gitlab.com/2017/02/01/gitlab-dot-com-database-incident/
[Kubernetes]: https://kubernetes.io/
[S3]: https://aws.amazon.com/s3/