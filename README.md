dndgrid
=======

Drag and drop grid element plugin for jQuery

Example > http://juji.github.io/dndgrid/

## Auto initialization
```html
<div class="dnd-grid">
  <div class="dnd-gridcell" style=" ... "></div>
  <div class="dnd-gridcell" style=" ... "></div>
  <div class="dnd-gridcell" style=" ... "></div>
  <div class="dnd-gridcell" style=" ... "></div>
</div>
```


## with another drag trigger
```html
<div class="dnd-grid">
  <div class="dnd-gridcell" style=" ... "> <span style=" ... " class="dnd-trigger"></span> </div>
  <div class="dnd-gridcell" style=" ... "> <span style=" ... " class="dnd-trigger"></span> </div>
  <div class="dnd-gridcell" style=" ... "> <span style=" ... " class="dnd-trigger"></span> </div>
  <div class="dnd-gridcell" style=" ... "> <span style=" ... " class="dnd-trigger"></span> </div>
</div>
```

## Events
**Placed**
When moved, the event `placed` will be triggered.
```
$('dnd-gridcell').on('placed',function(){
  // moved but not dropped yet.
})
```

**Dropped**
When moved, the event `dropped` will be triggered.
```
$('dnd-gridcell').on('dropped',function(){
  // Dropped. The move is permanent.
})
```



## Self initilization
```javascript
$(function(){ 

    $('.dnd-gridcell').dndgrid({ 
      'trigger' : '.dnd-trigger' 
    }); 
    
});
```
