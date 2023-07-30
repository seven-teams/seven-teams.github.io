---
title: "List Generator"
date: 2023-07-04
display_date: 
sort_date: 1-1-1
permalink: /list-generator
tags:
  - pink @ beans
---

<script>window.preview = document.querySelector("wave-list");</script>

# Options

### Main List

<label for="main-width">Main list width:</label>
<input id="main-width" type="number" onchange="e => preview.setAttribute('width', e.value)">
<label for="manual-line-width">Manual line width:</label>
<input id="manual-line-width" type="checkbox" onchange="e => e.value ? preview.setAttribute('manuallinewidth', '') : preview.removeAttribute('manuallinewidth')">

### List Items

<div>
  <h4>Item</h4>
  <label for="text">Item text</label>
  <textarea id="text" rows="3" cols="25" onchange=""></textarea>
</div>
<button onclick="">Add a new item</button>

# Preview

<wave-list>
  <list-title color="green">Title</list-title>
  <list-item color="pink">1</list-item>
  <list-item color="blue">2</list-item> 
  <list-item color="orange">3</list-item>
</wave-list>