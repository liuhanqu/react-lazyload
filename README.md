# react-lazyload
lazy load React Component

# Usage
```
import 'Lazyload' from 'r-lazyload';

<Lazyload
  threshhold={0}
  cls="lazyload-placeholder"
/>
  <img src="image link" />
</Lazyload>

<Lazyload scrollerIsWindow={true}>
  <Your Component />
</Lazyload>

const Placeholder = () => (<div className="placehoder" />)
<Lazyload placeholder={<Placehoder />}>
  <Your Component />
</Lazyload>
```
# Props
### cls
type: String. Default: ''
The class name for the default lazy-load dom(div), if you do not add a placeholder to the Lazyload.

### scrollerIsWindow
type: Boolean. Default: false
When it's value is true, it means that the window or ducument have scroll event. Otherwise, if the lazyload component is inside a overflow container, set false.

### placeholder
type: element. Default: null
The default Component for lazyload component when it's not visible.

### threshold
type: number. Default: 0
The offset to scroller's viewport, and it should be a positive number.
when component's distance to scroller's viewpoet less than threshold, it would preload.

## LICENSE
MIT
