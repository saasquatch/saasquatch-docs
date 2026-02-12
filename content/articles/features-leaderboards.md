---
title: Leaderboards
highlights: Leaderboards rank participants and allow them to see their rank relative to others.
slug: features/leaderboards
sectionType: successArticle
template: hasTableOfContents.html
date: 2022-04-21
robotsTag:
  - FOLLOW
---

## Introduction
Leaderboards can provide incentive for participants to take action and accomplish program objectives. They add an element of gamification alongside your program.

## Available Leaderboards
SaaSquatch provides three different types of leaderboards. When used with a program or global widget, they are updated hourly with the latest ranking.

### Top Started Referrers
The top started referrers leaderboard ranks participants by their number of started referrals. For example, if:
- User A refers User B
- User A refers User C

then User A has two started referrals and a leaderboard value of two.

### Top Converted Referrers
The top converted referrers leaderboard ranks participants by their number of converted referrals. A referral becomes converted when the referred user reaches a [program defined goal](/success/core-topics/#conversion). For example, if:

- User A refers User B
- User A refers User C
- User B makes a purchase (which triggers a conversion)

then User A has one converted referral, and a leaderboard value of one.

### Top Point Earners
The top point earners leaderboard ranks participants by the number of points they have earned. It sums all rewards of the `POINT` reward unit that are not canceled or pending. For example, if:

- User A receives 10 points for signing up for a free trial
- User A receives 20 points for purchasing a one month membership

Then User A has two points rewards and a leaderboard value of 30.

## Leaderboard Ranks
A user's leaderboard rank is expressible in different ways. There are three different supported ranking algorithms for leaderboards to represent ties.

### Row Number
Row number is the simplest ranking algorithm. The leaderboard computes a value for each participant, then assigns them a row number.

For example, consider the following participants and values:
- User A: 10
- User B: 1
- User C: 5
- User D: 10

In this ordering, the participants in the leaderboard would be displayed with the following ranks:
1. User A: 10
2. User D: 10
3. User C: 5
4. User B: 1

Note that both User A and User D have the same value. There's no guarantee about the ordering between users with the same value. Another possible outcome that is valid for row number ranking is:
1. User D: 10
2. User A: 10
3. User C: 5
4. User B: 1

### Rank
The rank algorithm assigns the same leaderboard rank to the same participant value. When ties occur, it leaves numerical gaps in the leaderboard ranking. 

For example, consider the following participants and values:
- User A: 10
- User B: 1
- User C: 5
- User D: 1

In this ordering, the participants in the leaderboard would be displayed with the following ranks:
1. User A: 10
1. User B: 10
3. User C: 5
4. User B: 1

Note that User A and User B have the same rank of 1, and User C gets rank 3. The leaderboard skips rank 2 in the case of the tie. 

### Dense Rank
The dense rank algorithm assigns the same leaderboard rank to the same participant value. Although unlike the rank algorithm, it does not leave numerical gaps in its ranking.

For example, consider the following participants and values:
- User A: 10
- User B: 1
- User C: 5
- User D: 1

In this ordering, the participants in the leaderboard would be displayed with the following ranks:
1. User A: 10
1. User B: 10
2. User C: 5
3. User B: 1

Note that User A and User B have the same rank of 1, and User C gets rank 2.

## Filtering Leaderboard Activity
Activities counting towards a participant's leaderboard value and rank are filterable. Our leaderboards support two optional types of filtering, by program and by time interval.

### Program Based
Leaderboards can either be globally scoped or program scoped. When globally scoped, leaderboards evaluate referrals or rewards from all programs and sources. When program scoped, leaderboards evaluate only referrals or rewards from a specified program. This gives leaderboards the flexibility to run alongside many or one program.

### Time Based
Leaderboards are filterable by time intervals with a start and end date. Only referrals or rewards from within the interval are used to compute a participant's leaderboard value. Any activity outside of the interval gets ignored by the leaderboard.

## End User Experience
Leaderboards can be included into your widgets using our mint components package. They display participants leaderboard value, rank, first name and last initial. The row of the viewing participant gets highlighted in brand color and the rank column is hideable if needed. A customizable empty state is displayed if there are no leaderboard results. 

![Points Leaderboard](/assets/images/contentful/Screen_Shot_2022-04-21_at_3.36.23_PM_VMAx5358UubE6q92Vc5zo.png)