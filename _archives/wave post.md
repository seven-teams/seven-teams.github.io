---
title: "Archive Post 47792789"
date: 0001-01-01
permalink: /archives/wave_post.html
---

# Usage

## Basic Colors

> Use any valid CSS color name

```html
<div class="wave-list">
  <div class="title">
    <div class="text" data-color-[TITLE COLOR]>[TITLE TEXT]</div>
  </div>
  <ul class="list">
    <li class="item" data-color-[ITEM COLOR]>[ITEM TEXT]</li>
    <li class="item" data-color-[ITEM COLOR]>[ITEM TEXT]</li>
    <li class="item" data-color-[ITEM COLOR]>[ITEM TEXT]</li>
  </ul>
</div>
```

<div class="wave-list">
  <div class="title">
    <div class="text" data-color-red>[TITLE TEXT]</div>
  </div>
  <ul class="list">
    <li class="item" data-color-green>[ITEM TEXT]</li>
    <li class="item" data-color-orange>[ITEM TEXT]</li>
    <li class="item" data-color-purple>[ITEM TEXT]</li>
  </ul>
</div>

## Precise Colors

> Use any CSS valid color specifier

```html
<div class="wave-list">
  <div class="title">
    <div class="text" style="--color: [TITLE COLOR]">[TITLE TEXT]</div>
  </div>
  <ul class="list">
    <li class="item" style="--color: [ITEM COLOR]">[ITEM TEXT]</li>
    <li class="item" style="--color: [ITEM COLOR]">[ITEM TEXT]</li>
    <li class="item" style="--color: [ITEM COLOR]">[ITEM TEXT]</li>
  </ul>
</div>
```

<div class="wave-list">
  <div class="title">
    <div class="text" style="--color: red">[TITLE TEXT]</div>
  </div>
  <ul class="list">
    <li class="item" style="--color: green">[ITEM TEXT]</li>
    <li class="item" style="--color: orange">[ITEM TEXT]</li>
    <li class="item" style="--color: purple">[ITEM TEXT]</li>
  </ul>
</div>

## Block width

> Default is 80% of container

```html
<div class="wave-list" style="--width: 40%">
  <div class="title">
    <div class="text" style="--color: [TITLE COLOR]">[TITLE TEXT]</div>
  </div>
  <ul class="list">
    <li class="item" style="--color: [ITEM COLOR]">[ITEM TEXT]</li>
    <li class="item" style="--color: [ITEM COLOR]">[ITEM TEXT]</li>
    <li class="item" style="--color: [ITEM COLOR]">[ITEM TEXT]</li>
  </ul>
</div>
```

<div class="wave-list">
  <div class="title">
    <div class="text" style="--color: red">[TITLE TEXT]</div>
  </div>
  <ul class="list">
    <li class="item" style="--color: green">[ITEM TEXT]</li>
    <li class="item" style="--color: orange">[ITEM TEXT]</li>
    <li class="item" style="--color: purple">[ITEM TEXT]</li>
  </ul>
</div>
