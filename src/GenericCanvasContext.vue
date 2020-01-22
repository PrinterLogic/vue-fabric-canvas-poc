<script>
/* eslint-disable  no-unused-expressions */
/* eslint-disable  no-underscore-dangle */
import { fabric } from 'fabric'

export default {
  // Gets us the provider property from the parent <my-canvas> component.
  inject: ['provider'],
  data() {
    return {
      activeEventFunctions: [],
      annotation: {
        PosX: '',
        PosY: '',
        height: '',
        width: '',
        color: 'black',
      },
      drag: false,
      started: false,
      x: 0,
      y: 0,
    }
  },
  computed: {
    annotationType() { return this.$store.state.annotation.type },
  },
  render() {
    return 1
  },
  watch: {
    annotationType: async function (val) {
      const { canvas } = this.provider
      if (canvas) {
        await this.removeActiveEventFunctions()
        switch (val) {
          case 'whiteRedaction':
            case 'blackRedaction':
              this.initializeRedaction()
            break
          case 'signature':
            this.initializeSignature()
            break
          default:
            this.removeActiveEventFunctions()
        }
      }
    },
  },
  methods: {
    deleteObject() {
      const { canvas } = this.provider
      if (canvas.getActiveObject()) {
        canvas._objects.pop()
        canvas.remove(canvas.getActiveObject())
      }
    },
    async removeActiveEventFunctions() {
      const { canvas } = this.provider
      // this.activeEventFunctions.forEach(item => canvas.removeEventListener(item.name, item.func, false))
      this.activeEventFunctions.forEach(item => canvas.off(item))
    },
    async initializeRedaction() {
      const { canvas } = this.provider
      const me = this
      // Set the cursor to crosshair
      canvas.defaultCursor = 'crosshair'
      // Disable any other object on the canvas
      canvas.forEachObject(o => { o.selectable = false })

      canvas.on('mouse:down', me.redactionMouseDown, false)
      me.activeEventFunctions.push('mouse:down')
      canvas.on('mouse:move', me.redactionMouseMove, false)
      me.activeEventFunctions.push('mouse:move')
      canvas.on('mouse:up', me.redactionMouseUp, false)
      me.activeEventFunctions.push('mouse:up')
    },
    async initializeSignature() {
      return true
    },
    redactionMouseDown(options) {
      const { canvas } = this.provider
      const me = this
      me.started = true
      me.x = options.e.offsetX
      me.y = options.e.offsetY
      me.annotation.PosX = me.x
      me.annotation.PosY = me.y

      const square = new fabric.Rect({
        width: 0,
        height: 0,
        left: me.x,
        top: me.y,
        fill: '#000',
      })
      square.on('selected', () => {
        console.log('selected a rectangle', square.left);
      })
      square.on('moved', () => {
        console.log('object:moved on ', square.left);
      })
      square.on('scaled', () => {
        console.log('object:scaled on ', square.left);
      })
      canvas.add(square)
      canvas.setActiveObject(square)
    },
    redactionMouseMove(options) {
      const { canvas } = this.provider
      const me = this
      if (!me.started) {
        return false;
      }
      const w = Math.abs(options.e.offsetX - me.x) // This is meant to handle right to left drag
      const h = Math.abs(options.e.offsetY - me.y)
      if (!w || !h) {
        return false;
      }
      me.annotation.height = h
      me.annotation.width = w
      const square = canvas.getActiveObject()
      square.set('width', w).set('height', h)
      return 1
    },
    async redactionMouseUp() {
      const { canvas } = this.provider
      const me = this
      if (me.started) {
        me.started = false;
      }
      const square = canvas.getActiveObject();
      canvas.add(square).bringToFront()
      // await me.saveAnnotation('annotationsActive')
      // canvas.setActiveObject(square) // check if this is already active.
      // me.clearAnnotationValues()
      canvas.forEachObject(o => { o.selectable = true })
      canvas.defaultCursor = 'default'
      me.removeActiveEventFunctions()
      this.$store.dispatch('setAnnotationType', null)
    },
  },
}
</script>
