# jQuery RG EqualHeights
A simple jQuery plugin that sets multiple elements to equal height and keeps them that way

## About
This plugin came out of frustration with equal-height columns in responsive designs. Flexbox is the way of the future, but with people still using IE<11 I needed a cross-browser way of accomplishing it. It very simply calculates the tallest element that matches your selector, and sets all matching elements to the same height. When the window resizes, it re-calculates the height. As an option, you can pass a breakpoint value at which you don't want the elements heights affected. This is useful in responsive designs when you have elements that stack at smaller widths and float side by side at larger widths.

## Using
Simply call .rgequalheight() on the elements you want to equalize. For example `$('.column').rgequalheight()` will equalize all .column elements.

## Options
    // Set as true to set min-height instead of height
    useMinHeight: false
    // Pass a minimum pixel width (without units) that you want the plugin to be enabled
    minWidthBreakpoint: null
    // ms of throttle to wait between window resize and element resize. This stops the browser from re-calculating every pixel of resize
    windowResizeThrottle: 100

## Changelog

### `v1.0`

- Initial Commit
