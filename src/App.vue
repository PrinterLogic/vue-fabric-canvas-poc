<template>
  <div id="app">
      <button @click="toggleAnnotation('blackRedaction')">Black Redaction</button>
      <button @click="toggleAnnotation('signature')">Signature</button>
      <button @click="deleteObject()">Delete</button>
      <MarkupCanvas>
        <GenericCanvasContext ref="context" />
      </MarkupCanvas>
  </div>
</template>

<script>
import MarkupCanvas from './markupCanvas.vue'
// import CircleCanvasContext from './CircleCanvasContext.vue'
import GenericCanvasContext from './GenericCanvasContext.vue'
// import SquareCanvasContext from './SquareCanvasContext.vue'

export default {
  name: 'app',
  components: {
    MarkupCanvas,
    GenericCanvasContext,
    // CircleCanvasContext,
    // SquareCanvasContext,
  },
  data() {
    return {
      context: 'SquareCanvasContext',
    }
  },
  methods: {
    toggleAnnotation(val) {
      this.$store.dispatch('setAnnotationType', val)
    },
    deleteObject() {
      this.$refs.context.deleteObject()
    },
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.theCanvas {
  border: 1px solid black;
}
.my-canvas-wrapper {
  height: 600px;
  width: 800px;
}
</style>
