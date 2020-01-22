<script>
import { fabric } from 'fabric'

export default {
  // Gets us the provider property from the parent <my-canvas> component.
  inject: ['provider'],
  data() {
    return {
    }
  },
  computed: {
  },
  render() {
    const { canvas } = this.provider
    if (canvas) {
      console.log('canvas1')
      this.drawSquare()
    }
    return 1
  },
  methods: {
    drawSquare() {
      const { canvas, context } = this.provider
      if (!context) return 0
      console.log('drawing Square')
      if (canvas) {
        const square = new fabric.Rect({
                  width: 30,
                  height: 30,
                  left: 0,
                  top: 0,
                  fill: '#34FCB1',
                })
        canvas.add(square)
        canvas.setActiveObject(square)
        return false
      }
        return false
    },
  },
}
</script>
