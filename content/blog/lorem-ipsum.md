---
title: Lorem Ipsum
author: "Michael Henderson"
date: 2016-09-28
keywords: ["hugo"]
description: >
  This is the first in a short series of posts designed to introduce Lurk in a
  very specific way. The first two, “Why SNARKs?” and “Zero Knowledge,” make
  little mention of Lurk. Instead, they familiarize the reader with the
  underlying landscape from which Lurk emerged. Specifically, you will find a
  combination of historical context (vis-à-vis the creation of Filecoin proofs)
  and explication of key concepts such as Merkle Trees, inductive proofs,
  verifiable computation, and zero-knowledge. 


  In the third post, we begin to address specific elements of traditional SNARK
  proving systems that Lurk was created to address. The fourth and final post
  of this introductory series, written with programmers in mind, will give a
  more in-depth introduction to Lurk as a programming language. 


  If you are already well-versed in the field of zero-knowledge cryptography,
  you can likely begin with the third post, though some readers may still find
  these preliminary posts interesting, even helpful.
---

# Filecoin proofs

Because Lurk is a Turing-complete programming language for recursive zk-SNARKs
(zero‑knowledge succinct non-interactive arguments of knowledge), understanding
Lurk requires understanding SNARKs. Since Lurk was developed in response to
work on Filecoin proofs, it makes sense to begin there. Specifically, it is
instructive to examine what a Filecoin proof might look like without SNARKs.
The goal in doing this is twofold: to introduce and explain core concepts of
cryptographic proofs and to make obvious the need for more succinct proving
mechanisms, of which SNARKs are the state of the art.

Filecoin uses two SNARK
proofs: Proof of Replication (PoRep) and Proof of Space-time (PoSt). Since the
intent here is not a detailed analysis of Filecoin proofs, we will focus on the
simpler proof, PoSt. The goal of this analysis is to help you appreciate
succinct proving mechanisms, such as SNARKs, what they can accomplish, and the
incremental benefit they provide. Future posts will build on this to articulate
what Lurk brings to the world of SNARKs.

The idealized problem PoSt was
designed to solve is this: I want to prove to you that I have possession of a
file. You will interrogate me by sending random ‘challenges’. Each challenge
you send corresponds to the index position of a chunk of the file I claim to
possess. I answer the challenge by sending you proof that I possess that
particular chunk of the file. The more challenges I answer, the more likely it
is that I really have the file. With enough correctly-answered challenges, you
are convinced that I must indeed possess the file. So the number of challenges
issued per PoSt is a function of the desired security level: the more resistant
to cheating we require the system to be, the more random challenges must be
answered.

Note that this system of challenge/response only works if it is
infeasible (or irrational) for me to regenerate the replicated data without
having stored it through time. This is ensured by properties of the sealing
algorithm. It must (in Filecoin’s current security model) be more expensive to
regenerate the data than to simply store it, and the sealing algorithm must
produce output that cannot be compressed. It must also be infeasible (or
irrational) for the prover to quickly synthesize the data algorithmically when
challenged. These are the problems addressed by Proof of Replication, which we
will not otherwise address here.

{{<mermaid class="text-center">}}
stateDiagram-v2
    State1: The state with a note
    note right of State1
        Important information! You can write
        notes.
    end note
    State1 --> State2
    note left of State2 : This is the note to the left.
{{</mermaid>}}

# Proof of Knowledge

The overarching problem of PoSt reduces to the problem of proving knowledge of
a file chunk at a given position. If I can do that for any arbitrary position,
then I can answer however many challenges are presented. In the PoSt setting,
elements dealt with are ‘chunks’ (as described above), and a sequence of chunks
constitutes a ‘file’ or ‘sector’ or ‘replica’. From now on, we will stop
thinking in terms of files and chunks, specifically, and instead consider more
broadly proving knowledge of some element of a sequence. We will continue to
simplify and generalize, as we make our journey (over the course of this and
subsequent posts) from a highly Filecoin-specific problem to a much more
general one.

{{<katex display>}}
  f(x) = \int_{-\infty}^\infty\hat f(\xi)\,e^{2 \pi i \xi x}\,d\xi 
{{</katex>}}

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla consectetur nec
massa ut iaculis. Mauris aliquet mi id tristique tristique. Duis varius
consectetur mi eu suscipit. Duis at gravida arcu, et placerat metus. Quisque
orci lacus, vulputate vestibulum vulputate eu, euismod sed mauris. Quisque eget
orci orci. Nullam ultrices, tortor ut imperdiet mattis, arcu ligula molestie
urna, vitae efficitur felis ligula sit amet est. Proin id arcu nisi. Quisque
sagittis sit amet nulla eu mollis. Cras lobortis tortor in lectus efficitur,
vel ultrices nunc cursus. Donec id nibh vitae massa posuere condimentum eu nec
sapien. Sed ac fringilla tellus, at feugiat eros. Quisque gravida ligula felis,
sed molestie dolor hendrerit ut. Nam at urna posuere, porttitor ipsum non,
tristique magna. Cras eget varius lorem. Curabitur vehicula mauris vitae nisl
faucibus, vel blandit nisl accumsan.

```js
var hello = "Hello, World!";
console.log(hello);
```

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla consectetur nec
massa ut iaculis. Mauris aliquet mi id tristique tristique. Duis varius
consectetur mi eu suscipit. Duis at gravida arcu, et placerat metus. Quisque
orci lacus, vulputate vestibulum vulputate eu, euismod sed mauris. Quisque eget
orci orci. Nullam ultrices, tortor ut imperdiet mattis, arcu ligula molestie
urna, vitae efficitur felis ligula sit amet est. Proin id arcu nisi. Quisque
sagittis sit amet nulla eu mollis. Cras lobortis tortor in lectus efficitur,
vel ultrices nunc cursus. Donec id nibh vitae massa posuere condimentum eu nec
sapien. Sed ac fringilla tellus, at feugiat eros. Quisque gravida ligula felis,
sed molestie dolor hendrerit ut. Nam at urna posuere, porttitor ipsum non,
tristique magna. Cras eget varius lorem. Curabitur vehicula mauris vitae nisl
faucibus, vel blandit nisl accumsan.
