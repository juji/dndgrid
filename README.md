dndgrid
=======

Drag and drop grid element plugin for jQuery


**Auto initialization**
```html
<div class="dnd-grid">
  <div class="dnd-gridcell" style=" ... "></div>
  <div class="dnd-gridcell" style=" ... "></div>
  <div class="dnd-gridcell" style=" ... "></div>
  <div class="dnd-gridcell" style=" ... "></div>
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

    $('.dnd-gridcell').dndgrid({ 
      'trigger' : '.dnd-trigger' 
    }); 
    
});
```
