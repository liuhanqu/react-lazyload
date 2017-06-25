# react-lazyload
lazy load React Component

# Usage
```
<Lazyload
  threshhold={0}
  cls="lazyload-placeholder"
/>
  <img src="image link" />
</Lazyload>

<Lazyload>
  <Your Component />
</Lazyload>
```
# Props
### cls
type: String. Default: ''
The class name for the default lazy-load dom(div), if you do not add a placeholder to the Lazyload.

### scrollerIsWindow
type: Boolean. Default: false
If the lazyload component is inside document.body, set true. Otherwise, if the lazyload component is inside a overflow container, set false.

### placeholder
type: element. Default: null
The default Component for lazyload component when it's not visible.

### threshold
type: number. Default: 0
The offset to scroller's viewport, and it should be a positive number.
when component's distance to scroller's viewpoet, it would preload.

## LICENSE
MIT
