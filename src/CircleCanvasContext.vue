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
      console.log('canvas2')
      this.drawCircle()
    }
    return 1
  },
  methods: {
    drawCircle() {
      const { canvas, context } = this.provider
      if (!context) return 0
      console.log('drawing Circle')
      if (canvas) {
        const circle = new fabric.Circle({
                  width: 30,
                  height: 30,
                  left: 0,
                  top: 0,
                  fill: '#0747A6',
                })
        canvas.add(circle)
        canvas.setActiveObject(circle)
        return false
      }
      return false
    },
  },
}
</script>
