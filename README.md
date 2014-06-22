dndgrid
=======

Drag and drop grid element plugin for jQuery


**Auto initialization**
```html
<div class="dnd-grid">
  <div class="dnd-gridcell" style="background-color:red;width:100px;height:100px;"></div>
  <div class="dnd-gridcell" style="background-color:green;width:100px;height:100px;"></div>
  <div class="dnd-gridcell" style="background-color:yellow;width:100px;height:100px;"></div>
  <div class="dnd-gridcell" style="background-color:blue;width:100px;height:100px;"></div>
</div>
```


**with another drag trigger**
```html
<div class="dnd-grid">
  <div class="dnd-gridcell" style=" ... "> <span style=" ... " class="dnd-trigger"></span> </div>
  <div class="dnd-gridcell" style=" ... "> <span style=" ... " class="dnd-trigger"></span> </div>
  <div class="dnd-gridcell" style=" ... "> <span style=" ... " class="dnd-trigger"></span> </div>
  <div class="dnd-gridcell" style=" ... "> <span style=" ... " class="dnd-trigger"></span> </div>
</div>
```



**Self initilization**
```javascript
$(function(){ 
    $('.dnd-gridcell').dndgrid( { 'trigger' : '.dnd-trigger' } ); 
} );
```
