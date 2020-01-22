<template>
  <div class="my-canvas-wrapper">
    <canvas ref="myCanvas" class="theCanvas" width="800" height="600"></canvas>
    <slot></slot>
  </div>
</template>

<script>
import { fabric } from 'fabric'

export default {
  data() {
    return {
      // By creating the provider in the data property, it becomes reactive,
      // so child components will update when `context` changes.
      provider: {
        // This is the CanvasRenderingContext that children will draw to.
        canvas: null,
        context: null,
      },
    }
  },
  // Allows any child component to `inject: ['provider']` and have access to it.
  provide() {
    return {
      provider: this.provider,
    }
  },
  mounted() {
    // We can't access the rendering context until the canvas is mounted to the DOM.
    // Once we have it, provide it to all child components.
    this.provider.canvas = new fabric.Canvas(this.$refs.myCanvas, {
      preserveObjectStacking: true,
    })
    this.provider.context = this.provider.canvas.getContext('2d')

    // Resize the canvas to fit its parent's width.
    // Normally you'd use a more flexible resize system.
    this.provider.canvas.setWidth(800)
    this.provider.canvas.setHeight(600)
  },
}
</script>
